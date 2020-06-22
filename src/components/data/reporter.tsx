import React, { useState } from 'react';

import { extractTextFromFiles } from '@services/Rekognition';
import UploadIcon from '@components/view/UploadIcon';
import Geolocation from '@components/view/Geolocation';
import { ReportSummary } from '@components/view/ReportSummary';

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