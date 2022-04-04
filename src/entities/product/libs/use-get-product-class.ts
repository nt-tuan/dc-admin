import { getProductClass } from "@/services/pim.service";
import { useQuery } from "react-query";

export const useGetProductClass = (code: number, options: { enabled: boolean }) => {
  return useQuery(["product-class", code], () => getProductClass(code), options);
};
