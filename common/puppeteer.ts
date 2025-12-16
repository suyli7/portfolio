const puppeteer = require('puppeteer');

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
const TIMEOUT = 30000;

export const scrapeAndParse = async <T>(
    url: string,
    pageEvaluator: (args?: any) => T,
    evaluatorArgs?: any
): Promise<T | null> => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        await page.setUserAgent(USER_AGENT)

        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });

        return await page.evaluate(pageEvaluator, evaluatorArgs);
    } catch (err) {
        console.error(`Error scraping ${url}:`, err);
        return null;
    } finally {
        await browser.close();
    }
};