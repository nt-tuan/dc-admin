import {
  deleteBulkAttributes,
  deleteBulkBricks,
  deleteBulkClasses,
  deleteBulkFamilies,
  deleteBulkSegments
} from "@/services/pim.service";
import React from "react";
import { useMutation } from "react-query";
import { Dictionary, TreeNodeValue } from "../model/types";

const useDeleteProductClassification = (
  nodes: Dictionary<TreeNodeValue>,
  nodeSelection: Dictionary<boolean>
) => {
  const { mutate } = useMutation(async () => {
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

    const deleteSegmentsPromise = async () => {
      if (deletedSegments.length === 0) return;
      await deleteBulkSegments(deletedSegments);
    };
    const deleteFamiliesPromise = async () => {
      if (deletedFamilies.length === 0) return;
      await deleteBulkFamilies(deletedFamilies);
    };
    const deleteClassesPromise = async () => {
      if (deletedClasses.length === 0) return;
      await deleteBulkClasses(deletedClasses);
    };
    const deleteBricksPromise = async () => {
      if (deletedBricks.length === 0) return;
      await deleteBulkBricks(deletedBricks);
    };
    const deleteAttributePromise = async () => {
      if (deletedAttributes.length === 0) return;
      await deleteBulkAttributes(deletedAttributes);
    };
    await Promise.all([
      deleteSegmentsPromise(),
      deleteFamiliesPromise(),
      deleteClassesPromise(),
      deleteBricksPromise(),
      deleteAttributePromise()
    ]);
  });
  const canDelete = React.useMemo(() => {
    return Object.values(nodeSelection).some((item) => item);
  }, [nodeSelection]);
  return { canDelete, mutate };
};
export default useDeleteProductClassification;
