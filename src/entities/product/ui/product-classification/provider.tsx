/* eslint-disable */
import React from "react";

import { Segment, ProductFamily, ProductClass, ProductBrick } from "@/services/pim.service";
import { useAsyncErrorHandler } from "@/utils/error-handler.util";
import { Dictionary, EntityType, ProductEntity, TreeNodeValue } from "../../model/types";
import {
  getActualCode,
  getAncestorCodes,
  getDecendantCodes,
  getNodesByCode,
  isNodeChecked,
  toDictionary,
  toTreeNodeDictionary
} from "../../libs/tree-node";

type UpdateAction = (code: string, fn: (node: TreeNodeValue) => TreeNodeValue) => void;
interface IProductClassificationContext {
  nodes: Dictionary<TreeNodeValue>;
  setNodes: React.Dispatch<React.SetStateAction<Dictionary<TreeNodeValue>>>;
  nodeSelection: Dictionary<boolean>;
  setNodeSelection: React.Dispatch<React.SetStateAction<Dictionary<boolean>>>;
  getNodes: (code?: string) => TreeNodeValue[];
  loadMoreData: (parentCode: string, type: EntityType) => Promise<void>;
  changeCheckbox: (code: string | undefined, checked: boolean) => void;
  isChecked: (code: string) => boolean;
  updateNode: UpdateAction;
}
const ProductClassificationContext = React.createContext<IProductClassificationContext>({} as any);

type LoaderFunction = (parentCode?: string) => Promise<ProductEntity[]>;
interface Props {
  segments: Segment[];
  defaulSelection?: Dictionary<boolean>;
  loaders: {
    [key in EntityType]?: LoaderFunction;
  };
  selectionLoaders?: {
    [key in EntityType]?: LoaderFunction;
  };
  autoSelectParent?: boolean;
}

const Provider = ({
  children,
  segments,
  loaders,
  selectionLoaders,
  defaulSelection,
  autoSelectParent
}: React.PropsWithChildren<Props>) => {
  const asyncWrapper = useAsyncErrorHandler();
  const [nodeDictionary, setNodeDictionary] = React.useState(() => toTreeNodeDictionary(segments));
  const getNodes = (code?: string) => {
    return getNodesByCode(nodeDictionary, code);
  };
  const [nodeSelection, setNodeSelection] = React.useState<Dictionary<boolean>>(() => {
    const initSelection = {};
    const codes = Object.keys(nodeDictionary);
    for (const code of codes) {
      initSelection[code] = false;
    }
    return { ...initSelection, ...defaulSelection };
  });

  const findNodeByActualCode = (code: string) => {
    const foundEntry = Object.entries(nodeDictionary).find(
      ([key]) => key === code || key.endsWith(`.${code}`)
    );
    if (foundEntry == null) return undefined;
    return foundEntry[1];
  };
  const updateNode: UpdateAction = (code, fn) => {
    const currentNode = findNodeByActualCode(code);
    if (currentNode == null) return;
    const nextNode = fn(currentNode);
    const nextDictionary = { ...nodeDictionary };
    delete nextDictionary[code];
    const nextNodeParentLocalCode = nextNode.parentCode
      ? findNodeByActualCode(nextNode.parentCode)
      : undefined;
    const nextNodeCode = nextNodeParentLocalCode
      ? `${nextNodeParentLocalCode}.${nextNode.actualCode}`
      : nextNode.actualCode;
    nextNode.code = nextNodeCode;
    if (nextNode) setNodeDictionary({ ...nodeDictionary, [nextNodeCode]: nextNode });
  };
  const [loadedCodes, setLoadedCodes] = React.useState<Set<string>>(new Set());
  const loadSelection = async (parentCode: string, type: EntityType) => {
    if (!nodeSelection[parentCode]) {
      return;
    }
    const codeNumber = getActualCode(parentCode);
    if (selectionLoaders == null || codeNumber == null) return;
    const selectionLoader = selectionLoaders[type];
    if (selectionLoader == null) return;
    const entities = await selectionLoader(codeNumber);
    const nextSelection = toDictionary(entities, type, parentCode, () => true);
    setNodeSelection((current) => ({
      ...current,
      ...nextSelection
    }));
  };
  const loadNode = async (parentCode: string, type: EntityType) => {
    const loader = loaders[type];
    const codeNumber = getActualCode(parentCode);
    if (codeNumber == null || loader == null) return;
    const loadedEntities = await loader(codeNumber);
    const appendedDictionary = toTreeNodeDictionary(loadedEntities, type, parentCode);
    setNodeDictionary((current) => ({
      ...current,
      ...appendedDictionary
    }));
    const parentChecked = isNodeChecked(nodeSelection, parentCode);
    const appenedSelection = toDictionary(loadedEntities, type, parentCode, () => parentChecked);
    setNodeSelection((current) => ({
      ...current,
      ...appenedSelection
    }));
  };

  const loadMoreData = async (parentCode: string, type: EntityType) => {
    if (loadedCodes.has(parentCode)) {
      return;
    }
    return await asyncWrapper(async () => {
      await loadNode(parentCode, type);
      await loadSelection(parentCode, type);
      setLoadedCodes((loadedCodes) => {
        const next = new Set(loadedCodes);
        next.add(parentCode);
        return next;
      });
    });
  };

  const changeCheckbox = (code: string | undefined, checked: boolean) => {
    const decendants = getDecendantCodes(nodeDictionary, code);

    const decendantDictionary = {};
    if (code) {
      decendantDictionary[code] = checked;
    }
    for (const d of decendants) {
      decendantDictionary[d] = checked;
    }

    const ancestorDictionary = {};
    if (autoSelectParent && checked) {
      const ancestors = getAncestorCodes(code);
      for (const ancestor of ancestors) {
        ancestorDictionary[ancestor] = checked;
      }
    }
    setNodeSelection((current) => {
      const nextCurrent = { ...current, ...decendantDictionary, ...ancestorDictionary };
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
        setNodes: setNodeDictionary,
        nodeSelection,
        setNodeSelection,
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
