import type { LastPlayedGame } from '../../common/api-data';
import { getTimeBySeconds, getFormattedDate } from '../../common/date-utils';

const STEAM_BASE_URL = " http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/";

const params = new URLSearchParams({
  key: process.env.STEAM_API_KEY || '',
  steamid: process.env.STEAM_USER_ID || '',
  format: "json"
});

const STEAM_API_URL = `${STEAM_BASE_URL}?${params.toString()}`;

exports.handler = async function () {
  const steam_res = await fetch(STEAM_API_URL);
  const steam_res_data = await steam_res.json();

  const lastPlayedGames = steam_res_data.response.games
    .slice()
    .sort((a, b) => b.rtime_last_played - a.rtime_last_played)
    .slice(0, 3);

  const data: LastPlayedGame[] = lastPlayedGames.map((game) => ({
    name: game.name,
    imgUrl: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`,
    lastPlayed: `last played: ${getFormattedDate(game.rtime_last_played)}`,
    totalPlaytime: `total playtime: ${getTimeBySeconds(game.playtime_forever * 60, false)}`,
    url: `https://store.steampowered.com/app/${game.appid}`
  }));

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
