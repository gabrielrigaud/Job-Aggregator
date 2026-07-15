import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';

chromium.use(stealth());

const keyword = process.argv[2] || 'Développeur';
const location = process.argv[3] || 'Paris';

const url = `https://fr.indeed.com/jobs?q=${encodeURIComponent(keyword)}&l=${encodeURIComponent(location)}`;

(async () => {
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    });
    
    const page = await context.newPage();
    
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    
    // Attendre l'apparition des titres
    await page.waitForSelector('.jcs-JobTitle', { timeout: 15000 }).catch(() => {});

    const jobs = [];
    const locators = page.locator('.jcs-JobTitle');
    const count = await locators.count();
    
    // On limite à 10 offres pour ne pas être trop long
    const limit = Math.min(count, 10);

    for (let i = 0; i < limit; i++) {
      const linkLocator = locators.nth(i);
      
      // On clique sur l'annonce pour l'afficher dans le panneau de droite
      await linkLocator.click().catch(() => {});
      
      // On attend un instant que l'animation du panneau de droite se termine et charge le contenu
      await page.waitForTimeout(1500);
      await page.waitForSelector('#jobDescriptionText', { timeout: 5000 }).catch(() => {});

      // On extrait les données globales (gauche) et détaillées (droite)
      const jobData = await page.evaluate((index) => {
        // --- 1. Infos basiques de la carte de gauche ---
        const links = document.querySelectorAll('.jcs-JobTitle');
        const linkEl = links[index];
        if (!linkEl) return null;

        const card = linkEl.closest('.job_seen_beacon') || linkEl.closest('td.resultContent') || linkEl.closest('.slider_container') || linkEl.parentElement.parentElement.parentElement.parentElement;
        
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

        // --- 2. Infos détaillées du panneau de droite ---
        const rightPane = document.querySelector('.jobsearch-RightPane');
        let description = '';
        let salary = null;
        let contract = 'Non spécifié';

        if (rightPane) {
          const descEl = rightPane.querySelector('#jobDescriptionText');
          if (descEl) description = descEl.innerText.trim();

          // Extraction des badges (Salaire, Type de contrat) dans le header du panneau
          // Souvent dans un #jobDetailsSection ou js-match-insights-provider
          const headerText = rightPane.querySelector('.jobsearch-JobInfoHeader-title-container')?.parentElement?.innerText || '';
          
          // Heuristique simple: si on trouve un symbole €, c'est probablement un salaire
          const badges = Array.from(rightPane.querySelectorAll('.js-match-insights-provider-10255w1, .css-19j1a75'));
          if (badges.length === 0) {
            // Plan B: on cherche dans le texte du header
            const lines = headerText.split('\n');
            lines.forEach(line => {
              if (line.includes('€') || line.toLowerCase().includes('par an') || line.toLowerCase().includes('par mois')) {
                salary = line.trim();
              }
              if (['CDI', 'CDD', 'Stage', 'Alternance', 'Freelance', 'Indépendant'].some(c => line.includes(c))) {
                contract = line.trim();
              }
            });
          }
        }

        return {
          title,
          company,
          location,
          url,
          description,
          salary,
          contract
        };
      }, i);

      if (jobData) {
        jobs.push(jobData);
      }
    }

    await browser.close();
    console.log(JSON.stringify(jobs));
  } catch (error) {
    console.log(JSON.stringify({ error: error.message }));
    process.exit(1);
  }
})();
