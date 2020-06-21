import React, { useState } from 'react';

import { extractTextFromFiles, TextDetection } from '@services/Rekognition';
import UploadIcon from '@components/view/UploadIcon';
import Geolocation from '@components/view/Geolocation';

interface Report {
  [key: string]: any;
}

interface Position {
  coords: {
    latitude: number,
    longitude: number,
  }
}

export default ({children}: any) => {
  const [ uploadedFiles, setUploadedFiles ] = useState([] as File[]);
  const [ geolocation, setGeolocation ] = useState(null as Position | null);
  const [ reportDetails, setReportDetails ] = useState({} as Report);
  const [ showReport, setShowReport ] = useState(false);

  const handleFileUpload = async (files: File[]) => {
    if (!files.length) return;
    setUploadedFiles(files);
    const extractedText = await extractTextFromFiles(files);

    if(geolocation) reportDetails.position = geolocation;
    if(extractedText) reportDetails.textDetections = extractedText;
    debugger;
    setReportDetails(reportDetails);
    setShowReport(true);
  };
  if(showReport) return <ReportSummary position={reportDetails.position} extractedTexts={reportDetails.textDetections} />
  return (
    <>
      <Geolocation setGeolocation={setGeolocation} />
      <UploadIcon handleUpload={handleFileUpload}/>
    </>
  );
};

const ReportSummary = ({position, extractedTexts}: {position: Position | null, extractedTexts: TextDetection[]}) => {
  debugger;
  const positionElement = position ? <h3>{`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`}</h3> : <h3>Location not given :(</h3>;
  const extractedTextElement = extractedTexts.length ? <ul>{ extractedTexts.flat().map(x => <li>{`${x.DetectedText}: ${x.Confidence}%`}</li>)}</ul> : <h3>Uploaded photos did not contain recognizable text :(</h3>;
  return (
    <div>
      { positionElement }
      { extractedTextElement }
    </div>
  )
}