import { RouteConst } from "@/commons/consts";
import { useMessage } from "@/hooks/use-message";
import { DatetimeUtils } from "@/utils/date-time.util";
import { getAllRecordsFromAPI } from "@/utils/general.util";
import countryJson from "@/assets/country";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";

import { RouteService } from "./route.service";

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

const TRADE_ROUTES_QUERY_KEY = "trade-routes";
export const useGetTradeRouteList = (params) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery([TRADE_ROUTES_QUERY_KEY, params], getRoutes(params));
  const invalidate = React.useCallback(
    () => queryClient.invalidateQueries([TRADE_ROUTES_QUERY_KEY]),
    [queryClient]
  );
  return { data, isLoading, invalidate };
};

export const useMutateTradeRoute = (id, isDefault) => {
  const message = useMessage();
  const history = useHistory();
  const client = useQueryClient();
  const onSuccess = () => {
    message.success("Edit Successfully");
    client.invalidateQueries([TRADE_ROUTES_QUERY_KEY]);
    if (isDefault) {
      history.push(`${RouteConst.TRADE_ROUTES}?tab=DEFAULT_ROUTE`);
      return;
    }
    history.push(RouteConst.TRADE_ROUTES);
  };
  const { mutate, isLoading } = useMutation((values) => RouteService.edit(id, values), {
    onSuccess
  });
  return { mutate, isLoading };
};
