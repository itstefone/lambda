'use-strict';
const axios = require('axios');
exports.handler = async (event) => {
  let city = event.pathParameters.city;

    let city = event.pathParameters.city;

    let url = `https://api.weatherapi.com/v1/current.json?key=aa4af4aba2ac4f229d390048211705&q=${city}&aqi=no
    `;

    let body = await axios.get(url);
    const response = {
        statusCode: 200,
        body: JSON.stringify(body.data)
    };

  const response = {
    statusCode: 200,
    body: JSON.stringify(body.data),
  };

    return response;
}



export function getFromS3(fileName, path){
    const params = {
        Bucket: bucketName,
        Key: `${path}/${fileName}`,
    };

    return new Promise((resolve, reject) => {
        s3bucket.getObject(params, function (err, data) {
            if (err) {
                return reject(err);
            }

            return resolve(data);
        });
    });
}
