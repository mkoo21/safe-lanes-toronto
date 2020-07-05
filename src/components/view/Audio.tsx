import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaMicrophone, FaStopCircle } from 'react-icons/fa';

interface AudioCallbacks {
  record: () => any;
  stop: () => any;
};

interface AudioHooks {
  onRecordStart: () => any;
  onRecordEnd: () => any;
  onData: (data: Blob) => any;
}

const CONSTRAINTS: MediaStreamConstraints = {
  audio: true,
  video: false,
};

const getAudioCallbacks = async (hooks: AudioHooks): Promise<AudioCallbacks> => {
  const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
  const mediaRecorder = new MediaRecorder(stream);

  const record = () => {
    debugger;
    mediaRecorder.start();
    hooks.onRecordStart();
  }

  const stop = () => {
    mediaRecorder.stop();
    hooks.onRecordEnd();
  }
  
  mediaRecorder.ondataavailable = (e: BlobEvent) => {
    hooks.onData(e.data);
    debugger;
  }

  return { record, stop };
}

const RecordIcon = styled(FaMicrophone)`
  height: 50px;
  width: 50px;
  margin: 20px;
  color: black;

  &:hover {
    opacity: 0.8;
  }
`;

const StopIcon = styled(FaStopCircle)`
  height: 50px;
  width: 50px;
  margin: 20px;
  color: black;

  &:hover {
    opacity: 0.8;
  }
`;

enum FlowStates { LOADING, RECORDING, STOPPED };
interface State {
  flowState: FlowStates;
  audioCallbacks: AudioCallbacks | null;
  audioDataChunks: Blob[];
};

const AudioViewComponent = () => {
  const [ flowState, setFlowState ] = useState<FlowStates>(FlowStates.STOPPED);
  const [ dataChunks, setDataChunks] = useState<Blob[]>([]);
  const [ mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia(CONSTRAINTS).then(stream => {
      const mr = new MediaRecorder(stream);
      mr.ondataavailable = (e: BlobEvent) => {
        debugger;
        dataChunks.push(e.data);
      }
      setMediaRecorder(mr);
    }, () => {
      //error
      alert("Unfortunately your device does not seem to support recording audio.")
    });
  }, []);

  const record = async () => {
    setDataChunks([]);
    setFlowState(FlowStates.RECORDING);
    mediaRecorder!.start();
  };
  const stop = () => {
    if(mediaRecorder && mediaRecorder.state === "recording") mediaRecorder.stop();
    setFlowState(FlowStates.STOPPED);
    // TODO: transcribe
  };

  if (flowState === FlowStates.LOADING) return null;
  if (flowState === FlowStates.STOPPED) {
    return <RecordIcon onClick={record} />;
  }
  if (flowState === FlowStates.RECORDING) {
    return <StopIcon onClick={stop} />
  }
  // Something went wrong
  return null;
}

export default AudioViewComponent;