import type { MsData } from '../../common/api-data';

const BASE_MS_URL = "https://www.nexon.com/api/maplestory/no-auth/v1/ranking/na";

const params = new URLSearchParams({
  type: "world",
  id: "45",
  reboot_index: "0",
  page_index: "1",
  character_name: process.env.MS_CHAR_NAME || '',
});

const MS_URL = `${BASE_MS_URL}?${params.toString()}`;

exports.handler = async function () {
  const ms_res = await fetch(MS_URL);
  const ms_res_data = await ms_res.json();
  const char_data = ms_res_data.ranks[0];
  const data: MsData = {
    charImg: char_data.characterImgURL,
    jobIcon: `https://nxcache.nexon.net/maplestory/img/icons/2024/icon-job-${char_data.jobName.replace(/ /g, '_').toLowerCase()}.gif`,
    jobName: char_data.jobName,
    level: char_data.level,
    rank: char_data.rank,
  }
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
