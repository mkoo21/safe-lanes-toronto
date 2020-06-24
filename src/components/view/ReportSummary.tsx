import React from 'react';
import styled from 'styled-components';

import { TextDetection } from '@services/Rekognition';

const Container = styled.div`
  grid-area: main;
`;
export const ReportSummary = ({position, extractedTexts}: {position: Position | null, extractedTexts: TextDetection[]}) => {
  const positionElement = position ? <h3>{`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`}</h3> : <h3>Location not given :(</h3>;
  const extractedTextElement = extractedTexts.length ? <ul>{ extractedTexts.flat().map(x => <li>{`${x.DetectedText}: ${x.Confidence}%`}</li>)}</ul> : <h3>Uploaded photos did not contain recognizable text :(</h3>;
  return (
    <>
      { positionElement }
      { extractedTextElement }
    </>
  )
}