import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = "pk.eyJ1IjoibWtvbzIxIiwiYSI6ImNrYnZoOTUydDA2MGsyeXMza2RybHRseDcifQ.6PIzAaAolmDGusdv2uHfjQ"; // TODO: This exposes your username...
const DEFAULT_MAPBOX_STATE = {
  latitude: 43.6529,
  longitude: -79.3849,
  zoom: 12,
};

const Container = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
`;

export default () => {
  const [ state, setState ] = useState(DEFAULT_MAPBOX_STATE);
  const mapContainer = useRef(null);
  useEffect(() => {

    if(typeof window !== 'undefined') {
      const map = new mapboxgl.Map({
        container: mapContainer.current as any,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [state.longitude, state.latitude],
        zoom: state.zoom
      });
    }
  }, []);
  return <Container ref={mapContainer} />
};