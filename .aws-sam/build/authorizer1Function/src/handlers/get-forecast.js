'use-strict';
const axios = require('axios');
exports.handler = async (event) => {
  let city = event.pathParameters.city;


    let url = `https://api.weatherapi.com/v1/current.json?key=aa4af4aba2ac4f229d390048211705&q=${city}&aqi=no
    `;

    let body = await axios.get(url);
    console.log(body);
    const response = {
        statusCode: 200,
        body: JSON.stringify(body.data)
    };

    return response;
}
