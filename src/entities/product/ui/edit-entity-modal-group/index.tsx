import { TreeNodeValue } from "../../model/types";
import useCreateEntitySuccess from "../new-entity-modal-group/use-create-entity-sucess";
import EditClassModal from "./edit-class-modal";
import EditFamilyModal from "./edit-family-modal";
import EditSegmentModal from "./edit-segment-modal";

interface Props {
  node?: TreeNodeValue;
  onClose: () => void;
}
const EditEntityModalGroup = ({ node, onClose }: Props) => {
  const { onSegmentSuccess, onFamilySuccess, onClassSuccess } = useCreateEntitySuccess({
    onSuccess: onClose
  });
  if (node == null) return <></>;
  return (
    <>
      {node.type === "Segment" && (
        <EditSegmentModal
          open
          code={node.code}
          title={node.title}
          onClose={onClose}
          onSuccess={onSegmentSuccess}
        />
      )}
      {node.type === "Family" && (
        <EditFamilyModal
          open
          code={node.code}
          segmentCode={node.parentCode ?? ""}
          title={node.title}
          onClose={onClose}
          onSuccess={onFamilySuccess}
        />
      )}
      {node.type === "Class" && node.parentCode && (
        <EditClassModal
          open
          parentCode={node.parentCode}
          code={node.code}
          title={node.title}
          onClose={onClose}
          onSuccess={onClassSuccess}
        />
      )}
    </>
  );
};
export default EditEntityModalGroup;
