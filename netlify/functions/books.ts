import type { Book, BookShelf } from '../../common/api-data';
import { scrapeAndParse } from '../../common/puppeteer';
import { TAGS_LIST } from '../../common/book-tags';

const STORYGRAPH_BASE_URL = 'https://app.thestorygraph.com';
const STORYGRAPH_ID = process.env.STORYGRAPH_ID;

type MainEvaluatorResult = Omit<BookShelf, 'favorites' | 'toRead'>;

const mainEvaluator = (args: { baseUrl: string }): MainEvaluatorResult => {
    const parseSectionBooks = (section: Element, baseUrl: string): Book[] => {
        const bookLinks = section.querySelectorAll('.items-baseline > div a');
        const booksData: Book[] = [];

        bookLinks.forEach((b) => {
            const linkHref = b?.getAttribute('href') || '';
            const imgEl = b.querySelector('img');
            const imgMeta = imgEl?.getAttribute('alt') || '';
            const [title, author] = imgMeta.split(' by ');

            booksData.push({
                title,
                author,
                imgUrl: imgEl?.getAttribute('src') || '',
                bookUrl: `${baseUrl}${linkHref}`,
            })
        });
        return booksData;
    }
    
    const { baseUrl } = args;
    const mainPanes = document.querySelectorAll('.container .standard-pane.mb-6.pl-6');
    const sections = mainPanes[0].querySelectorAll(':scope > div');
    const aboutPaneTexts = mainPanes[1].querySelectorAll(':scope > span');
    let aboutText = '';
    
    aboutPaneTexts.forEach((t, index) => {
        aboutText = aboutText.concat(`${index !== 0 ? ' ' : ''}${(t as HTMLElement).innerText}`);
    });
    
    return {
        current: parseSectionBooks(sections[0], baseUrl),
        recent: parseSectionBooks(sections[1], baseUrl),
        about: aboutText
    }
}

const subPageEvaluator = (args: { baseUrl: string, allowedTags?: string[], isFav: boolean }) => {
    const { baseUrl, allowedTags, isFav } = args;

    const panes = isFav ? document.querySelectorAll('.book-pane') : document.querySelectorAll('#up-next-book-panes .book-pane');
    const booksData: Book[] = [];

    const allowedTagsSet = new Set(allowedTags || []);

    panes.forEach((p) => {
        const titleEl: HTMLElement | null = p.querySelector('.book-title-author-and-series a[href^="/books/"]');
        const authorEl: HTMLElement | null = p.querySelector('.book-title-author-and-series a[href^="/authors/"]');
        const imgEl: HTMLElement | null = p.querySelector('.book-cover img');
        const linkEl: HTMLElement | null = p.querySelector('.book-cover a');

        const tagsSection = p.querySelector('.book-pane-tag-section div');
        const tagEls = tagsSection ? Array.from(tagsSection.querySelectorAll('span.text-teal-700')) : [];

        const tags = isFav ? Array.from(tagEls).reduce<string[]>((acc, el) => {
            const text = el?.textContent?.trim();
            if (text && allowedTagsSet.has(text)) {
                acc.push(text);
            }
            return acc;
        }, []) : [];

        booksData.push({
            title: titleEl?.innerText.trim() || '',
            author: authorEl?.innerText.trim() || '',
            imgUrl: imgEl?.getAttribute('src') || '',
            bookUrl: `${baseUrl}${linkEl?.getAttribute('href') || ''}`,
            tags
        });
    });

    return booksData;
};

const getStorygraphUrl = (path: string) => `${STORYGRAPH_BASE_URL}/${path}/${STORYGRAPH_ID}`;


exports.handler = async function () {
    try {
        const main = await scrapeAndParse<MainEvaluatorResult>(
            getStorygraphUrl('profile'),
            mainEvaluator,
            { baseUrl: STORYGRAPH_BASE_URL }
        );

        const favorites = await scrapeAndParse<Book[]>(
            getStorygraphUrl('favorites'),
            subPageEvaluator,
            { baseUrl: STORYGRAPH_BASE_URL, isFav: true, allowedTags: TAGS_LIST }
        ) || [];

        const toRead = await scrapeAndParse<Book[]>(
            getStorygraphUrl('to-read'),
            subPageEvaluator,
            { baseUrl: STORYGRAPH_BASE_URL }
        ) || [];


        if (main === null || !favorites.length) {
            return;
        }

        const data: BookShelf = Object.assign(main, { favorites, toRead });

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (err) {
        console.log('Error - Books request', err);
        return {
            statusCode: 500,
            body: JSON.stringify([])
        };
    }
}
