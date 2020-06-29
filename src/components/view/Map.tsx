import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import mapboxgl, { Map } from 'mapbox-gl';

import { MapState } from '@services/Geolocation';

mapboxgl.accessToken = "pk.eyJ1IjoibWtvbzIxIiwiYSI6ImNrYnZoOTUydDA2MGsyeXMza2RybHRseDcifQ.6PIzAaAolmDGusdv2uHfjQ"; // TODO: This exposes your username...

const Container = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
`;

export default ({ mapState }: { mapState: MapState }) => {
  const [ map, setMapObject ] = useState<Map | null>(null);
  const mapContainer = useRef(null);
  useEffect(() => {
    if(typeof window !== 'undefined') {
      setMapObject(new mapboxgl.Map({
        container: mapContainer.current as any,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [mapState.longitude, mapState.latitude],
        zoom: mapState.zoom
      }));
    }
  }, []);
  useEffect(() => {
    if(map == null) return
    map.jumpTo({
      center: [mapState.longitude, mapState.latitude],
      zoom: mapState.zoom,
    })
  }, [mapState.longitude, mapState.latitude, mapState.zoom]);
  return <Container ref={mapContainer} />
};