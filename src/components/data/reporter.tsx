import React, { useState, useEffect } from 'react';

import { extractTextFromFiles } from '../../services/Rekognition';
import UploadIcon from '@components/view/UploadIcon';

interface Report {
  [key: string]: any;
}
export default ({children}: any) => {
  const [ uploadedFiles, setUploadedFiles ] = useState([] as File[]);
  const [ reportDetails, setReportDetails ] = useState({} as Report);

  const handleFileUpload = async (files: File[]) => {
    if (!files.length) return;
    setUploadedFiles(files);
    const extractedText = await extractTextFromFiles(files);
  }

  return (
    <>
      <UploadIcon handleUpload={handleFileUpload}/>
    </>
  )
}