import { getProductClasses } from "@/services/pim.service";
import { useQuery } from "react-query";

export const useGetClasses = () => {
  return useQuery("classes", getProductClasses);
};
