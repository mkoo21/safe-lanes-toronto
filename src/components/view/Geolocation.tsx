import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import { FaGlobeAmericas, FaSadTear } from 'react-icons/fa';

import Geolocate from '@services/Geolocation';

export enum GeolocationPermissionStates {
  granted='granted',
  prompt='prompt',
  denied='denied',
  dismissed='dismissed',
};

const Container = styled(animated.div)`
  grid-area: main;
  position: relative;
  height: 300px;
  width: 300px;
  background: white;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Icon = styled(FaGlobeAmericas)`
  height: 200px;
  width: 200px;
  margin: 20px;
`;

const SadIcon = styled(FaSadTear)`
  height: 200px;
  width: 200px;
  margin: 20px;
`;

export default ({ onPosition, dismiss }: { onPosition: (position: Position) => any, dismiss: () => void}) => {
  const [ permissionState, setPermissionState ] = useState(GeolocationPermissionStates.dismissed);
  const getLocation = () => Geolocate({
    onPermissionNeeded: () => setPermissionState(GeolocationPermissionStates.prompt),
    onPermissionDenied: () => setPermissionState(GeolocationPermissionStates.denied),
    onSuccess: (position: Position) => onPosition(position),
  });
  useEffect(() => {
    getLocation();
  }, []);

  if(permissionState === GeolocationPermissionStates.dismissed || permissionState === GeolocationPermissionStates.granted) return null;
  if(permissionState === GeolocationPermissionStates.denied) {
    return <Container><SadIcon />
    <h5>Looks like you denied us location access. If you change your mind you can change site permissions in your browser settings under "Privacy and Security."</h5>
    <button onClick={dismiss}>OK</button></Container>
  }
  return ( 
    <Container>  
    <Icon />
      <div>
        <h3>This app works best with location enabled.</h3>
        <button onClick={getLocation}>OK</button>
      </div>
    </Container>
  );
};