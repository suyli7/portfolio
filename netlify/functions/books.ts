const { parse } = require('node-html-parser');
const axios = require('axios');
import type { LastReadBook } from '../../common/api-data';

const STORYGRAPH_URL = `https://app.thestorygraph.com/books-read/${process.env.STORYGRAPH_ID}`;

exports.handler = async function () {
    const parsedData: LastReadBook = await axios.get(STORYGRAPH_URL).then(res => {
        const parsed = parse(res.data);
        const root = parsed.querySelector('.system')
        const linkEl = root.querySelector('.book-cover a');
        const imgEl = linkEl.querySelector('img');
        const bookEl = root.querySelector('.book-title-author-and-series');
        return {
            name: bookEl.querySelector('a').textContent,
            author: bookEl.querySelector('p a').textContent,
            imgUrl: imgEl.attributes.src,
            bookUrl: `https://app.thestorygraph.com${linkEl.attributes.href}`
        };
    });

    return {
        statusCode: 200,
        body: JSON.stringify(parsedData)
    };
}
