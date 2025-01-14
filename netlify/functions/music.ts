import type { LastPlayedSong } from '../../common/api-data';
import { getTimeBySeconds } from '../../common/get-time-by-seconds';

const BASE_URL = "http://ws.audioscrobbler.com/2.0/";

const params = new URLSearchParams({
  method: "user.getrecenttracks",
  user: process.env.LAST_FM_USERNAME || '',
  limit: "1",
  api_key: process.env.LAST_FM_API_KEY || '',
  format: "json",
});

const LAST_FM_API_URL = `${BASE_URL}?${params.toString()}`;

const getLastPlayedTimeText = (uts: number) => {
  const now = Math.floor(Date.now() / 1000);
  const diffInSeconds = now - uts;

  return `${getTimeBySeconds(diffInSeconds)} ago`;
}

exports.handler = async function () {
  const last_fm_res = await fetch(LAST_FM_API_URL);
  const last_fm_data = await last_fm_res.json();
  const song_data = last_fm_data.recenttracks.track[0];
  const time_data = song_data.date?.uts;

  const data: LastPlayedSong = {
    artist: song_data.artist['#text'],
    imgUrl: song_data.image[2]['#text'],
    song: song_data.name,
    time: time_data ? getLastPlayedTimeText(time_data) : 'Playing now...',
    url: song_data.url
  };

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
