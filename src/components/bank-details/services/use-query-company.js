import { useQuery } from "react-query";
import { getCompanyInfo } from "./bank-services";

export const useQueryCompany = () => {
  const { data, isLoading } = useQuery(["company"], getCompanyInfo);
  return { data, isLoading };
};
