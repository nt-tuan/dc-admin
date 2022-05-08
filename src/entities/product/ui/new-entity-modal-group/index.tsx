import {
  useCreateProductBrick,
  useCreateProductClass,
  useCreateProductFamily,
  useCreateSegment
} from "../../libs/use-create-entity";
import { EntityType } from "../../model/types";
import NewBrickModal from "./new-brick-modal";
import NewClassModal from "./new-class-modal";
import NewFamilyModal from "./new-family-modal";
import NewSegmentModal from "./new-segment-modal";
import useCreateEntitySuccess from "./use-create-entity-sucess";

interface Props {
  type?: EntityType;
  onClose: () => void;
}
const NewEntityModalGroup = ({ type, onClose }: Props) => {
  const {
    onSegmentSuccess,
    onFamilySuccess,
    onClassSuccess,
    onBrickSuccess
  } = useCreateEntitySuccess({ onSuccess: onClose });
  const segmentMutation = useCreateSegment();
  const familyMutation = useCreateProductFamily({ onSuccess: onFamilySuccess });
  const classMutation = useCreateProductClass({ onSuccess: onClassSuccess });
  const brickMutation = useCreateProductBrick({ onSuccess: onBrickSuccess });
  if (type == null) return null;
  return (
    <>
      {type === "Segment" && (
        <NewSegmentModal
          open
          onClose={onClose}
          onSubmit={(value) => segmentMutation.mutate(value, { onSuccess: onSegmentSuccess })}
          isLoading={segmentMutation.isLoading}
        />
      )}
      {type === "Family" && (
        <NewFamilyModal
          open
          onClose={onClose}
          onSubmit={familyMutation.mutate}
          isLoading={familyMutation.isLoading}
        />
      )}
      {type === "Class" && (
        <NewClassModal
          open
          onClose={onClose}
          onSubmit={classMutation.mutate}
          isLoading={classMutation.isLoading}
        />
      )}
      {type === "Brick" && (
        <NewBrickModal
          open
          onClose={onClose}
          onSubmit={({ title, code, hsCode, classCode }) =>
            brickMutation.mutate({ title, code, hsCode, classCode, attributeCodes: [] })
          }
          isLoading={brickMutation.isLoading}
        />
      )}
    </>
  );
};
export default NewEntityModalGroup;
