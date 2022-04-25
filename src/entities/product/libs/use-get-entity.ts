import {
  getProductAttributes,
  getProductBrick,
  getProductBricks,
  getProductClasses,
  getProductFamilies,
  getProductFamily,
  getDCProductClass,
  getSegments,
  getDCSegments,
  getSegment,
  PaginationParams,
  getProductClass
} from "@/services/pim.service";
import { useQuery, useQueryClient } from "react-query";

export const useGetAttributes = () => {
  return useQuery("attributes", getProductAttributes);
};

export const useGetBricks = (params?: PaginationParams) => {
  return useQuery(["bricks", params], () => getProductBricks(params));
};
export const useGetBrick = (code?: string) => {
  return useQuery(["brick", code], () => getProductBrick(code ?? ""), { enabled: code != null });
};
export const useInvalidateBrick = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries("bricks");
};
interface Options {
  enabled?: boolean;
}
export const useGetClasses = (options?: Options) => {
  return useQuery("classes", () => getProductClasses(), { ...options, refetchOnMount: false });
};
export const useGetProductClass = (code?: string) => {
  return useQuery(["classes", code], () => getProductClass(code ?? ""), {
    enabled: code != null,
    refetchOnMount: false
  });
};

const FAMILY_QUERY_KEY = "families";
export const useGetFamilies = (params?: PaginationParams) => {
  return useQuery([FAMILY_QUERY_KEY, params], () => getProductFamilies(params), {
    refetchOnMount: false
  });
};

export const useGetFamily = (code?: string) => {
  return useQuery([FAMILY_QUERY_KEY, code], () => getProductFamily(code ?? ""), {
    enabled: Boolean(code)
  });
};

export const useGetDCProductClass = (code?: string) => {
  return useQuery(["product-class", code], () => getDCProductClass(code ?? ""), {
    enabled: code != null
  });
};

const SEGMENT_QUERY_KEY = "segments";
export const useGetSegments = () => {
  return useQuery(SEGMENT_QUERY_KEY, () => getSegments(), {
    refetchOnMount: false
  });
};
export const useGetSegment = (code?: string) => {
  return useQuery([SEGMENT_QUERY_KEY, code], () => getSegment(code ?? ""), {
    enabled: code != null
  });
};
export const useInvalidateGetSegments = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(SEGMENT_QUERY_KEY);
};

const DC_SEGMENT_QUERY_KEY = "dc-segments";
export const useGetDCSegments = () => {
  return useQuery(DC_SEGMENT_QUERY_KEY, getDCSegments);
};