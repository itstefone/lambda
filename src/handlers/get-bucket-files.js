'use-strict';
const AWS = require('aws-sdk');

const bucketRegion = 'eu-central-1';
AWS.config.update({
  accessKeyId: 'AKIAZK4VMB5RJU3VJHZF',
  secretAccessKey: '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',
  region: bucketRegion,
});

exports.handler = async (event) => {
  const s3 = new AWS.S3();

  const bucketName = 'stefoneimagebucket';
  const response = await s3
    .listObjectsV2({
      Bucket: bucketName,
    })
    .promise();

  const filesUrls = response.Contents.map((file) => {
    return `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${file.Key}`;
  });

  return {
    StatusCode: 200,
    Body: JSON.stringify(filesUrls),
  };
};
