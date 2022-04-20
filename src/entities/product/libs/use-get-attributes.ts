import { getProductAttributes } from "@/services/pim.service";
import { useQuery } from "react-query";

const useGetAttributes = () => {
  return useQuery("attributes", getProductAttributes);
};
export default useGetAttributes;
