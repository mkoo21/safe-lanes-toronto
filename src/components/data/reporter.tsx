import React, { useState } from 'react';

import { extractTextFromFiles } from '@services/Rekognition';
import UploadIcon from '@components/view/UploadIcon';
import Geolocation from '@components/view/Geolocation';

interface Report {
  [key: string]: any;
}
export default ({children}: any) => {
  const [ uploadedFiles, setUploadedFiles ] = useState([] as File[]);
  const [ geolocation, setGeolocation ] = useState(null as Position | null);
  const [ reportDetails, setReportDetails ] = useState({} as Report);

  const handleFileUpload = async (files: File[]) => {
    if (!files.length) return;
    setUploadedFiles(files);
    const extractedText = await extractTextFromFiles(files);
    debugger;
  };
  return (
    <>
      <Geolocation setGeolocation={setGeolocation} />
      <UploadIcon handleUpload={handleFileUpload}/>
    </>
  );
};