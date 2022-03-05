import { Box, Button, Stack } from "@mui/material";
import { Link, useHistory } from "react-router-dom";

import { DTCSection } from "components/commons";
import React from "react";
import { RouteConst } from "commons/consts";
import { RouteTable } from "../route-table";
import { useGetTradeRouteList } from "../../services/use-get-trade-route-list";

export const DefaultRouteTab = () => {
  const { data, isLoading, invalidate } = useGetTradeRouteList({ isDefault: true });
  const history = useHistory();
  const handleRouteEditClick = (id) => {
    history.push(`${RouteConst.EDIT_DEFAULT_ROUTE}?id=${id}`);
  };
  return (
    <DTCSection>
      <DTCSection.Content>
        <Stack direction="row" justifyContent="flex-end">
          <Link to={RouteConst.ADD_DEFAULT_ROUTE}>
            <Button variant="contained" className="mb-3">
              Create Default Routes
            </Button>
          </Link>
        </Stack>
        <Box mt={2} sx={{ height: "500px" }}>
          <RouteTable
            data={data}
            onInvalidate={invalidate}
            isLoading={isLoading}
            onEditClick={handleRouteEditClick}
            hiddenColumns={["fromCountry", "toCountry"]}
          />
        </Box>
      </DTCSection.Content>
    </DTCSection>
  );
};
