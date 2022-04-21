import { getProductFamilies, getProductFamily } from "@/services/pim.service";
import { useQuery } from "react-query";

const FAMILY_QUERY_KEY = "families";
export const useGetFamilies = () => {
  return useQuery(FAMILY_QUERY_KEY, getProductFamilies, {
    refetchOnMount: false
  });
};

export const useGetFamily = (code?: string) => {
  return useQuery([FAMILY_QUERY_KEY, code], () => getProductFamily(code ?? ""), {
    enabled: Boolean(code)
  });
};
