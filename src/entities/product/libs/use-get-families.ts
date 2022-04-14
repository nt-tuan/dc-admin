import { getProductFamilies } from "@/services/pim.service";
import { useQuery } from "react-query";

const FAMILY_QUERY_KEY = "families";
export const useGetFamilies = () => {
  return useQuery(FAMILY_QUERY_KEY, getProductFamilies);
};
