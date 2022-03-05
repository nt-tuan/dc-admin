import { RouteService } from "./route.service";
import { useQuery } from "react-query";

export const useGetTradeRoute = (id) => {
  return useQuery(["trade-route", id], () => RouteService.get(id));
};
