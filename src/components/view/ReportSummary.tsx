import React from 'react';
import styled from 'styled-components';

import { ObjectDetection, TextDetection } from '@services/Rekognition';

interface Props {
  position: Position | null,
  extractedTexts: TextDetection[];
  extractedLabels: ObjectDetection[];
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto;
  grid-template-areas: 'position position' 'text objects';

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
`;

const Labels = styled.div`
  grid-area: objects;
`;
export const ReportSummary = ({position, extractedTexts, extractedLabels}: Props) => {
  const positionElement = position ? <h3>{`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`}</h3> : <h3>Location not given :(</h3>;
  const extractedTextElement = extractedTexts.length ? <ul>{ extractedTexts.flat().map(x => <li>{`${x.DetectedText}: ${x.Confidence}%`}</li>)}</ul> : <h3>Uploaded photos did not contain recognizable text :(</h3>;
  const extractedLabelsElement = extractedLabels.length ? <ul>{ extractedLabels.flat().map(x => <li>{`${x.Name}: ${x.Confidence}%`}</li>)}</ul> : <h3>Could not recognize any objects :(</h3>;
  return (
    <Container>
      <Position>{ positionElement }</Position>
      <Texts><p>Detected text:</p>{ extractedTextElement }</Texts>
      <Labels><p>Detected objects:</p>{ extractedLabelsElement }</Labels>
    </Container>
  );
};
