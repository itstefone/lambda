'use-strict';
const parser = require('lambda-multipart-parser');
const AWS = require('aws-sdk');
const fileType = require('file-type');

const bucketRegion = 'eu-central-1';
const accessKeyId = 'AKIAZK4VMB5RKH4QHE6A';
const secretAccessKey = '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';
const srcBucket = 'stefoneimagebucket';

const s3bucket = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region: bucketRegion,
});

exports.handler = async (event) => {
  const result = await parser.parse(event);
  let file = result.files[0];
  let uniqueFileName = Math.random().toString(36).substring(7) + file.filename.split('.')[1];

  let url = `https://${srcBucket}.s3.${bucketRegion}.amazonaws.com/${uniqueFileName}`;

  let params = {
    Bucket: srcBucket,
    Key: uniqueFileName,
    Body: file.content,
    ACL: 'public-read'
  };


  
  

  let s3Result = await s3bucket.putObject(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({
      url,
      s3Result
    }),
  };
};
