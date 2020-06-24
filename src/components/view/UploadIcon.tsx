import React from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import { FaCamera } from 'react-icons/fa';

const Icon = styled(FaCamera)`
  height: 100px;
  width: 100px;
  margin: 20px;
`;

const Clickable = styled(animated.a)`
  grid-area: main;
  cursor: pointer;
  &:hover ${Icon} {
    opacity: 0.8;
  }
  display: flex;
  flex-direction: column;
  align-items:center;
`;

const HiddenInput: any = styled.input`
  height: 1px;
  width: 1px;
  overflow: hidden;
`;

export default ({ handleUpload }: any) => {
  const onUpload = async (event: any) => {
    handleUpload(event.currentTarget.files);
  }

  // Animation
  const transitions = useTransition(0, null, {
    from: { opacity: 0, transform: 'translate3d(30%, 0, 0)'},
    enter: { opacity: 1, transform: 'translate3d(0%, 0, 0)'},
    leave: { opacity: 0, transform: 'translate3d(-30%, 0, 0)'},
  });
  return (
    // <Clickable style={transitions[0].props}>
    <Clickable>
      <HiddenInput id='fileInput' type='file' accept="image/*" multiple onChange={onUpload} />
      <label htmlFor='fileInput'>
        <Icon />
      </label>
      <h3>Upload a photo</h3>
    </Clickable>
  );
}