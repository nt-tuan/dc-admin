import { useQuery } from "react-query";

import { RouteService } from "./route.service";

export const useGetTradeRoute = (id) => {
  return useQuery(["trade-routes", id], () => RouteService.get(id));
};

const getDefault = ({ categoryId, typeId }) => {
  return RouteService.getDefault({ categoryId, typeId });
};
export const useGetDefaultRouteByProduct = ({ categoryId, typeId }) => {
  return useQuery(
    ["default-route-by-product", { categoryId, typeId }],
    () => getDefault({ categoryId, typeId }),
    {
      enabled: Boolean(categoryId && typeId)
    }
  );
};
