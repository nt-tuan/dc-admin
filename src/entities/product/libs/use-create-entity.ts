import {
  createProductBrick,
  createProductClass,
  createProductFamily,
  createSegment,
  ProductBrick,
  ProductClass,
  ProductFamily,
  Segment
} from "@/services/pim.service";
import { useMutation } from "react-query";

export const useCreateSegment = ({
  onSuccess
}: {
  onSuccess: (segment: Segment) => Promise<void>;
}) => {
  const { mutate, isLoading } = useMutation(createSegment, {
    onSuccess
  });
  return { mutate, isLoading };
};
export const useCreateProductFamily = ({
  onSuccess
}: {
  onSuccess: (segment: ProductFamily) => Promise<void>;
}) => {
  const { mutate, isLoading } = useMutation(createProductFamily, {
    onSuccess
  });
  return { mutate, isLoading };
};

export const useCreateProductClass = ({
  onSuccess
}: {
  onSuccess: (segment: ProductClass) => Promise<void>;
}) => {
  const { mutate, isLoading } = useMutation(createProductClass, {
    onSuccess
  });
  return { mutate, isLoading };
};

export const useCreateProductBrick = (options?: {
  onSuccess: (segment: ProductBrick) => Promise<void>;
}) => {
  const { mutate, isLoading } = useMutation(createProductBrick, options);
  return { mutate, isLoading };
};
