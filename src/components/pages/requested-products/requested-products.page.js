import { RequestedProductsTable } from "components/organisms";
import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import moment from "moment";
import { DATETIME_FORMAT } from "commons/consts";

const RequestedProductsPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const mapRequestedProductsData = (requestedProducts) => {
    return requestedProducts.map((item) => {
      item.timestamp = moment(item.timestamp).format(DATETIME_FORMAT);
      return item;
    });
  };
  const getRequestedProductsData = useCallback(() => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      //TODO: APPLY API
      setData(mapRequestedProductsData(mockData));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getRequestedProductsData();
  }, [getRequestedProductsData]);

  return (
    <article className="air__utils__shadow bg-white p-4 dtc-br-10">
      <Helmet title="Requested Products" />
      <RequestedProductsTable data={data} loading={loading} />
    </article>
  );
};

export default RequestedProductsPage;

const mockData = [
  {
    timestamp: "2020-10-27T13:10:46.163Z",
    productCategory: "productCategory",
    productType: "productType",
    productName: "productName",
    numberOfRequests: "0",
    companyNames: ["Minh Company", "Thuy Company"]
  },
  {
    timestamp: "2020-10-27T13:10:46.163Z",
    productCategory: "productCategory",
    productType: "productType",
    productName: "productName",
    numberOfRequests: "3",
    companyNames: []
  }
];
