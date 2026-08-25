import concurrent.futures
import json
import os
import re
import urllib.parse
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from openai import OpenAI
from playwright.async_api import async_playwright

load_dotenv()

app = FastAPI(title="Job Scraper API with AI Normalization")

USER_DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "user_data"))
NVIDIA_API_KEY = os.getenv("NVIDIA_API_KEY", "")

openai_client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=NVIDIA_API_KEY,
    timeout=8.0
) if NVIDIA_API_KEY else None


def clean_single_job(raw_data: dict) -> dict:
    """Traite et normalise une offre avec l'IA NVIDIA pour extraire les métadonnées et un Markdown propre."""
    title = raw_data.get("title", "")
    company = raw_data.get("company", "")
    location = raw_data.get("location", "")
    raw_content = raw_data.get("raw_full_text", "")
    base_description = raw_data.get("description", "")

    if not openai_client or not raw_content:
        return {
            "title": title,
            "company": company,
            "location": location,
            "url": raw_data.get("url", ""),
            "description": base_description or "Aucune description",
            "contract": "Non spécifié",
            "salary": None,
            "salary_min": None,
            "salary_max": None,
            "salary_currency": "EUR",
            "salary_period": "yearly",
            "is_remote": False,
            "skills": []
        }

    prompt = f"""Tu es un extracteur de données d'offres d'emploi ultra-précis. Analyse l'annonce complète ci-dessous (en-tête, badges et description) et retourne un JSON strict.

Règles impératives d'extraction :
1. "location": Extrait UNIQUEMENT la ville ou le code postal/département (ex: "Noisy-le-Grand (93)", "Châtillon (92)", "Paris (75)"). Supprime les mentions "Télétravail partiel", "Hybride", etc.
2. "is_remote": 'true' si l'offre mentionne le télétravail (même partiel, hybride ou quelques jours/semaine), sinon 'false'.
3. "contract_type": 'CDI', 'CDD', 'Stage', 'Alternance', 'Freelance' ou 'Non spécifié'. Si le mot 'Stage', 'Alternance' ou 'CDI' apparaît dans le titre ou les détails, indique-le obligatoirement.
4. "salary_min" et "salary_max": Cherche toute mention de salaire, rémunération ou gratification (ex: "45 000 € - 55 000 €", "50k€", "1200€/mois", "gratification de stage"). Convertis en montant annuel approximatif en euros (nombre entier). Si absent, mets null.
5. "description": Reformate le texte en Markdown soigné :
   - Titres de section en '### ' (ex: ### Missions, ### Profil recherché, ### Avantages).
   - Toutes les listes en puces avec tirets ('- ').

Données complètes de l'annonce :
{raw_content[:4500]}

Réponds UNIQUEMENT avec un JSON valide sous ce format:
{{
  "title": "Titre du poste standardisé",
  "company": "Nom de l'entreprise",
  "location": "Ville propre",
  "is_remote": true ou false,
  "contract_type": "CDI" / "CDD" / "Stage" / "Alternance" / "Freelance" / "Non spécifié",
  "salary_min": 45000 ou null,
  "salary_max": 55000 ou null,
  "salary_currency": "EUR",
  "salary_period": "yearly",
  "salary": "45k - 55k €" ou null,
  "skills": ["React", "TypeScript"],
  "description": "Description en Markdown avec ### et - ..."
}}"""

    try:
        response = openai_client.chat.completions.create(
            model="meta/llama-3.3-70b-instruct",
            messages=[
                {
                    "role": "system",
                    "content": "Tu es un expert en traitement de données de recrutement. Réponds uniquement par un JSON valide sans balises autour."
                },
                {"role": "user", "content": prompt}
            ],
            temperature=0.1,
            max_tokens=900
        )
        content = response.choices[0].message.content.strip()

        if "```json" in content:
            content = content.split("```json")[1].split("```")[0].strip()
        elif "```" in content:
            content = content.split("```")[1].split("```")[0].strip()

        ai_cleaned = json.loads(content)
    except Exception as e:
        print(f"[AI Extraction Error] {e}")
        ai_cleaned = {}

    # Extraction regex de secours si l'IA n'a pas répondu
    fallback_salary_min = None
    fallback_salary_max = None
    fallback_contract = "Non spécifié"
    fallback_remote = False

    # Regex Salaire
    salary_match = re.search(r'(\d[\d\s\u202f]*\d)\s*€\s*(?:[-–àa]\s*(\d[\d\s\u202f]*\d)\s*€)?(?:\s*(par an|par mois|par jour))?', raw_content, re.IGNORECASE)
    if salary_match:
        val1 = int(re.sub(r'[^\d]', '', salary_match.group(1)))
        val2 = int(re.sub(r'[^\d]', '', salary_match.group(2))) if salary_match.group(2) else None
        period = (salary_match.group(3) or 'par an').lower()
        multiplier = 12 if 'mois' in period else (220 if 'jour' in period else 1)
        fallback_salary_min = val1 * multiplier if val1 < 200000 else val1
        fallback_salary_max = val2 * multiplier if val2 and val2 < 200000 else (val2 or fallback_salary_min)

    # Regex Contrat
    for c in ['CDI', 'CDD', 'Stage', 'Alternance', 'Freelance']:
        if re.search(r'\b' + c + r'\b', title + ' ' + raw_content, re.IGNORECASE):
            fallback_contract = c
            break

    # Regex Remote
    if re.search(r'\b(télétravail|teletravail|hybride|remote)\b', raw_content, re.IGNORECASE):
        fallback_remote = True

    final_salary_min = ai_cleaned.get("salary_min") or fallback_salary_min
    final_salary_max = ai_cleaned.get("salary_max") or fallback_salary_max
    final_contract = ai_cleaned.get("contract_type") or fallback_contract
    final_remote = ai_cleaned.get("is_remote", fallback_remote)

    return {
        "title": ai_cleaned.get("title") or title,
        "company": ai_cleaned.get("company") or company,
        "location": ai_cleaned.get("location") or location,
        "url": raw_data.get("url", ""),
        "description": ai_cleaned.get("description") or base_description or "Aucune description",
        "contract": final_contract,
        "salary": f"{final_salary_min // 1000}k - {final_salary_max // 1000}k €" if final_salary_min and final_salary_max else (f"{final_salary_min // 1000}k €" if final_salary_min else None),
        "salary_min": final_salary_min,
        "salary_max": final_salary_max,
        "salary_currency": ai_cleaned.get("salary_currency", "EUR"),
        "salary_period": ai_cleaned.get("salary_period", "yearly"),
        "is_remote": final_remote,
        "skills": ai_cleaned.get("skills", []),
    }


@app.get("/scrape")
async def scrape_indeed(keyword: str = Query(...), location: str = Query(...)):
    url = f"https://fr.indeed.com/jobs?q={urllib.parse.quote(keyword)}&l={urllib.parse.quote(location)}"
    raw_jobs = []

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(
                headless=True,
                args=[
                    "--no-sandbox",
                    "--disable-dev-shm-usage",
                    "--disable-blink-features=AutomationControlled"
                ]
            )
            context = await browser.new_context(
                viewport={"width": 1366, "height": 768},
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
                locale="fr-FR",
                timezone_id="Europe/Paris"
            )

            page = await context.new_page()
            await page.goto(url, wait_until="domcontentloaded", timeout=30000)
            await page.wait_for_timeout(3000)

            # Accepter les cookies si présents
            try:
                cookie_btn = page.locator('#onetrust-accept-btn-handler, button:has-text("Tout accepter"), button:has-text("Accepter")')
                if await cookie_btn.count() > 0 and await cookie_btn.first.is_visible():
                    await cookie_btn.first.click()
                    await page.wait_for_timeout(1000)
            except Exception:
                pass

            try:
                await page.wait_for_selector(".jcs-JobTitle, h2.jobTitle a, [data-jk], .job_seen_beacon", timeout=12000)
            except Exception:
                await browser.close()
                return []

            locators = page.locator(".jcs-JobTitle")
            count = await locators.count()
            if count == 0:
                locators = page.locator("h2.jobTitle a, [data-jk]")
                count = await locators.count()

            limit = min(count, 6)

            for i in range(limit):
                try:
                    link_locator = locators.nth(i)
                    await link_locator.click()
                    await page.wait_for_timeout(1000)

                    raw_data = await page.evaluate('''
                        (index) => {
                            const links = document.querySelectorAll('.jcs-JobTitle, h2.jobTitle a, [data-jk], a[id^="job_"]');
                            const linkEl = links[index];
                            if (!linkEl) return null;

                            const card = linkEl.closest('.job_seen_beacon') || linkEl.closest('td.resultContent') || linkEl.parentElement.parentElement;
                            let title = linkEl.innerText.trim();
                            let url = linkEl.href;
                            let company = 'Non spécifié';
                            let location = 'Non spécifié';
                            let cardText = '';

                            if (card) {
                                cardText = card.innerText.trim();
                                const companyEl = card.querySelector('[data-testid="company-name"]');
                                const locationEl = card.querySelector('[data-testid="text-location"]');
                                if (companyEl) company = companyEl.innerText.trim();
                                if (locationEl) location = locationEl.innerText.trim();
                            }

                            const rightPane = document.querySelector('.jobsearch-RightPane') || document.querySelector('#jobsearch-ViewjobPaneWrapper');
                            let description = '';
                            let fullRightPaneText = '';

                            if (rightPane) {
                                fullRightPaneText = rightPane.innerText.trim();
                                const descEl = rightPane.querySelector('#jobDescriptionText');
                                if (descEl) {
                                    const clone = descEl.cloneNode(true);
                                    clone.querySelectorAll('li').forEach(li => {
                                        li.textContent = '- ' + li.textContent.trim() + '\\n';
                                    });
                                    clone.querySelectorAll('p, h1, h2, h3, h4, h5, h6').forEach(block => {
                                        block.textContent = block.textContent.trim() + '\\n\\n';
                                    });
                                    description = clone.innerText.trim();
                                }
                            }

                            return { 
                                title, 
                                company, 
                                location, 
                                url, 
                                description,
                                raw_full_text: "=== INFORMATIONS CARTE ET SALAIRE ===\\n" + cardText + "\\n\\n=== DETAIL DE L'OFFRE ===\\n" + fullRightPaneText + "\\n\\n" + description
                            };
                        }
                    ''', i)

                    if raw_data:
                        raw_jobs.append(raw_data)
                except Exception as ex:
                    print(f"[Card Evaluation Error] {ex}")
                    continue

            await browser.close()

        # Normalisation parallèle via ThreadPoolExecutor
        if raw_jobs:
            with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
                cleaned_jobs = list(executor.map(clean_single_job, raw_jobs))
            return cleaned_jobs
        
        return []

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
