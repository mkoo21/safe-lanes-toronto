import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaGlobeAmericas, FaSadTear } from 'react-icons/fa';

export enum GeolocationPermissionStates {
  granted='granted',
  prompt='prompt',
  denied='denied',
  dismissed='dismissed',
};

const Container = styled.div`

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
`;

const SadIcon = styled(FaSadTear)`
  height: 200px;
  width: 200px;
`;

export default (setGeolocation) => {
  const [ permissionState, setPermissionState ] = useState(GeolocationPermissionStates.dismissed);
  const getGeolocation = async () => {
    // Permission check
    const status = await navigator.permissions.query({name: "geolocation"});
    setPermissionState(status.state);

    navigator.geolocation.getCurrentPosition((position: Position) => {
      setGeolocation(position);
      setPermissionState(GeolocationPermissionStates.granted);
    }, error => {
      // has a status that we can use but for now just assume denied
      setPermissionState(GeolocationPermissionStates.denied);
    });
  }
  useEffect(() => {
    // Check for geolocation permission
    getGeolocation();
  }, []);


  if(permissionState === GeolocationPermissionStates.dismissed || permissionState === GeolocationPermissionStates.granted) return null;
  if(permissionState === GeolocationPermissionStates.denied) {
    return <GeolocationDenied />
  }
  return ( 
    <Container>
      <Icon />
      <div>
        <h3>This app works best with location enabled.</h3>
        <button>OK</button>
      </div>
    </Container>
  )
}

export const GeolocationDenied = () => <Container>
  <SadIcon />
  <div>Looks like you denied us location access. If you change your mind you can change site permissions in your browser settings under "Privacy and Security."</div>
  <button>OK</button>
</Container>