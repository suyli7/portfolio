const { parse } = require('node-html-parser');
const axios = require('axios');
import type { Book, BookData, BookShelf } from '../../common/api-data';

const STORYGRAPH_BASE_URL = 'https://app.thestorygraph.com';
const LAST_READ_URL = `${STORYGRAPH_BASE_URL}/books-read/${process.env.STORYGRAPH_ID}`;
const CURRENTLY_READING_URL = `${STORYGRAPH_BASE_URL}/currently-reading/${process.env.STORYGRAPH_ID}`;

const parseScrapData = (res): Book | null => {
    const parsed = parse(res.data);
    const root = parsed.querySelector('.system');

    if (!root) {
        return null;
    }

    const linkEl = root.querySelector('.book-cover a');
    const bookEl = root.querySelector('.book-title-author-and-series');

    if (!linkEl || !bookEl) {
        return null;
    }

    const imgEl = linkEl.querySelector('img');

    return {
        name: bookEl.querySelector('a').textContent,
        author: bookEl.querySelector('p a').textContent,
        imgUrl: imgEl.attributes.src,
        bookUrl: `${STORYGRAPH_BASE_URL}${linkEl.attributes.href}`
    };
}

exports.handler = async function () {

    const currentBook = await axios.get(CURRENTLY_READING_URL).then(res => parseScrapData(res));
    const lastRead = await axios.get(LAST_READ_URL).then(res => parseScrapData(res));

    const data: BookShelf = [
        ...(currentBook ? [{ title: 'currently reading', book: currentBook }] : []),
        ...(lastRead ? [{ title: 'last finished', book: lastRead }] : []),
    ];

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
}
