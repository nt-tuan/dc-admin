import {
  BulkResponse,
  deleteBulkAttributes,
  deleteBulkBricks,
  deleteBulkClasses,
  deleteBulkFamilies,
  deleteBulkSegments
} from "@/services/pim.service";
import { useModal } from "mui-modal-provider";
import React from "react";
import { useMutation } from "react-query";
import { Dictionary, TreeNodeValue } from "../model/types";
import DeleteFailedAlert from "../ui/delete-failed-alert";
import { useProductClassificationContext } from "../ui/product-classification";
import { getDecendantCodes } from "./tree-node";

export const deleteTreeNodes = async (
  nodes: Dictionary<TreeNodeValue>,
  nodeSelection: Dictionary<boolean>
) => {
  const deletedCodes = Object.keys(nodeSelection).filter((item) => nodeSelection[item]);
  const deletedSegments: string[] = [];
  const deletedFamilies: string[] = [];
  const deletedClasses: string[] = [];
  const deletedBricks: string[] = [];
  const deletedAttributes: string[] = [];

  for (const code of deletedCodes) {
    const node = nodes[code];
    if (node == null) continue;
    switch (node.type) {
      case "Segment":
        deletedSegments.push(node.actualCode);
        break;
      case "Family":
        deletedFamilies.push(node.actualCode);
        break;
      case "Class":
        deletedClasses.push(node.actualCode);
        break;
      case "Brick":
        deletedBricks.push(node.actualCode);
        break;
      case "Attribute":
        deletedAttributes.push(node.actualCode);
        break;
    }
  }

  const result: { successCodes: string[]; failedCodes: string[] } = {
    successCodes: [],
    failedCodes: []
  };
  const updateResult = (response: BulkResponse) => {
    const successCodes = response.filter((item) => item.status === 204).map((item) => item.code);
    const failedCodes = response.filter((item) => item.status !== 204).map((item) => item.code);
    result.successCodes.push(...successCodes);
    result.failedCodes.push(...failedCodes);
  };

  const deleteEntities = async <T extends any>(
    fn: (e: T[]) => Promise<BulkResponse>,
    entities: T[]
  ) => {
    if (entities.length === 0) return;
    const response = await fn(entities);
    updateResult(response);
  };

  await deleteEntities(deleteBulkAttributes, deletedAttributes);
  await deleteEntities(deleteBulkBricks, deletedBricks);
  await deleteEntities(deleteBulkClasses, deletedClasses);
  await deleteEntities(deleteBulkFamilies, deletedFamilies);
  await deleteEntities(deleteBulkSegments, deletedSegments);
  return result;
};

const useDeleteLocalNodes = () => {
  const { nodes, nodeSelection, setNodes, setNodeSelection } = useProductClassificationContext();
  return React.useCallback(
    (codes: string[]) => {
      const nextNodes = { ...nodes };
      const nextSelection = { ...nodeSelection };
      for (const code of codes) {
        const decendants = getDecendantCodes(nodes, code);
        for (const decendant of decendants) {
          delete nextNodes[decendant];
          delete nextSelection[decendant];
        }
      }
      setNodes(nextNodes);
      setNodeSelection(nextSelection);
    },
    [nodes, nodeSelection, setNodes, setNodeSelection]
  );
};

const useDeleteProductClassification = () => {
  const { showModal } = useModal();
  const deleteLocalNodes = useDeleteLocalNodes();
  const { nodes, nodeSelection } = useProductClassificationContext();
  const { mutate, isLoading: isDeleting } = useMutation(
    () => deleteTreeNodes(nodes, nodeSelection),
    {
      onSuccess: (result) => {
        deleteLocalNodes(result.successCodes);
        const nodeList = Object.values(nodes);
        if (result.failedCodes.length > 0) {
          const titles = result.failedCodes.map((code) => {
            const foundNode = nodeList.find((node) => node.code.endsWith(code));
            return foundNode?.title ?? code;
          });
          const title = titles.join(", ");
          const modal = showModal(DeleteFailedAlert, {
            onCancel: () => modal?.destroy(),
            title
          });
        }
      }
    }
  );
  const canDelete = React.useMemo(() => {
    return Object.values(nodeSelection).some((item) => item);
  }, [nodeSelection]);
  return { canDelete, mutate, isDeleting };
};
export default useDeleteProductClassification;
