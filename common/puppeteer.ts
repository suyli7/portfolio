const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
const TIMEOUT = 30000;

let browser: any = null;

const getBrowser = async () => {
    if (!browser || !browser.isConnected()) {
        browser = await puppeteer.launch({
            args: [
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-setuid-sandbox',
                '--no-sandbox',
                '--no-zygote',
                '--single-process',
            ],
            executablePath:
                process.env.PUPPETEER_EXECUTABLE_PATH || (await chromium.executablePath()),
            headless: false,
        });
    }
    return browser;
};

export const scrapeAndParse = async <T>(
    url: string,
    pageEvaluator: (args?: any) => T,
    evaluatorArgs?: any
): Promise<T | null> => {
    const browserInstance = await getBrowser();
    let page = null;

    try {
        page = await browserInstance.newPage();

        await page.setUserAgent(USER_AGENT);

        await page.goto(url, { waitUntil: 'networkidle2', timeout: TIMEOUT });

        return await page.evaluate(pageEvaluator, evaluatorArgs);
    } catch (err) {
        console.error(`Error scraping ${url}:`, err);
        return null;
    } finally {
        if (page) {
            await page.close();
        }
    }
};