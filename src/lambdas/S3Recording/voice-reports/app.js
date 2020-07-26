const AWS = require('aws-sdk');
const v4 = require('uuid').v4;

const fs = require('fs');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const RECORDINGS_BUCKET = 'safelanesto-temp-recordings';

const S3_CLIENT = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: 'AKIA3GGCYLS3K3LZXEGG',
  secretAccessKey: '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',
  region: 'us-east-1',
});

const TRANSCODER = new AWS.ElasticTranscoder({
    apiVersion: '2012-09-25',
    accessKeyId: 'AKIA3GGCYLS3K3LZXEGG',
    secretAccessKey: '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',
    region: 'us-east-1',
});

exports.lambdaHandler = async (event, context) => {
    try {
        const key = `${new Date().getTime()}`;
        const blob = event.body; // Blob from MediaRecorder - will be audio/webm format

        // Convert to wav
        const convertedFilePath = '/tmp/convertedAudio.wav';
        const f = ffmpeg().input(blob().stream()).inputFormat('webm');
        f.output(convertedFilePath).on('end', () => console.log('finished processing')).on('error', e => console.log(e)).run();
        const wavBlob = fs.readFileSync(convertedFilePath);

        const s3PutObjectParams = {
            Body: wavBlob,
            Bucket: 'safelanesto-temp-recordings',
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
    } catch (err) {
        console.log(err);
        return err;
    }
};
