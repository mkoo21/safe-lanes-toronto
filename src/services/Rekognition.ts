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

export interface ObjectDetection {
  Name: string;
  Confidence: number;
}

export const extractText = async (files: File[]) => {
  const fileData = await Promise.all(Array.prototype.map.call(files, (f: File) => f.arrayBuffer()));

  // This entire thing is horrible and I'm sorry.
  const fileDetectionPromises = fileData.map(bytes => (
    new Promise((resolve, reject) => {
      const callback = (err, data) => {
        if(err) reject(err);
        const wordDetections: TextDetection[] = [];
        data && data.TextDetections.forEach((detection: TextDetection) => {
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

export const extractObjectLabels = async (files: File[]) => {
  const fileData = await Promise.all(Array.prototype.map.call(files, (f: File) => f.arrayBuffer()));
  
  const objectDetectionPromises = fileData.map(bytes => (
    new Promise((resolve, reject) => {
      const callback = (err, data) => {
        if(err) reject(err);
        // const detections: ObjectDetection[] = [];
        resolve(data.Labels);
      };
      CLIENT.detectLabels({
        Image: {
          Bytes: bytes as string,
        },
        MaxLabels: 10,
        MinConfidence: 70
      }, callback);
    })
  ));

  return await Promise.all(objectDetectionPromises);
};