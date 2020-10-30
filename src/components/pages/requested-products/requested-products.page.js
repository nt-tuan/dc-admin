import { RequestedProductsTable } from "components/organisms";
import React from "react";
import { Helmet } from "react-helmet";

const RequestedProductsPage = () => {
  return (
    <article className="air__utils__shadow bg-white p-4 dtc-br-10">
      <Helmet title="Requested Products" />
      <RequestedProductsTable />
    </article>
  );
};

export default RequestedProductsPage;
