import React, { createRef } from 'react';
import styled from 'styled-components';
import { FaCloudUploadAlt } from 'react-icons/fa';

const Icon = styled(FaCloudUploadAlt)`
  height: 250px;
  width: 250px;
`;

const Clickable = styled.a`
  grid-area: main;
  cursor: pointer;
  &:hover ${Icon} {
    opacity: 0.9;
  }
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
      <label for='fileInput'>
        <Icon />
      </label>
    </Clickable>
  );
}