import { Button } from "antd";
import { RouteConst } from "commons/consts";
import { ROUTE_SCHEMA } from "commons/schemas";
import { DTCTable } from "components";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const OrderActiveTab = () => {
  const [data, setData] = useState([]);

  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      <div className="d-flex justify-content-between">
        <Link to={RouteConst.ADD_ROUTE}>
          <Button type="primary" className="mb-3">
            Create Route
          </Button>
        </Link>
      </div>

      <DTCTable
        showSettings={false}
        loading={false}
        dataSource={data}
        schema={ROUTE_SCHEMA.getTableSchema()}
        onChange={(value) => setData(value)}
      />
    </div>
  );
};

export default OrderActiveTab;
