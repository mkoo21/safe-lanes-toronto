import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring'
import { FaGlobeAmericas, FaSadTear } from 'react-icons/fa';

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

export default ({ setGeolocation }) => {
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

  // Right-to-left animation
  const transitions = useTransition([0, 1], null, {
    from: { opacity: 0, transform: 'translate3d(30%, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0%, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(-30%, 0, 0)' },
  });

  if(permissionState === GeolocationPermissionStates.dismissed || permissionState === GeolocationPermissionStates.granted) return null;
  if(permissionState === GeolocationPermissionStates.denied) {
    return <Container style={transitions[0].props}>  <SadIcon />
    <h5>Looks like you denied us location access. If you change your mind you can change site permissions in your browser settings under "Privacy and Security."</h5>
    <button>OK</button></Container>
  }
  return ( 
    <Container style={transitions[1].props}>  
    <Icon />
      <div>
        <h3>This app works best with location enabled.</h3>
        <button>OK</button>
      </div>
    </Container>
  );
};