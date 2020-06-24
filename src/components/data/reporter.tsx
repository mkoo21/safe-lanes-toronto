import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';

import Geolocate from '@services/Geolocation';
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
  GEOLOCATION
}

const Container = styled.div`
  grid-area: main;
`;

export default ({children}: any) => {
  const [ uploadedFiles, setUploadedFiles ] = useState([] as File[]);
  const [ geolocation, setGeolocation ] = useState(null as Position | null);
  const [ reportDetails, setReportDetails ] = useState({} as Report);
  const [ flowState, setFlowState ] = useState(FlowStates.UPLOAD);

  const handleFileUpload = async (files: File[]) => {
    if (!files.length) return;
    setFlowState(FlowStates.SPINNER);
    setUploadedFiles(files);
    try {
      const extractedText = await extractTextFromFiles(files);

      if(geolocation) reportDetails.position = geolocation;
      if(extractedText) reportDetails.textDetections = extractedText;
    } catch(e) {
      if(e.name === "ValidationException"){
        alert('Please make sure your images are less than 5 mb')
      } else {
        alert(`Sorry, we seem to have gotten a ${e.name} processing your upload.`)
      }
      return setFlowState(FlowStates.UPLOAD);
    }

    // mock block
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    // reportDetails.position = {
    //   coords: {latitude: 1, longitude: 2}
    // }
    // reportDetails.textDetections = [{DetectedText: 'foo', Confidence: 100}];

    setReportDetails(reportDetails);
    setFlowState(FlowStates.REPORT);
  };

  // Get location
  useEffect(() => {
    Geolocate({
      onPermissionNeeded: () => setFlowState(FlowStates.GEOLOCATION),
      onPermissionDenied: () => setFlowState(FlowStates.GEOLOCATION),
      onSuccess: (position: Position) => setGeolocation(position),
    });
  }, []);

  // Generate animations
  const transitions = useTransition(
    [FlowStates.REPORT, FlowStates.SPINNER, FlowStates.UPLOAD, FlowStates.GEOLOCATION],
    null, 
    {
      from: { opacity: 0, transform: 'translate3d(30%, 0, 0)'},
      enter: { opacity: 1, transform: 'translate3d(0%, 0, 0)'},
      leave: { opacity: 0, transform: 'translate3d(-30%, 0, 0)'},
      to: { opacity: 1, transform: 'translate3d(0%, 0, 0)'},
      reset: true,
    }
  );

  /**
   * This is really dumb but react-spring needs to render the whole array of children rather than returning out when a condition is met
   * So it is on you to make sure only one gets rendered at a time /shrug
   */
  let ReportComponent, SpinnerComponent, GeolocationComponent, UploadComponent;
  ReportComponent = (flowState === FlowStates.REPORT) ?
  (
    <animated.div style={transitions[FlowStates.REPORT].props}>
      <ReportSummary position={reportDetails.position} extractedTexts={reportDetails.textDetections} />
    </animated.div>
  ) : null;

  SpinnerComponent = (flowState === FlowStates.SPINNER) ?
  (
    <animated.div style={transitions[FlowStates.SPINNER].props}>
      <UploadSpinner />
    </animated.div>
  ) : null;

  GeolocationComponent = (flowState === FlowStates.GEOLOCATION) ?
  (
    <Geolocation 
      onPosition={(position: Position) => {
        setGeolocation(position);
        setFlowState(FlowStates.UPLOAD);
      }}
      dismiss={() => setFlowState(FlowStates.UPLOAD)}
      />
  ) : null;

  // default: upload
  UploadComponent = (flowState === FlowStates.UPLOAD) ?
  (
    <animated.div style={transitions[FlowStates.UPLOAD].props}>
      <UploadIcon handleUpload={handleFileUpload}/>
    </animated.div>
  ) : null;

  return <Container>
    {[ReportComponent, SpinnerComponent, GeolocationComponent, UploadComponent]}
  </Container>
};