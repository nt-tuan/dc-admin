import { DTCSection, DTCTabs, useTabSearchParams } from "components/commons";
import { Link, useHistory } from "react-router-dom";

import { Button } from "@mui/material";
import React from "react";
import { RouteConst } from "commons/consts";
import Stack from "@mui/material/Stack";
import { RouteTable as Table } from "../route-table";
import { useGetTradeRouteList } from "../../services/use-get-trade-route-list";

const RouteTable = () => {
  const { data, isLoading, invalidate } = useGetTradeRouteList({ isDefault: false });
  const history = useHistory();
  const handleRouteEditClick = (id) => {
    history.push(`${RouteConst.EDIT_TRADE_ROUTE}?id=${id}`);
  };
  return (
    <Table
      data={data}
      isLoading={isLoading}
      onInvalidate={invalidate}
      onEditClick={handleRouteEditClick}
    />
  );
};
const tabs = [
  {
    label: "Active",
    key: "ACTIVE",
    component: <RouteTable />
  }
];

export const RouteTab = () => {
  const [value, onChange] = useTabSearchParams(tabs, "status");
  return (
    <DTCSection>
      <DTCSection.Content>
        <Stack direction="row" justifyContent="flex-end">
          <Link to={RouteConst.CREATE_TRADE_ROUTES}>
            <Button variant="contained" className="mb-3">
              Trade Routes Creation
            </Button>
          </Link>
        </Stack>
        <DTCTabs tabs={tabs} value={value} onChange={onChange} />
      </DTCSection.Content>
    </DTCSection>
  );
};
