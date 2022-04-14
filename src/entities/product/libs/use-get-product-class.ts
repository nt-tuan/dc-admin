import { getDCProductClass } from "@/services/pim.service";
import { useQuery } from "react-query";

export const useGetProductClass = (
  code: number,
  options: { enabled: boolean; onSuccess?: () => void }
) => {
  return useQuery(["product-class", code], () => getDCProductClass(code), options);
};
