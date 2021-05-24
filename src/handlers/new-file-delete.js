const AWS = require('aws-sdk');


const bucketRegion = 'eu-central-1';
const accessKeyId = 'AKIAZK4VMB5RKH4QHE6A';
const secretAccessKey = '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';
const srcBucket = 'stefoneimagebucket';

const s3bucket = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region: bucketRegion,
});


exports.handler = async(event) => {

    const fileName = event.pathParameters.filename;
    console.log(fileName);


   const result = await s3bucket.deleteObject({Bucket: srcBucket, Key: fileName}).promise();


  console.log(result);

    return {
        statusCode: 204
    }
}