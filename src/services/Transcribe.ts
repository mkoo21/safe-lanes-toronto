import AWS from 'aws-sdk';

const CLIENT = new AWS.TranscribeService({
  apiVersion: '2016-06-27',
  accessKeyId: 'AKIA3GGCYLS3K3LZXEGG',
  secretAccessKey: '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', // 'public' read only access
  region: 'us-east-1',
});

export const transcribe = async() => {
  const params = {
    LanguageCode: 'en-US',
  }
}