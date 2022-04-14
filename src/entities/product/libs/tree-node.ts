import { getDCProductClass } from "@/services/pim.service";
import type { Dictionary, EntityType, TreeNodeValue } from "../model/types";

export const getNodesByCode = (nodeDictionary: Dictionary<TreeNodeValue>, code?: string) => {
  return Object.values(nodeDictionary).filter(
    (item) => item.parentCode === code
  ) as TreeNodeValue[];
};

export const getActualCode = (fullCode: string) => {
  const codeParts = fullCode.split(".");
  const code = codeParts[codeParts.length - 1];
  return Number(code);
};

export const getAncestorCodes = (code?: string) => {
  if (code == null) return [];
  const codeParts = code.split(".");
  const ancestors: string[] = [];
  for (const codePart of codeParts) {
    const lastAncestor = ancestors[ancestors.length - 1];
    const nextAncestor = lastAncestor ? `${lastAncestor}.${codePart}` : codePart;
    ancestors.push(nextAncestor);
  }
  return ancestors.reverse().slice(0, ancestors.length - 1);
};

export const getDecendantCodes = (nodeDictionary: Dictionary<TreeNodeValue>, code?: string) => {
  const decendantCodes: string[] = code ? [code] : [];
  const decendantNodes = getNodesByCode(nodeDictionary, code);
  for (const dec of decendantNodes) {
    decendantCodes.push(...getDecendantCodes(nodeDictionary, dec.code));
  }
  return decendantCodes;
};

export const isNodeChecked = (selectedCodes: Dictionary<boolean>, code: string) => {
  if (code in selectedCodes) return Boolean(selectedCodes[code]);
  const ancestorCodes = getAncestorCodes(code);
  for (const ancestorCode of ancestorCodes) {
    if (ancestorCode in selectedCodes) {
      return Boolean(selectedCodes[ancestorCode]);
    }
  }
  return false;
};

export const getDCDataLoaders = () => {
  return {
    Segment: async (parentCode: number) => {
      const productClass = await getDCProductClass(parentCode);
      return productClass.bricks ?? [];
    }
  };
};

const entityTypes: EntityType[] = ["Segment", "Family", "Class", "Brick", "Attribute"];
export const getLowerEntityType = (type: EntityType) => {
  const foundIndex = entityTypes.indexOf(type);
  return entityTypes[foundIndex + 1];
};
