import React from "react";
import { importPimData, ImportSegment } from "@/services/pim.service";
import { useMutation } from "react-query";
import type { TreeNodeValue, Dictionary } from "../model/types";
import { getNodesByCode, isNodeChecked } from "./tree-node";
import { useInvalidateGetSegments } from "./use-get-entity";

interface BaseValue {
  code: string;
  title: string;
  localCode: string;
}
const parseBaseValue = (node: TreeNodeValue) => ({
  code: node.actualCode,
  title: node.title,
  localCode: node.code
});
const parseTreeNodeValue = (
  allNodes: Dictionary<TreeNodeValue>,
  selectedCodes: Dictionary<boolean>
) => {
  const nodes: Dictionary<TreeNodeValue> = allNodes;
  const segments: (ImportSegment & { localCode: string })[] = getNodesByCode(nodes)
    .filter((item) => selectedCodes[item.code])
    .map(parseBaseValue);
  const families: (BaseValue & { classes?: BaseValue[] })[] = [];
  const classes: (BaseValue & { bricks?: BaseValue[] })[] = [];
  const bricks: (BaseValue & { attributes?: BaseValue[] })[] = [];

  const loadChildren = <T>(
    entities: (BaseValue & T)[],
    update: (entity: BaseValue & T, children: BaseValue[]) => void
  ) => {
    console.log(entities);
    for (const entity of entities) {
      const children = getNodesByCode(nodes, entity.localCode);
      const updatedChildren = children.filter((item) => {
        return isNodeChecked(selectedCodes, item.code);
      });
      const parsedChildren = updatedChildren.map(parseBaseValue);
      update(entity, parsedChildren);
    }
  };
  loadChildren(segments, (segment, children) => {
    segment.families = children;
    families.push(...children);
  });
  loadChildren(families, (family, children) => {
    family.classes = children;
    classes.push(...children);
  });
  loadChildren(classes, (cl, children) => {
    cl.bricks = children;
    bricks.push(...children);
  });
  loadChildren(bricks, (brick, children) => {
    brick.attributes = children;
  });
  return segments.map((segment) => ({
    code: segment.code,
    title: segment.title,
    families: segment.families?.map((family) => ({
      code: family.code,
      segmentCode: segment.code,
      title: family.title,
      classes: family.classes?.map((cl) => ({
        code: cl.code,
        familyCode: family.code,
        title: cl.title,
        bricks: cl.bricks?.map((brick) => ({
          code: brick.code,
          classCode: cl.code,
          title: brick.title,
          attributes: brick.attributes?.map((attribute) => ({
            code: attribute.code,
            title: attribute.title
          }))
        }))
      }))
    }))
  }));
};

const useImportProductClassification = (
  nodes: Dictionary<TreeNodeValue>,
  selectedCodes: Dictionary<boolean>
) => {
  const invalidate = useInvalidateGetSegments();
  const { mutate, isLoading } = useMutation(importPimData);
  const isCreatable = React.useMemo(
    () => Object.values(selectedCodes).filter((checked) => checked).length > 0,
    [selectedCodes]
  );
  const importData = React.useCallback(
    (onSuccess?: () => Promise<void>) => {
      const segments = parseTreeNodeValue(nodes, selectedCodes);
      mutate(segments, {
        onSuccess: async () => {
          await invalidate();
          if (onSuccess) {
            await onSuccess();
          }
        }
      });
    },
    [mutate, nodes, selectedCodes, invalidate]
  );
  return { isCreatable, importData, isLoading };
};
export default useImportProductClassification;
