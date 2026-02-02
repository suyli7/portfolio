import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const AWS_S3_REGION = process.env.AWS_S3_REGION || '';
const AWS_S3_ACCESS_KEY = process.env.AWS_S3_ACCESS_KEY || '';
const AWS_S3_SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY || '';
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || '';
const AWS_S3_BUCKET_DIR = process.env.AWS_S3_BUCKET_DIR || '';

const BUCKET_FILE_KEY = `${AWS_S3_BUCKET_DIR}/data.json`;

const s3 = new S3Client({
    region: AWS_S3_REGION,
    credentials: {
        accessKeyId: AWS_S3_ACCESS_KEY,
        secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
    },
});

const command = new GetObjectCommand({
    Bucket: AWS_S3_BUCKET_NAME,
    Key: BUCKET_FILE_KEY
});

const CACHE_TTL_MS = (60 * 60 * 1000) * 6; // 6 hours

let cachedData: any | null = null;
let cacheTimestamp = 0;
let cachePromise: Promise<any> | null = null;

async function loadDataOnce() {
    const now = Date.now();

    if (cachedData && now - cacheTimestamp < CACHE_TTL_MS) {
        return cachedData;
    }

    if (!cachePromise) {
        cachePromise = (async () => {
            const s3res = await s3.send(command);
            const jsonString = await s3res.Body?.transformToString();
            cachedData = JSON.parse(jsonString || "{}");
            cacheTimestamp = Date.now();
            cachePromise = null; // reset after refresh
            return cachedData;
        })();
    }

    return cachePromise;
}

exports.handler = async function (event: any) {
    try {
        const parsedData = await loadDataOnce();
        const route = event.path.split("/").pop();
        if (route === "books") {
            const {
                main: {
                    currentlyReading: current = [],
                    recentlyRead: recent = [],
                    readStyleSummary: about = 'The summary failed to load.',
                    toReadCount = 0
                } = {},
                toRead = [],
                favorites = []
            } = parsedData;

            return {
                statusCode: 200,
                body: JSON.stringify({
                    current,
                    recent,
                    about,
                    toRead,
                    toReadCount,
                    favorites
                })
            }
        } else if (route === "lastPlayedGames") {
            return {
                statusCode: 200,
                body: JSON.stringify(parsedData.games)
            }
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: "Route not found"
                })
            };
        }
    } catch (err) {
        console.log('Error - Failed to fetch S3 file', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch S3 file" }),
        };
    }
}
