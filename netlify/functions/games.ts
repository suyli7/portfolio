import type { LastPlayedGame } from '../../common/api-data';
import { getFormattedDate } from '../../common/date-utils';

const GAMES_BASE_URL = " https://api.exophase.com/public/player/";
const PLAYER_ID = process.env.EXOPHASE_ID;

const GAMES_API_URL = `${GAMES_BASE_URL}${PLAYER_ID}/games?page=1`;

exports.handler = async function () {
    const games_res = await fetch(GAMES_API_URL);
    const games_res_data = await games_res.json();

    const lastPlayedGames = games_res_data.games
        .slice()
        .slice(0, 6);

    const data: LastPlayedGame[] = lastPlayedGames?.map((game) => ({
        name: game.meta.title,
        imgUrl: game.resource_standard,
        lastPlayed: `last played: ${getFormattedDate(game.lastplayed)}`,
        totalPlaytime: `total playtime: ${game.playtime}`,
        env: game.meta.environment_slug
    })) || [];

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
}
