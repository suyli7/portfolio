import type { NasaApod } from '../../common/api-data';

const API_KEY = process.env.NASA_API_KEY;
const APOD_API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

exports.handler = async function () {
    try {
        const apod_res = await fetch(APOD_API_URL);
        const apod_data: NasaApod = await apod_res.json();
        return {
            statusCode: 200,
            body: JSON.stringify(apod_data)
        };
    } catch (err) {
        console.log('Error - NASA API request', err);
        return {
            statusCode: 500,
            body: JSON.stringify([])
        };
    }
}
