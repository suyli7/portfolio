import type { LastPlayedGame } from '../../common/api-data';
import { scrapeAndParse } from '../../common/puppeteer';

const PLAYER_ID = process.env.EXOPHASE_ID;
const EXOPHASE_BASE_URL = "https://www.exophase.com/user/";
const GAME_SEARCH_BASE_URL = "https://thegamesdb.net/search.php?name=";
const RECENT_LIMIT = 3;
const GAMES_PROFILE_URL = `${EXOPHASE_BASE_URL}${PLAYER_ID}`;
const GAME_ITEM_SELECTOR = '#app-Profile .user-container .list-unordered-base li>div';

const evaluator = (args: { selector: string, limit: number, searchBaseUrl: string }) => {
    const { selector, limit, searchBaseUrl } = args;
    const gameItems = Array.from(document.querySelectorAll(selector));
    const lastPlayedGames = gameItems.slice(0, limit);
    const gamesData: LastPlayedGame[] = [];

    lastPlayedGames.forEach((g) => {
        
        const titleEl: HTMLElement | null = g.querySelector('.game-info .box h3 a[href^="https://www.exophase.com/game/"]');
        const imgEl: HTMLElement | null = g.querySelector('.col-image .image img');
        const lastPlayedEl: HTMLElement | null = g.querySelector('.lastplayed');
        const totalPlayedEl: HTMLElement | null = g.querySelector('.game-info .box .hours');
        const platformEl = g.querySelector('.game-info .box .platforms')?.children?.[0] as HTMLElement | undefined;

        const title = titleEl?.innerText.trim() || '';
        const imgUrl = (imgEl?.getAttribute('src') || '').replace(/(games\/)./ , "$1l");
        const lastPlayed = lastPlayedEl?.innerText.trim() || '';
        const totalPlaytime = totalPlayedEl?.innerText.trim() || '';
        const platform = platformEl?.innerText.trim() || '';
        
        gamesData.push({
            title,
            imgUrl,
            lastPlayed,
            totalPlaytime,
            platform,
            url: `${searchBaseUrl}${title}`,
        });
    });
    return gamesData;
};


exports.handler = async function () {
    try {
        const scrapedGamesData = await scrapeAndParse<LastPlayedGame[]>(
            GAMES_PROFILE_URL,
            evaluator,
            { selector: GAME_ITEM_SELECTOR, limit: RECENT_LIMIT, searchBaseUrl: GAME_SEARCH_BASE_URL }
        ) || [];

        return {
            statusCode: 200,
            body: JSON.stringify(scrapedGamesData)
        };
    } catch (err) {
        console.log('Error - Games request', err);
        return {
            statusCode: 500,
            body: JSON.stringify([])
        };
    }
}
