import { createClient } from '@prismicio/client';
import type { AssetImg } from '../../common/api-data';

const client = createClient(process.env.PRISMIC_ENTRY_POINT || '', { accessToken: process.env.PRISMIC_ACCESS_TOKEN });
const ASSETS_API_BASE_URL = 'https://asset-api.prismic.io/assets';
const ASSETS_API_HEADERS = {
  Authorization: `Bearer ${process.env.PRISMIC_ACCESS_TOKEN_ASSET}`,
  repository: process.env.PRISMIC_REPO_ID || '',
};
const ASSETS_API_PARAMS = new URLSearchParams({
  assetType: "all",
  keyword: "fav_img",
  limit: "100"
});

const ASSETS_API_URL = `${ASSETS_API_BASE_URL}?${ASSETS_API_PARAMS.toString()}`;
console.log(ASSETS_API_URL);

exports.handler = async function (event) {
  const path = event.path;
  const route = path.split('/').pop();

  if (route === "about") {
    const about_res = await client.getSingle('about');
    return {
      statusCode: 200,
      body: JSON.stringify(about_res.data)
    };
  } else if (route === "personal") {
    const person_res = await client.getSingle('personal');
    return {
      statusCode: 200,
      body: JSON.stringify(person_res.data)
    };
  } else if (route === "work") {
    const work_res = await client.getAllByType('case_study', {
      orderings: {
        field: 'my.case_study.order'
      },
    });
    return {
      statusCode: 200,
      body: JSON.stringify(work_res.map((v) => v.data))
    };
  } else if (route === "favimgs") {
    const fav_imgs_res = await fetch(ASSETS_API_URL, {
      headers: ASSETS_API_HEADERS,
      method: 'GET'
    });
    const fav_imgs_res_data = await fav_imgs_res.json();

    const filtered_imgs_data = fav_imgs_res_data.items.reduce((acc, item) => {
      if (item.tags.some((tag) => tag.name === "fav_img")) {
        const asset_img_item: AssetImg = {
          url: item.url,
          description: item.alt,
        };
        acc.push(asset_img_item);
      }
      return acc;
    }, []);

    return {
      statusCode: 200,
      body: JSON.stringify(filtered_imgs_data)
    }
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Route not found"
      })
    };
  }
}