import { ProductBrick, ProductClass, ProductFamily, Segment } from "@/services/pim.service";
import { findNode, toTreeNodeDictionary } from "../../libs/tree-node";
import { useProductClassificationContext } from "../product-classification/provider";
const useUpdateEnittySuccess = ({ onSuccess }: { onSuccess: () => void }) => {
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
    onSuccess();
    if (parentNode == null) return;
    setNodes((current) => {
      const newNodes = toTreeNodeDictionary([cl], "Class", parentNode.code);
      return { ...current, ...newNodes };
    });
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

export default useUpdateEnittySuccess;
