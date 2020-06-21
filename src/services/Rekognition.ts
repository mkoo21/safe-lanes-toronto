import AWS from 'aws-sdk';

const CLIENT = new AWS.Rekognition({
  apiVersion: '2016-06-27',
  accessKeyId: 'AKIA3GGCYLS3K3LZXEGG',
  secretAccessKey: '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', // For the 'public' user with only PUTObject permission
  region: 'us-east-1',
});

export interface TextDetection {
  DetectedText: string;
  Type: string;
  id: number;
  Confidence: number;
  Geometry: {
    [key: string]: any;
  }
}
export const extractTextFromFiles = async (files: File[]) => {
  const textDetections: TextDetection[] = [];
  const fileData = await Promise.all(Array.prototype.map.call(files, (f: File) => f.arrayBuffer()));

  // This entire thing is horrible and I'm sorry.
  const fileDetectionPromises = fileData.map(bytes => (
    new Promise((resolve, reject) => {
      const callback = (err, data) => {
        if(err) reject(err);
        const wordDetections: TextDetection[] = [];
        data.TextDetections.forEach((detection: TextDetection) => {
          if(detection.Type === "WORD") wordDetections.push(detection);
        });
        resolve(wordDetections);
      };
      CLIENT.detectText({
        Image: {
          Bytes: bytes as string,
        }
      }, callback);
    })
  ));

  return await Promise.all(fileDetectionPromises);
};
