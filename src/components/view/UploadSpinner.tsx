import React, { useState } from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import { Keyframes } from 'react-spring/renderprops'
import CircularProgress from '@material-ui/core/CircularProgress';

const SIZE = 200;
const Container = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Border = styled(animated.div)`
  position: absolute;
  border-radius: 50%;
  border-top: 5px solid;
  border-left: 5px solid transparent;
  height: ${SIZE}px;
  width: ${SIZE}px;
`;

const H3 = styled.h3`margin-top: 20px;`

export default () => {
  // const Spin = Keyframes.Spring(async (next: any) => {
  //   while(true) {
  //     await next({transform: "rotate(0deg)", from: {transform: "rotate(360deg)"}, reset: true })
  //   }
  // });

  return <Container>
    {/* <Spin config={{tension:120}}>{ (styles: any) => <Border style={styles} /> }</Spin> */}
    <CircularProgress size={80} />
    <H3>Uploading...</H3>
  </Container>;
};