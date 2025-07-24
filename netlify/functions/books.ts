const axios = require('axios');
const cheerio = require('cheerio');

import type { Book, BookShelf } from '../../common/api-data';

const STORYGRAPH_BASE_URL = 'https://app.thestorygraph.com';
const STORYGRAPH_ID = process.env.STORYGRAPH_ID;
const STORYGRAPH_TAG_FAV = process.env.STORYGRAPH_TAG_FAV;

const RECENT_URL = `${STORYGRAPH_BASE_URL}/books-read/${STORYGRAPH_ID}`;
const CURRENT_URL = `${STORYGRAPH_BASE_URL}/currently-reading/${STORYGRAPH_ID}`;
const FAVORITES_URL = `${STORYGRAPH_BASE_URL}/tags/${STORYGRAPH_TAG_FAV}`;

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

        books.push({
            name,
            author,
            imgUrl,
            bookUrl: `${STORYGRAPH_BASE_URL}${linkHref}`
        });
    });

    return books;
};

exports.handler = async function () {
    try {
        const current = await axios.get(CURRENT_URL).then(res => parseScrapData(res));
        const recent = await axios.get(RECENT_URL).then((data) => parseScrapData(data, 3));
        const favorites = await axios.get(FAVORITES_URL).then(res => parseScrapData(res));

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
        console.error('Failed to scrape:', err);
        return {
            statusCode: 200,
            body: JSON.stringify([])
        };
    }
}
