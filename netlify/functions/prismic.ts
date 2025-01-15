import { createClient } from '@prismicio/client';

const client = createClient(process.env.PRISMIC_ENTRY_POINT || '', { accessToken: process.env.PRISMIC_ACCESS_TOKEN });

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
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Route not found"
      })
    };
  }
}