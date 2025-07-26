import type { Metadata } from '../../common/api-data';

const GITHUB_API_URL = "https://api.github.com/repos/suyli7/portfolio/branches/main";

exports.handler = async function () {
    try {
        const github = await fetch(GITHUB_API_URL);
        const github_res_data = await github.json();

        const data: Metadata = {
            lastUpdated: github_res_data.commit.commit.committer.date,
            latestMessage: github_res_data.commit.commit.message
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (err) {
        console.log('Error - Metadata request', err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                lastUpdated: 'unknown',
                latestMessage: 'unknown'
            })
        };
    }
}
