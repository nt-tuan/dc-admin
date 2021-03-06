import { pimRoutePaths } from "@/commons/consts/system/routes/pim-route-paths.const";
import {
  AttributeValue,
  BulkResponse,
  createBulkProductAttributeValues,
  createProductAttribute,
  createProductAttributeValue,
  deleteBulkAttributes,
  deleteBulkAttributeValues,
  deleteBulkBricks,
  deleteProductAttributeValue,
  getProductClass,
  ProductAttribute,
  ProductFamily,
  Segment,
  updateProductAttribute,
  updateProductAttributeValue,
  updateProductBrick,
  updateProductClass,
  updateProductFamily,
  updateSegment
} from "@/services/pim.service";
import { useMutation } from "react-query";
import { Dictionary, TreeNodeValue } from "../model/types";
import { useProductClassificationContext } from "../ui/product-classification/provider";
import { findNode, getActualCode, getDecendantCodes, toTreeNodeDictionary } from "./tree-node";
import {
  useInvalidateBrick,
  useInvalidateGetSegments,
  useInvalidateProductAttibutes
} from "./use-get-entity";
import { useHistory } from "react-router-dom";
import useHandleBulkUploadResponse from "./use-handle-bulk-upload-response";

export const deleteNodeAndDecendants = (nodes: Dictionary<TreeNodeValue>, localCode: string) => {
  const nextNodes = { ...nodes };
  const decendants = getDecendantCodes(nodes, localCode);
  for (const dec of decendants) {
    delete nextNodes[dec];
  }
  return nextNodes;
};

export const useUpdateSegmentTitle = (localCode: string) => {
  const invalidate = useInvalidateGetSegments();
  const code = getActualCode(localCode) ?? "";
  const { setNodes } = useProductClassificationContext();
  const reloadSegment = async (segment?: Segment) => {
    if (segment == null) return;
    const newNodes = toTreeNodeDictionary([segment], "Segment");
    setNodes((current) => ({ ...current, ...newNodes }));
  };
  const updateSegmentTitle = async (title: string) => {
    if (code == null) return;
    return await updateSegment({
      code,
      title
    });
  };
  const { mutate, isLoading } = useMutation(updateSegmentTitle, {
    onSuccess: async (segment?: Segment) => {
      await invalidate();
      await reloadSegment(segment);
    }
  });
  return { mutate, isLoading };
};

export const useUpdateFamilyTitle = (localCode: string) => {
  const { setNodes, nodes } = useProductClassificationContext();
  const code = getActualCode(localCode) ?? "";
  const onSuccess = (family?: ProductFamily) => {
    if (family == null) return;
    const parentNode = findNode(nodes, family.segmentCode);
    if (!parentNode) return;
    setNodes((current) => {
      const nextNodes = deleteNodeAndDecendants(current, localCode);
      const newNodes = toTreeNodeDictionary([family], "Family", parentNode.code);
      return { ...nextNodes, ...newNodes };
    });
  };

  const { mutate, isLoading } = useMutation(
    ({ title, segmentCode }: { title: string; segmentCode: string }) =>
      updateProductFamily({ title, segmentCode, code }),
    {
      onSuccess
    }
  );
  return { mutate, isLoading };
};

export const useUpdateClassTitle = (localCode: string) => {
  const { nodes, setNodes } = useProductClassificationContext();
  const code = getActualCode(localCode) ?? "";
  const onSuccess = async () => {
    const actualCode = getActualCode(localCode);
    if (actualCode == null) return;
    const cl = await getProductClass(actualCode);
    if (cl == null) return;
    const parentNode = findNode(nodes, cl.familyCode);
    if (parentNode == null) return;
    setNodes((current) => {
      const nextNodes = deleteNodeAndDecendants(current, localCode);
      const newNodes = toTreeNodeDictionary([cl], "Class", parentNode.code);
      return { ...nextNodes, ...newNodes };
    });
  };

  const { mutate, isLoading } = useMutation(
    ({ title, familyCode }: { title: string; familyCode: string }) =>
      updateProductClass({ title, familyCode, code }),
    {
      onSuccess
    }
  );
  return { mutate, isLoading };
};

export const useUpdateProductBrick = () => {
  const invalidate = useInvalidateBrick();
  const history = useHistory();
  return useMutation(updateProductBrick, {
    onSuccess: async (brick) => {
      history.push(pimRoutePaths.PRODUCT_BRICK);
      await invalidate(brick);
    }
  });
};

interface useDeleteOptions {
  onError: (error: Error) => void;
  onSuccess: () => Promise<void>;
}
const handleOnSuccess = (
  options: useDeleteOptions | undefined,
  invalidate: () => Promise<void>
) => async (result: BulkResponse) => {
  await invalidate();
  if (options?.onSuccess) {
    options.onSuccess();
  }
};
export const useDeleteBricks = (options?: useDeleteOptions) => {
  const invalidate = useInvalidateBrick();
  return useMutation(deleteBulkBricks, {
    onSuccess: handleOnSuccess(options, invalidate),
    onError: options?.onError
  });
};
export const useDeleteProductAttributes = (options?: useDeleteOptions) => {
  const invalidate = useInvalidateProductAttibutes();
  return useMutation(deleteBulkAttributes, {
    onSuccess: handleOnSuccess(options, invalidate),
    onError: options?.onError
  });
};

export const useCreateProductAttribute = () => {
  const { mutate, isLoading } = useMutation(createProductAttribute);
  return { mutate, isLoading };
};

const exludeItems = <T extends unknown>(
  array: T[],
  excludedItems: T[],
  isEqual: (a: T, b: T) => boolean
) => {
  return array.filter((item) => excludedItems.every((excludeItem) => !isEqual(item, excludeItem)));
};

const updateProductAttributeAndValue = async ({
  attribute,
  newValues,
  deletedValues
}: {
  attribute: ProductAttribute;
  newValues: AttributeValue[];
  deletedValues: string[];
}) => {
  await updateProductAttribute({
    code: attribute.code,
    title: attribute.title
  });

  const excessValues = newValues.filter((value) =>
    deletedValues.some((deletedValue) => deletedValue === value.code)
  );
  const responses: BulkResponse = [];
  if (newValues.length > 0) {
    const response = await createBulkProductAttributeValues(
      exludeItems(newValues, excessValues, (a, b) => a.code === b.code)
    );
    responses.push(...response);
  }
  if (deletedValues.length > 0) {
    const response = await deleteBulkAttributeValues(
      exludeItems(
        deletedValues,
        excessValues.map((item) => item.code),
        (a, b) => a === b
      )
    );
    responses.push(...response);
  }
  return responses;
};

export const useUpdateProductAttribute = () => {
  const handleBulkResponse = useHandleBulkUploadResponse();
  const invalidate = useInvalidateProductAttibutes();
  const { mutate, isLoading } = useMutation(updateProductAttributeAndValue, {
    onSuccess: async (bulkResponses) => {
      handleBulkResponse(bulkResponses);
      await invalidate();
    },
    onError: async () => {
      await invalidate();
    }
  });
  return { mutate, isLoading };
};

export const useCreateAttributeValue = () => {
  const invalidate = useInvalidateProductAttibutes();
  return useMutation(createProductAttributeValue, {
    onSuccess: async () => {
      await invalidate();
    }
  });
};

export const useUpdateAttributeValue = () => {
  const invalidate = useInvalidateProductAttibutes();
  return useMutation(updateProductAttributeValue, {
    onSuccess: async () => {
      await invalidate();
    }
  });
};

export const useDeleteAttributeValue = () => {
  const invalidate = useInvalidateProductAttibutes();
  return useMutation(deleteProductAttributeValue, {
    onSuccess: async () => {
      await invalidate();
    }
  });
};
