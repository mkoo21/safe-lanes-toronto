import AWS from 'aws-sdk';

const BUCKET_NAME = 'amplify-safelanesto-photos';
const S3_CLIENT = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: 'AKIA3GGCYLS3K3LZXEGG',
  secretAccessKey: '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', // For the 'public' user with only PUTObject permission
  region: 'us-east-1',
});

const uploadReport = () => undefined