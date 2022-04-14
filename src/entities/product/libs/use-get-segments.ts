import { getSegments, getDefaultSegments } from "@/services/pim.service";
import { useQuery, useQueryClient } from "react-query";

const SEGMENT_QUERY_KEY = "segments";
export const useGetSegments = () => {
  return useQuery(SEGMENT_QUERY_KEY, getSegments);
};
export const useInvalidateGetSegments = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(SEGMENT_QUERY_KEY);
};

const DC_SEGMENT_QUERY_KEY = "dc-segments";
export const useGetDCSegments = () => {
  return useQuery(DC_SEGMENT_QUERY_KEY, getDefaultSegments);
};
