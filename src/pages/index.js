import React, { useReducer } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import Map from "@components/view/Map";
import SEO from "../components/seo"
import Reporter from "@components/data/reporter";

import { DEFAULT_MAP_STATE, mapStateReducer, GeolocationContext } from '@services/Geolocation';

const IndexPage = () => {
  const [ mapState, setMapState ] = useReducer(mapStateReducer, DEFAULT_MAP_STATE);
  return (
    <Layout>
      <SEO title="Safe Lanes" />
      <Map mapState={mapState}/>
      <Reporter setMapState={setMapState} />
    </Layout>
  )
};

export default IndexPage;
