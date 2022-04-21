import {
  createAttribute,
  getAttribute,
  getProductAttributes,
  updateAttribute
} from "@/services/pim.service";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { useMessage } from "@/hooks/use-message";

const ATTRIBUTES_QUERY_KEY = "product-attributes";

export const useGetAttributes = () => {
  return useQuery(ATTRIBUTES_QUERY_KEY, getProductAttributes);
};
export const useInvalidateGetAttibutes = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(ATTRIBUTES_QUERY_KEY);
};

export const useGetAttribute = () => {
  return useQuery("product-attribute", getAttribute);
};

export const useCreateAttribute = () => {
  const { mutate, isLoading } = useMutation(createAttribute);
  return { mutate, isLoading };
};

export const useUpdateAttribute = () => {
  const message = useMessage();
  const { mutate, isLoading } = useMutation(updateAttribute, {
    onSuccess: () => {
      message.success("Update successfully.");
    }
  });
  return { mutate, isLoading };
};
