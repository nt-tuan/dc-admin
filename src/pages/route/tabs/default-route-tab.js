import { Box, Button, Stack } from "@mui/material";

import { DTCSection } from "components/commons";
import { DatetimeUtils } from "utils/date-time.util";
import { Link } from "react-router-dom";
import React from "react";
import { RouteConst } from "commons/consts";
import { RouteService } from "services";
import { RouteTable } from "./route-table.comp";
import { getAllRecordsFromAPI } from "utils/general.util";

const getDefaultRoutes = async () => {
  const result = await getAllRecordsFromAPI(RouteService.getAll, {
    outerParams: {
      isDefault: true
    }
  });
  return result.map((r) => {
    return {
      ...r,
      createdDate: DatetimeUtils.formatDateTime(r.createdDate)
    };
  });
};

export const DefaultRouteTab = () => {
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
          <RouteTable getData={getDefaultRoutes} />
        </Box>
      </DTCSection.Content>
    </DTCSection>
  );
};
