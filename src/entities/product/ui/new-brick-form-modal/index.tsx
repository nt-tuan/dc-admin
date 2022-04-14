import BrickForm from "../brick-form";
import FormModal, { BaseFormModalProps } from "../form-modal";

const NewBrickFormModal = ({ open, onClose }: BaseFormModalProps) => {
  const submit = () => {};
  return (
    <FormModal open={open} onClose={onClose} title="New Brick" onSave={submit}>
      <BrickForm initialValues={{}} onSubmit={submit} />
    </FormModal>
  );
};
export default NewBrickFormModal;
