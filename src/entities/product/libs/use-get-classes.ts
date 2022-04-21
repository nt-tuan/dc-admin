import { getProductClasses } from "@/services/pim.service";
import { useQuery } from "react-query";

interface Options {
  enabled?: boolean;
}
export const useGetClasses = (options?: Options) => {
  return useQuery("classes", () => getProductClasses(), { ...options, refetchOnMount: false });
};
