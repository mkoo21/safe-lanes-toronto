import React from 'react';
import styled from 'styled-components';

import AudioComponent from '@components/view/Audio'; // I'm sorry
import { ObjectDetection, TextDetection } from '@services/Rekognition';

interface Props {
  position: Position | null,
  extractedTexts: TextDetection[];
  extractedLabels: ObjectDetection[];
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto auto auto;
  grid-template-areas: 'position position' 'text objects' 'voice voice' 'record record';

  background: rgba(255,255,255,0.9);
  padding:20px;
  border-radius:20px;
`;

const Position = styled.div`
  grid-area: position;
`;

const Texts = styled.div`
  grid-area: text;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Labels = styled.div`
  grid-area: objects;
  padding:10px;
`;

const VoiceTranscript = styled.div`
  grid-area: voice;
`;

const Record = styled.div`
  grid-area: record;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ReportSummary = ({position, extractedTexts, extractedLabels}: Props) => {
  const positionElement = position ? <h3>{`Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`}</h3> : <h5>Location not given :(</h5>;
  const extractedTextElement = extractedTexts.length ? <>{ extractedTexts.flat().map(x => <h5>{`${x.DetectedText}: ${x.Confidence.toFixed(2)}% confidence`}</h5>)}</> : <h5>Uploaded photos did not contain recognizable text :(</h5>;
  const extractedLabelsElement = extractedLabels.length ? <>{ extractedLabels.flat().map(x => <h5>{`${x.Name}: ${x.Confidence.toFixed(2)}% confidence`}</h5>)}</> : <h5>Could not recognize any objects :(</h5>;
  return (
    <Container>
      <Position>{ positionElement }</Position>
      <Texts><h4>Detected text:</h4>{ extractedTextElement }</Texts>
      <Labels><h4>Detected objects:</h4>{ extractedLabelsElement }</Labels>
      <VoiceTranscript></VoiceTranscript>
      <Record><AudioComponent /><h5>Tell us more!</h5></Record>
    </Container>
  );
};
