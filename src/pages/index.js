import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Reporter from "@components/data/reporter";

const IndexPage = () => (
  <Layout>
    <SEO title="Safe Lanes" />
    <Reporter />
  </Layout>
)

export default IndexPage;
