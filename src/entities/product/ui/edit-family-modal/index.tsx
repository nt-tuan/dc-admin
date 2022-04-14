import { TextField } from "@/components/commons/fields";

import { Form, Formik } from "formik";
import FormModal, { BaseFormModalProps } from "../form-modal";
import SegmentSelect from "../segment-select";

interface Props extends BaseFormModalProps {
  code: string;
  title: string;
}
const EditFamilyModal = ({ code, title, open, onClose }: Props) => {
  const submit = () => {};
  return (
    <FormModal open={open} onClose={onClose} title={`Edit ${title}`} onSave={submit}>
      <Formik initialValues={{ name: title }} onSubmit={submit}>
        <Form>
          <TextField required name="title" label="Family Name" fieldConfig={{}} />
          <SegmentSelect
            name="parentSegment"
            label="Parent Segment"
            placeholder="Select Parent Segment"
          />
        </Form>
      </Formik>
    </FormModal>
  );
};
export default EditFamilyModal;
