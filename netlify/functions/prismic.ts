import { createClient } from '@prismicio/client';

const client = createClient(process.env.PRISMIC_ENTRY_POINT || '', { accessToken: process.env.PRISMIC_ACCESS_TOKEN });

exports.handler = async function(event) {
  const path = event.path;
  const route = path.split('/').pop();

  if (route === "about") {
    const aboutRes = await client.getSingle('about');
    return {
      statusCode: 200,
      body: JSON.stringify(aboutRes.data)
    };
  } else if (route === "work") {
    const workRes = await client.getAllByType('case_study', {
      orderings: {
        field: 'my.case_study.order'
      },
    });
    return {
      statusCode: 200,
      body: JSON.stringify(workRes.map((v) => v.data))
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