const DRIBBBLE_BASE_URL = "https://api.dribbble.com/v2/user/shots";

const params = new URLSearchParams({
  access_token: process.env.DRIBBBLE_ACCESS_TOKEN || ''
});

const DRIBBBLE_API_URL = `${DRIBBBLE_BASE_URL}?${params.toString()}`;

exports.handler = async function () {
  const dribbble_res = await fetch(DRIBBBLE_API_URL);
  const dribbble_res_data = await dribbble_res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(dribbble_res_data)
  };
}
