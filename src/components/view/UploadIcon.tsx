import React from 'react';
import styled from 'styled-components';
import { FaCamera } from 'react-icons/fa';

const Icon = styled(FaCamera)`
  height: 100px;
  width: 100px;
  margin: 20px;
`;

const Clickable = styled.a`
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
  return (
    <Clickable>
      <HiddenInput id='fileInput' type='file' accept="image/*" multiple onChange={onUpload} />
      <label htmlFor='fileInput'>
        <Icon />
      </label>
      <h3>Upload a photo</h3>
    </Clickable>
  );
}