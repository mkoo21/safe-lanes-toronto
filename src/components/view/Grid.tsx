import React from 'react';
import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: ". . ."
  ". main ."
  ". six .";
  height: 100vh;
  width: 100vw;
`;
