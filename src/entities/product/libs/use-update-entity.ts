import {
  deleteBulkBricks,
  getProductClass,
  ProductFamily,
  Segment,
  updateProductClass,
  updateProductFamily,
  updateSegment
} from "@/services/pim.service";
import { useMutation } from "react-query";
import { Dictionary, TreeNodeValue } from "../model/types";
import { useProductClassificationContext } from "../ui/product-classification/provider";
import { findNode, getActualCode, getDecendantCodes, toTreeNodeDictionary } from "./tree-node";
import { useInvalidateBrick } from "./use-get-bricks";

export const deleteNodeAndDecendants = (nodes: Dictionary<TreeNodeValue>, localCode: string) => {
  const nextNodes = { ...nodes };
  const decendants = getDecendantCodes(nodes, localCode);
  for (const dec of decendants) {
    delete nextNodes[dec];
  }
  return nextNodes;
};

export const useUpdateSegmentTitle = (localCode: string) => {
  const code = getActualCode(localCode) ?? "";
  const { setNodes } = useProductClassificationContext();
  const reloadSegment = async (segment?: Segment) => {
    if (segment == null) return;
    const newNodes = toTreeNodeDictionary([segment], "Segment");
    setNodes((current) => ({ ...current, ...newNodes }));
  };
  const updateSegmentTitle = async (title: string) => {
    if (code == null) return;
    return await updateSegment(code, {
      code,
      title
    });
  };
  const { mutate, isLoading } = useMutation(updateSegmentTitle, {
    onSuccess: (segment?: Segment) => reloadSegment(segment)
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
    console.log(nodes, cl, parentNode);
    if (parentNode == null) return;
    setNodes((current) => {
      const nextNodes = deleteNodeAndDecendants(current, localCode);
      const newNodes = toTreeNodeDictionary([cl], "Class", parentNode.code);
      console.log(newNodes);
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

export const useDeleteBricks = (options?: {
  onError: (error: Error) => void;
  onSuccess: () => void;
}) => {
  const invalidate = useInvalidateBrick();
  return useMutation(deleteBulkBricks, {
    onSuccess: async () => {
      if (options?.onSuccess) {
        options.onSuccess();
      }
      await invalidate();
    },
    onError: options?.onError
  });
};
