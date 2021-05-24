'use strict';
const AWS = require('aws-sdk');

const bucketRegion = 'eu-central-1';
const accessKeyId = 'AKIAZK4VMB5RKH4QHE6A';
const secretAccessKey = '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';
const srcBucket = 'stefoneimagebucket';

const s3bucket = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    region:bucketRegion
});



exports.handler = async (event,context, callback) => {
const params = {
    Bucket: srcBucket,
    Key: 'image-1.jpg',
}


let listOfObjects =  s3bucket.listObjects({Bucket: srcBucket}).promise();


let fileLinks = (await listOfObjects).Contents.map(f => {
    return {
        fileName: f.Key,
        url: `https://${srcBucket}.s3.${bucketRegion}.amazonaws.com/${f.Key}`
    };
});



return {
    statusCode: 200,
    body: JSON.stringify(fileLinks)
}
} 



