import { getDCProductClass } from "@/services/pim.service";
import { useQuery } from "react-query";

export const useGetProductClass = (code?: string) => {
  return useQuery(["product-class", code], () => getDCProductClass(code ?? ""), {
    enabled: code != null
  });
};
