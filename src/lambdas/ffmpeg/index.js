const AWS = require('aws-sdk');

const fs = require('fs');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const { execSync } = require('child_process');

const RECORDINGS_BUCKET = 'safelanesto-temp-recordings';

const S3_CLIENT = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: 'AKIA3GGCYLS3K3LZXEGG',
    secretAccessKey: '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',
    region: 'us-east-1',
});

exports.handler = async (event, context) => {
    // Download the webm to be converted from S3
    const { key } = event;
    const S3GetObjectParams = {
        Bucket: RECORDINGS_BUCKET,
        Key: `${key}.webm`,
    };
    const S3DownloadResult = await S3_CLIENT.getObject(S3GetObjectParams).promise();
    if(!S3DownloadResult) {
        throw Error('Unable to download file from S3');
    }

    // Store/run ffmpeg to convert to wave
    fs.writeFileSync(converteeFilePath, S3DownloadResult.Body);
    const cmd = `${ffmpegPath} -f webm -i ${converteeFilePath} -y ${convertedFilePath}`;
    execSync(cmd);

    // Upload converted wav to S3
    const wavBlob = fs.readFileSync(convertedFilePath);
    const s3PutObjectParams = {
        Body: wavBlob,
        Bucket: RECORDINGS_BUCKET,
        Key: `${key}.webm`,
        ServerSideEncryption: "AES256",
    };
    const S3UploadResult = await S3_CLIENT.putObject(s3PutObjectParams).promise();
    if(!S3UploadResult) {
        throw Error('No valid response from S3');
    }

    return {
        'statusCode': 200,
        'body': JSON.stringify({ key }),
    };
};
