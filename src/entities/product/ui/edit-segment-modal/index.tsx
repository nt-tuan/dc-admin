import React from "react";
import { TextField } from "@/components/commons/fields";
import { Form, Formik, FormikProps } from "formik";
import { useUpdateSegmentTitle } from "../../libs/use-update-entity";
import FormModal, { BaseFormModalProps } from "../form-modal";
import { Segment } from "@/services/pim.service";

interface Props extends BaseFormModalProps {
  code: string;
  title: string;
  onSuccess?: (segment?: Segment) => Promise<void>;
}
interface FormValue {
  title?: string;
}
const EditSegmentModal = ({ code, title, open, onClose, onSuccess }: Props) => {
  const ref = React.useRef<FormikProps<FormValue>>(null);
  const { mutate, isLoading } = useUpdateSegmentTitle(code);
  const triggerSubmit = () => {
    if (ref.current == null) return;
    ref.current.submitForm();
  };
  const submit = (values: FormValue) => {
    if (values.title)
      mutate(values.title, {
        onSuccess: async (segment?: Segment) => {
          if (onSuccess) {
            await onSuccess(segment);
          }
          onClose();
        }
      });
  };
  return (
    <FormModal
      open={open}
      onClose={onClose}
      title={`Edit ${title}`}
      onSave={triggerSubmit}
      isLoading={isLoading}
    >
      <Formik innerRef={ref} initialValues={{ title }} onSubmit={submit}>
        <Form>
          <TextField
            fullWidth
            required
            name="title"
            label="Segment Name"
            placeholder="Camping"
            fieldConfig={{}}
          />
        </Form>
      </Formik>
    </FormModal>
  );
};
export default EditSegmentModal;
