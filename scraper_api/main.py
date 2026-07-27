import json
import os
import urllib.parse
from fastapi import FastAPI, HTTPException, Query
from playwright.async_api import async_playwright

app = FastAPI(title="Job Scraper API")

USER_DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "user_data"))

@app.get("/scrape")
async def scrape_indeed(keyword: str = Query(...), location: str = Query(...)):
    url = f"https://fr.indeed.com/jobs?q={urllib.parse.quote(keyword)}&l={urllib.parse.quote(location)}"
    jobs = []

    try:
        async with async_playwright() as p:
            context = await p.chromium.launch_persistent_context(
                USER_DATA_DIR,
                headless=False,
                args=[
                    "--disable-blink-features=AutomationControlled",
                    "--no-sandbox"
                ],
                viewport={"width": 1280, "height": 720},
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
            )
            
            page = context.pages[0] if context.pages else await context.new_page()
            await page.goto(url, wait_until="domcontentloaded")
            await page.wait_for_timeout(3000)

            try:
                await page.wait_for_selector(".jcs-JobTitle", timeout=12000)
            except Exception:
                await context.close()
                return []

            locators = page.locator(".jcs-JobTitle")
            count = await locators.count()
            limit = min(count, 10)

            for i in range(limit):
                try:
                    link_locator = locators.nth(i)
                    await link_locator.click()
                    await page.wait_for_timeout(1200)

                    job_data = await page.evaluate('''
                        (index) => {
                            const links = document.querySelectorAll('.jcs-JobTitle');
                            const linkEl = links[index];
                            if (!linkEl) return null;

                            const card = linkEl.closest('.job_seen_beacon') || linkEl.closest('td.resultContent') || linkEl.parentElement.parentElement;
                            let title = linkEl.innerText.trim();
                            let url = linkEl.href;
                            let company = 'Non spécifié';
                            let location = 'Non spécifié';

                            if (card) {
                                const companyEl = card.querySelector('[data-testid="company-name"]');
                                const locationEl = card.querySelector('[data-testid="text-location"]');
                                if (companyEl) company = companyEl.innerText.trim();
                                if (locationEl) location = locationEl.innerText.trim();
                            }

                            const rightPane = document.querySelector('.jobsearch-RightPane');
                            let description = '';
                            let salary = null;
                            let contract = 'Non spécifié';

                            if (rightPane) {
                                const descEl = rightPane.querySelector('#jobDescriptionText');
                                if (descEl) description = descEl.innerText.trim();

                                const headerText = rightPane.querySelector('.jobsearch-JobInfoHeader-title-container')?.parentElement?.innerText || '';
                                const lines = headerText.split('\\n');
                                lines.forEach(line => {
                                    if (line.includes('€') || line.toLowerCase().includes('par an')) salary = line.trim();
                                    if (['CDI', 'CDD', 'Stage', 'Alternance', 'Freelance'].some(c => line.includes(c))) contract = line.trim();
                                });
                            }

                            return { title, company, location, url, description, salary, contract };
                        }
                    ''', i)

                    if job_data:
                        jobs.append(job_data)
                except Exception:
                    continue

            await context.close()
            return jobs

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
