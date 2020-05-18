import React from "react";
import { Helmet } from "react-helmet";
import Error404 from "components/system/errors/404/404.comp";

const Error404Page = () => (
  <div>
    <Helmet title="Page 404" />
    <Error404 />
  </div>
);

export default Error404Page;
