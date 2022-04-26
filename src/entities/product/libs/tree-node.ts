import {
  getDCProductClass,
  ProductBrick,
  ProductClass,
  ProductFamily,
  Segment
} from "@/services/pim.service";
import type { Dictionary, EntityType, ProductEntity, TreeNodeValue } from "../model/types";

export const getNodesByCode = (nodeDictionary: Dictionary<TreeNodeValue>, code?: string) => {
  return Object.values(nodeDictionary).filter(
    (item) => item.parentCode === code
  ) as TreeNodeValue[];
};

export const getActualCode = (fullCode?: string) => {
  if (fullCode === undefined) return undefined;
  const codeParts = fullCode.split(".");
  return codeParts[codeParts.length - 1];
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
  return ancestors.slice(0, ancestors.length - 1).reverse();
};

export const getDecendantCodes = (nodeDictionary: Dictionary<TreeNodeValue>, code?: string) => {
  if (code == null) return Object.keys(nodeDictionary);
  const decendantCodes: string[] = code ? [code] : [];
  const keys = Object.keys(nodeDictionary);
  for (const key of keys) {
    if (key.includes(`${code}.`)) {
      decendantCodes.push(key);
    }
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
    Brick: async (parentCode: string) => {
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

interface IQueueItem {
  entity: ProductEntity;
  code: string;
  parentCode?: string;
  type: EntityType;
}

export const toDictionary = <T>(
  entities: ProductEntity[],
  intialType: EntityType = "Segment",
  intialParentCode: string | undefined,
  getValue: (queueItem: IQueueItem, entity: ProductEntity) => T
) => {
  const dictionary: Dictionary<T> = {};
  const queue: IQueueItem[] = [];
  const enqueueEntities = (
    entities: ProductEntity[] | undefined,
    type: EntityType,
    parentCode?: string
  ) => {
    if (entities == null) return;
    for (const entity of entities) {
      let composedCode = parentCode ? `${parentCode}.${entity.code}` : `${entity.code}`;
      queue.push({
        entity,
        type,
        code: composedCode,
        parentCode
      });
    }
  };
  enqueueEntities(entities, intialType, intialParentCode);
  let first = 0;
  while (first < queue.length) {
    const current = queue[first];
    const currentEntity = current.entity;
    const currentType = current.type;
    switch (currentType) {
      case "Segment":
        enqueueEntities((currentEntity as Segment).families, "Family", current.code);
        break;
      case "Family":
        enqueueEntities((currentEntity as ProductFamily).classes, "Class", current.code);
        break;
      case "Class":
        enqueueEntities((currentEntity as ProductClass).bricks, "Brick", current.code);
        break;
      case "Brick":
        enqueueEntities((currentEntity as ProductBrick).attributes, "Attribute", current.code);
        break;
    }
    dictionary[current.code] = getValue(current, currentEntity);
    first++;
  }
  return dictionary;
};

export const toTreeNodeDictionary = (
  enitty: ProductEntity[],
  type?: EntityType,
  parentCode?: string
) => {
  return toDictionary<TreeNodeValue>(enitty, type, parentCode, (queueItem, entity) => {
    const treeNodeValue: TreeNodeValue = {
      code: queueItem.code,
      actualCode: entity.code,
      title: entity.title,
      parentCode: queueItem.parentCode,
      type: queueItem.type
    };
    return treeNodeValue;
  });
};

export const extractLocalCode = (localCode?: string) => {
  const codes = localCode?.split(".") ?? [];
  const [segmentCode, familyCode, classCode, brickCode, attributeCode] = codes;
  return {
    segmentCode,
    familyCode,
    classCode,
    brickCode,
    attributeCode
  };
};

export const findNode = (nodes: Dictionary<TreeNodeValue>, code: string) => {
  const foundEntry = Object.entries(nodes).find(
    ([key]) => key === code || key.endsWith(`.${code}`)
  );
  if (foundEntry == null) return;
  return foundEntry[1];
};
