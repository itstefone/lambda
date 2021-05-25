'use-strict';

const AWS = require('aws-sdk');
const fileType = require('file-type');

const bucketRegion = 'eu-central-1';
const accessKeyId = 'AKIAZK4VMB5RKH4QHE6A';
const secretAccessKey = '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';
const srcBucket = 'stefoneimagebucket';

const s3bucket = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    region:bucketRegion
});


exports.handler = async (event, context) => {

    // let body = JSON.parse(event.body);
    // const {fileName, ...jsonData} = body;

    // const params = {
    //     Bucket: srcBucket,
    //     Key: `${fileName}.json`,
    //     Body:  JSON.stringify(jsonData),
    //     ACL: 'public-read'
    // }

    // // const params = {
    // //     Bucket: srcBucket,
    // //     Key: `${fileName}.jpg`,
    // //     Body:  event.body.image,
    // //     ACL: 'public-read'
    // // }

    // let data = s3bucket.upload(params).promise();

    let request = JSON.parse(event.body);
    let base64String = request.base64String;
    let buffer = new Buffer.from(base64String, 'base64');

    console.log(fileType.fromBuffer(buffer));
    // let fileMime = fileType(buffer);
    //     if(fileMime === null) {
    //         return context.fail('The string supplied sis not a file type');
    //     }

        let file = getFile(buffer);
        let params = file.params;


        let result = await s3bucket.putObject(params).promise();

        console.log(result);





    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "JSON File successfully uploaded",
            data: 'dasdas'
        })
    }
}



let getFile = function( buffer) {
  


    let params = {
        Bucket: 'stefoneimagebucket',
        Key: "somerandomimagename." + 'jpg',
        Body: buffer
    }


    return {
        params
    }
}