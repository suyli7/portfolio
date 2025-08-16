const axios = require('axios');
const cheerio = require('cheerio');

import type { Book, BookShelf } from '../../common/api-data';
import { TAGS_LIST } from '../../common/book-tags';

const STORYGRAPH_BASE_URL = 'https://app.thestorygraph.com';
const STORYGRAPH_ID = process.env.STORYGRAPH_ID;

const parseScrapData = (res: { data: string }, limit?: number): Book[] => {
    const $ = cheerio.load(res.data);
    const books: Book[] = [];

    const bookPanes = $('.book-pane').slice(0, limit ?? $('.book-pane').length).toArray();

    bookPanes.forEach((pane) => {
        const el = $(pane);

        const name = el.find('.book-title-author-and-series a[href^="/books/"]').first().text().trim();
        const author = el.find('.book-title-author-and-series a[href^="/authors/"]').first().text().trim();
        const imgUrl = el.find('.book-cover img').attr('src');
        const linkHref = el.find('.book-cover a').attr('href');
        const tagEls = el.find('.book-pane-tag-section').first().find('div').first().find('span.text-teal-700');
        const tags = tagEls.toArray().reduce((acc, el) => {
            const text = $(el).text().trim();
            if (TAGS_LIST.has(text)) {
                acc.push(text);
            }
            return acc;
        }, []);

        books.push({
            name,
            author,
            imgUrl,
            bookUrl: `${STORYGRAPH_BASE_URL}${linkHref}`,
            tags
        });
    });

    return books;
};

const getBooksData = async (path: string, limit?: number) => axios.get(`${STORYGRAPH_BASE_URL}/${path}/${STORYGRAPH_ID}`).then(res => parseScrapData(res, limit));

exports.handler = async function () {
    try {
        const current = await getBooksData('currently-reading');
        const recent = await getBooksData('books-read', 3);
        const favorites = await getBooksData('favorites');

        const data: BookShelf = {
            current,
            recent,
            favorites
        }
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
