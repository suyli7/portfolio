import type { LastPlayedGame } from '../../common/api-data';
import { getTimeBySeconds } from '../../common/get-time-by-seconds';

const STEAM_BASE_URL = "https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/";

const params = new URLSearchParams({
  key: process.env.STEAM_API_KEY || '',
  steamid: process.env.STEAM_USER_ID || '',
  format: "json"
});

const STEAM_API_URL = `${STEAM_BASE_URL}?${params.toString()}`;

exports.handler = async function () {
  const steam_res = await fetch(STEAM_API_URL);
  const steam_res_data = await steam_res.json();

  const data = steam_res_data.response.games.map((game): LastPlayedGame => ({
    name: game.name,
    imgUrl: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`,
    playtimeTwoWeeks: getTimeBySeconds(game.playtime_2weeks * 60, false),
    url: `https://store.steampowered.com/app/${game.appid}`
  }));

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
