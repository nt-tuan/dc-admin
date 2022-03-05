import { useQuery, useQueryClient } from "react-query";

import { DatetimeUtils } from "@/utils/date-time.util";
import React from "react";
import { RouteService } from "./route.service";
import countryJson from "assets/country.json";
import { getAllRecordsFromAPI } from "@/utils/general.util";

const getRoutes = (params) => async () => {
  const result = await getAllRecordsFromAPI(RouteService.getAll, {
    outerParams: params
  });
  return result.map((r) => {
    const targetFromCountry = countryJson.find((c) => c.alpha2Code === r.fromCountry);
    const targetToCountry = countryJson.find((c) => c.alpha2Code === r.toCountry);
    return {
      ...r,
      createdDate: DatetimeUtils.formatDateTime(r.createdDate),
      toCountry: targetToCountry?.name,
      fromCountry: targetFromCountry?.name
    };
  });
};

export const useGetTradeRouteList = (params) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["trade-routes", params], getRoutes(params));
  const invalidate = React.useCallback(() => queryClient.invalidateQueries(["trade-routes"]), [
    queryClient
  ]);
  return { data, isLoading, invalidate };
};
