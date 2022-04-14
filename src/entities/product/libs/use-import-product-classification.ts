import React from "react";
import { importPimData, ImportSegment } from "@/services/pim.service";
import { useMutation } from "react-query";
import type { TreeNodeValue, Dictionary } from "../model/types";
import { getNodesByCode, isNodeChecked } from "./tree-node";

interface BaseValue {
  code: number;
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
    code: Number(segment.code),
    title: segment.title,
    families: segment.families?.map((family) => ({
      code: Number(family.code),
      segmentCode: Number(segment.code),
      title: family.title,
      classes: family.classes?.map((cl) => ({
        code: Number(cl.code),
        familyCode: Number(family.code),
        title: cl.title,
        bricks: cl.bricks?.map((brick) => ({
          code: Number(brick.code),
          classCode: Number(cl.code),
          title: brick.title,
          attributes: brick.attributes?.map((attribute) => ({
            code: Number(attribute.code),
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
  const { mutate, isLoading } = useMutation(importPimData);
  const isCreatable = React.useMemo(
    () => Object.values(selectedCodes).filter((checked) => checked).length > 0,
    [selectedCodes]
  );
  const importData = React.useCallback(
    (onSuccess?: () => void) => {
      const segments = parseTreeNodeValue(nodes, selectedCodes);
      mutate(segments, { onSuccess });
    },
    [mutate, nodes, selectedCodes]
  );
  return { isCreatable, importData, isLoading };
};
export default useImportProductClassification;
