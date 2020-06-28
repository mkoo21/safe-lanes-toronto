import React, { useState } from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import { Keyframes } from 'react-spring/renderprops'

const SIZE = 200;
const Container = styled.div`
  grid-area: main;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Border = styled(animated.div)`
  position: absolute;
  border-radius: 50%;
  border-top: 5px solid;
  border-left: 5px solid transparent;
  height: ${SIZE}px;
  width: ${SIZE}px;
`;

const H4 = styled.h4`martinTop: 30px;`

export default () => {
  const Spin = Keyframes.Spring(async (next: any) => {
    while(true) {
      await next({transform: "rotate(0deg)", from: {transform: "rotate(360deg)"}, reset: true })
    }
  });

  return <Container>
    <Spin config={{tension:120}}>{ (styles: any) => <Border style={styles} /> }</Spin>
    <H4>Uploading...</H4>
  </Container>;
};