import { ProductBrick, ProductClass, ProductFamily, Segment } from "@/services/pim.service";
import { findNode, toTreeNodeDictionary } from "../../libs/tree-node";
import { useProductClassificationContext } from "../product-classification/provider";

const useCreateEntitySuccess = ({ onSuccess }: { onSuccess: () => void }) => {
  const { nodes, setNodes } = useProductClassificationContext();
  const onSegmentSuccess = async (segment: Segment) => {
    setNodes((current) => {
      const newNodes = toTreeNodeDictionary([segment], "Segment");
      return { ...current, ...newNodes };
    });
    onSuccess();
  };
  const onFamilySuccess = async (family: ProductFamily) => {
    setNodes((current) => {
      const newNodes = toTreeNodeDictionary([family], "Family", family.segmentCode);
      return { ...current, ...newNodes };
    });
    onSuccess();
  };
  const onClassSuccess = async (cl: ProductClass) => {
    const parentNode = findNode(nodes, cl.familyCode);
    const classNode = findNode(nodes, cl.code);
    setNodes((current) => {
      const nextNodes = { ...current };
      const newNodes =
        parentNode != null ? toTreeNodeDictionary([cl], "Class", parentNode.code) : {};
      if (classNode != null) {
        delete nextNodes[classNode.code];
      }
      return { ...nextNodes, ...newNodes };
    });
    onSuccess();
  };
  const onBrickSuccess = async (brick: ProductBrick) => {
    const parentNode = findNode(nodes, brick.classCode);
    onSuccess();
    if (parentNode == null) return;
    setNodes((current) => {
      const newNodes = toTreeNodeDictionary([brick], "Brick", parentNode.code);
      return { ...current, ...newNodes };
    });
  };
  return { onSegmentSuccess, onFamilySuccess, onClassSuccess, onBrickSuccess };
};
export default useCreateEntitySuccess;
