import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';

import { extractTextFromFiles } from '@services/Rekognition';
import UploadIcon from '@components/view/UploadIcon';
import Geolocation from '@components/view/Geolocation';
import { ReportSummary } from '@components/view/ReportSummary';
import UploadSpinner from '@components/view/UploadSpinner';

interface Report {
  [key: string]: any;
}

interface Position {
  coords: {
    latitude: number,
    longitude: number,
  }
}

enum FlowStates {
  UPLOAD,
  SPINNER,
  REPORT,
}

export default ({children}: any) => {
  const [ uploadedFiles, setUploadedFiles ] = useState([] as File[]);
  const [ geolocation, setGeolocation ] = useState(null as Position | null);
  const [ reportDetails, setReportDetails ] = useState({} as Report);
  const [ flowState, setFlowState ] = useState(FlowStates.UPLOAD);

  const handleFileUpload = async (files: File[]) => {
    if (!files.length) return;
    setFlowState(FlowStates.SPINNER);
    setUploadedFiles(files);
    const extractedText = await extractTextFromFiles(files);

    if(geolocation) reportDetails.position = geolocation;
    if(extractedText) reportDetails.textDetections = extractedText;

    setReportDetails(reportDetails);
    setFlowState(FlowStates.REPORT);
  };

  // Animation
  const transitions = useTransition(0, null, {
    from: { opacity: 0, transform: 'translate3d(30%, 0, 0)'},
    enter: { opacity: 1, transform: 'translate3d(0%, 0, 0)'},
    leave: { opacity: 0, transform: 'translate3d(-30%, 0, 0)'},
  });

  if(flowState === FlowStates.REPORT) return <ReportSummary position={reportDetails.position} extractedTexts={reportDetails.textDetections} />
  if(flowState === FlowStates.SPINNER) return <UploadSpinner />
  if(!geolocation) return <Geolocation setGeolocation={setGeolocation} />
  return (
    <>
    <UploadIcon handleUpload={handleFileUpload}/>
    </>
  );
};