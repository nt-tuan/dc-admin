/* eslint-disable */
import React from "react";

import { Segment, ProductFamily, ProductClass, ProductBrick } from "@/services/pim.service";
import { useAsyncErrorHandler } from "@/utils/error-handler.util";
import { Dictionary, EntityType, ProductEntity, TreeNodeValue } from "../../model/types";
import {
  getActualCode,
  getAncestorCodes,
  getDecendantCodes,
  getLowerEntityType,
  getNodesByCode,
  isNodeChecked
} from "../../libs/tree-node";

const toDictionary = (
  entities: ProductEntity[],
  intialType: EntityType = "Segment",
  intialParentCode?: string
) => {
  const dictionary: Dictionary<TreeNodeValue> = {};
  interface IQueueItem {
    entity: ProductEntity;
    code: string;
    parentCode?: string;
    type: EntityType;
  }
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
    let type: EntityType = "Attribute";
    if (currentType === "Segment") {
      enqueueEntities((currentEntity as Segment).families, "Family", current.code);
      type = "Segment";
    }
    if (currentType === "Family") {
      enqueueEntities((currentEntity as ProductFamily).classes, "Class", current.code);
      type = "Family";
    }
    if (currentType === "Class") {
      enqueueEntities((currentEntity as ProductClass).bricks, "Brick", current.code);
      type = "Class";
    }
    if ("attributes" in currentEntity) {
      enqueueEntities((currentEntity as ProductBrick).attributes, "Attribute", current.code);
      type = "Brick";
    }
    dictionary[current.code] = {
      code: current.code,
      actualCode: currentEntity.code,
      title: currentEntity.title,
      parentCode: current.parentCode,
      type
    };
    first++;
  }
  return dictionary;
};
type UpdateAction = (code: string, fn: (node: TreeNodeValue) => TreeNodeValue) => void;
interface IProductClassificationContext {
  nodes: Dictionary<TreeNodeValue>;
  nodeSelection: Dictionary<boolean>;
  getNodes: (code?: string) => TreeNodeValue[];
  loadMoreData: (parentCode: string, type: EntityType) => Promise<void>;
  changeCheckbox: (code: string | undefined, checked: boolean) => void;
  isChecked: (code: string) => boolean;
  updateNode: UpdateAction;
}
const ProductClassificationContext = React.createContext<IProductClassificationContext>({
  nodes: {},
  nodeSelection: {},
  getNodes: () => [],
  loadMoreData: async () => {},
  changeCheckbox: () => {},
  isChecked: () => true,
  updateNode: () => {}
});

interface Props {
  segments: Segment[];
  loaders: {
    [key in EntityType]?: (parentCode: number) => Promise<ProductEntity[]>;
  };
}

const Provider = ({ children, segments, loaders }: React.PropsWithChildren<Props>) => {
  const asyncWrapper = useAsyncErrorHandler();
  const [nodeDictionary, setNodeDictionary] = React.useState(toDictionary(segments));
  const getNodes = (code?: string) => {
    return getNodesByCode(nodeDictionary, code);
  };
  const [nodeSelection, setNodeSelection] = React.useState<Dictionary<boolean>>(() => {
    const initSelection = {};
    const codes = Object.keys(nodeDictionary);
    for (const code of codes) {
      initSelection[code] = false;
    }
    return initSelection;
  });
  const updateNode: UpdateAction = (code, fn) => {
    const currentNode = nodeDictionary[code];
    const nextNode = fn(currentNode);
    setNodeDictionary({ ...nodeDictionary, [code]: nextNode });
  };
  const [loadedCodes, setLoadedCodes] = React.useState<Set<string>>(new Set());
  const loadMoreData = async (parentCode: string, type: EntityType) => {
    const loader = loaders[type];
    if (loadedCodes.has(parentCode)) {
      return;
    }
    await asyncWrapper(async () => {
      const codeNumber = getActualCode(parentCode);
      if (codeNumber == null || loader == null) return;
      const loadedEntities = await loader(codeNumber);
      const lowerType = getLowerEntityType(type);
      if (lowerType == null) return;
      const appendedDictionary = toDictionary(loadedEntities, lowerType, parentCode);
      setNodeDictionary((current) => ({
        ...current,
        ...appendedDictionary
      }));
      setLoadedCodes((loadedCodes) => {
        const next = new Set(loadedCodes);
        next.add(parentCode);
        return next;
      });
    });
  };

  const changeCheckbox = (code: string | undefined, checked: boolean) => {
    const decendants = getDecendantCodes(nodeDictionary, code);
    const ancestors = getAncestorCodes(code);
    const decendantDictionary = {};
    if (code) {
      decendantDictionary[code] = checked;
    }
    const ancestorDictionary = {};
    for (const d of decendants) {
      decendantDictionary[d] = checked;
    }

    for (const ancestor of ancestors) {
      ancestorDictionary[ancestor] = checked;
    }

    setNodeSelection((current) => {
      const nextCurrent = { ...current, ...decendantDictionary };
      return nextCurrent;
    });
  };

  const isChecked = React.useCallback(
    (code: string) => {
      return isNodeChecked(nodeSelection, code);
    },
    [nodeSelection]
  );
  return (
    <ProductClassificationContext.Provider
      value={{
        updateNode,
        nodes: nodeDictionary,
        nodeSelection,
        getNodes,
        loadMoreData,
        changeCheckbox,
        isChecked
      }}
    >
      {children}
    </ProductClassificationContext.Provider>
  );
};

export default Provider;
export const useProductClassificationContext = () => {
  return React.useContext(ProductClassificationContext);
};
