import React from "react";
import { TextField } from "@/components/commons/fields";
import { Form, Formik, FormikProps } from "formik";
import FormModal, { BaseFormModalProps } from "../form-modal";
import Stack from "@mui/material/Stack";

interface FormValue {
  title: string;
  code: string;
}
interface Props extends BaseFormModalProps {
  onSubmit: (value: FormValue) => void;
}

const NewSegmentModal = ({ open, onClose, onSubmit, isLoading }: Props) => {
  const ref = React.useRef<FormikProps<FormValue>>(null);
  const triggerSubmit = () => {
    if (ref.current == null) return;
    ref.current.submitForm();
  };
  return (
    <FormModal
      open={open}
      onClose={onClose}
      title="New Segment"
      onSave={triggerSubmit}
      isLoading={isLoading}
    >
      <Formik innerRef={ref} initialValues={{ title: "", code: "" }} onSubmit={onSubmit}>
        <Form>
          <Stack spacing={3}>
            <TextField
              fullWidth
              required
              name="code"
              label="Segment Code"
              placeholder="Camping"
              fieldConfig={{}}
            />
            <TextField
              fullWidth
              required
              name="title"
              label="Segment name"
              placeholder="Camping"
              fieldConfig={{}}
            />
          </Stack>
        </Form>
      </Formik>
    </FormModal>
  );
};
export default NewSegmentModal;
