import FamilyForm from "../family-form";
import FormModal, { BaseFormModalProps } from "../form-modal";

const NewFamilyFormModal = ({ open, onClose }: BaseFormModalProps) => {
  const submit = () => {};
  return (
    <FormModal open={open} onClose={onClose} title="New Family" onSave={submit}>
      <FamilyForm initialValues={{}} onSubmit={submit} />
    </FormModal>
  );
};

export default NewFamilyFormModal;
