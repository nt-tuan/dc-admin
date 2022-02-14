import { DTCTabs, useTabSearchParams } from "components/commons";

import { Button } from "@mui/material";
import { DTCSection } from "components/commons";
import { DatetimeUtils } from "utils/date-time.util";
import { Link } from "react-router-dom";
import React from "react";
import { RouteConst } from "commons/consts";
import { RouteService } from "services";
import { RouteTable } from "./route-table.comp";
import Stack from "@mui/material/Stack";
import countryJson from "assets/country.json";
import { getAllRecordsFromAPI } from "utils/general.util";

const getActiveRoutesFn = (status) => async () => {
  const result = await getAllRecordsFromAPI(RouteService.getAll, {
    outerParams: {
      isDefault: false,
      status
    }
  });
  return result.map((r) => {
    const targetFromCountry = countryJson.find((c) => c.alpha2Code === r.fromCountry);
    const targetToCountry = countryJson.find((c) => c.alpha2Code === r.toCountry);
    return {
      ...r,
      createdDate: DatetimeUtils.formatDateTime(r.createdDate),
      toCountry: targetToCountry.name,
      fromCountry: targetFromCountry.name
    };
  });
};

const tabs = [
  {
    label: "Active",
    key: "ACTIVE",
    component: <RouteTable getData={getActiveRoutesFn("ACTIVE")} />
  },
  {
    label: "Pending",
    key: "PENDING",
    component: <RouteTable getData={getActiveRoutesFn("PENDING")} />
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
