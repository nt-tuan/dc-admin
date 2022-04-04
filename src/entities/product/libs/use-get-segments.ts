import { getSegments, getDefaultSegments } from "@/services/pim.service";
import { useQuery } from "react-query";

export const useGetSegments = () => {
  return useQuery(["segments"], getSegments);
};

export const useDefaultGetSegments = () => {
  return useQuery(["segments"], getDefaultSegments);
};
