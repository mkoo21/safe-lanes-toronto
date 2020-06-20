import AWS from 'aws-sdk';

const CLIENT = new AWS.Rekognition({
  apiVersion: '2016-06-27',
  accessKeyId: 'AKIA3GGCYLS3K3LZXEGG',
  secretAccessKey: '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', // For the 'public' user with only PUTObject permission
  region: 'us-east-1',
});

interface TextDetection {
  DetectedText: string;
  Type: string;
  id: number;
  confidence: number;
  Geometry: {
    [key: string]: any;
  }
}
export const extractTextFromFiles = async (files: File[]) => {
  const textDetections: TextDetection[] = [];
  const fileData = await Promise.all(Array.prototype.map.call(files, (f: File) => f.arrayBuffer()));
  const callback = (err, data) => {
    if(err) return // log?
    console.log(data);
    data.textDetections.forEach((detection: TextDetection) => {
      if(detection.Type === "WORD") textDetections.push(detection);
    });
  };
  fileData.forEach(bytes => {
    debugger;
    CLIENT.detectText({
      Image: {
        Bytes: bytes as string,
      }
    }, callback);
  })
  
};
