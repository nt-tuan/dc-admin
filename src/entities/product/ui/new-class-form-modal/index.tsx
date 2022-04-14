import ClassForm from "../class-form";
import FormModal, { BaseFormModalProps } from "../form-modal";

const NewClassFormModal = ({ open, onClose }: BaseFormModalProps) => {
  const submit = () => {};
  return (
    <FormModal open={open} onClose={onClose} title="New Class" onSave={submit}>
      <ClassForm initialValues={{}} onSubmit={submit} />
    </FormModal>
  );
};
export default NewClassFormModal;
