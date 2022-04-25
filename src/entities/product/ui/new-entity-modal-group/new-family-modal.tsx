import React from "react";
import { Formik, Form, FormikProps } from "formik";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import SegmentSelect from "../segment-select";
import FormModal, { BaseFormModalProps } from "../form-modal";
import { newFamilyValidation } from "./validation-schema";
interface FormValue {
  code: string;
  title: string;
  segmentCode: string;
}
interface Props extends BaseFormModalProps {
  onSubmit: (value: FormValue) => void;
}
const NewFamilyModal = ({ open, onClose, onSubmit, isLoading }: Props) => {
  const ref = React.useRef<FormikProps<FormValue>>(null);
  const submit = () => {
    ref.current?.submitForm();
  };
  return (
    <FormModal
      open={open}
      onClose={onClose}
      title="New Family"
      onSave={submit}
      isLoading={isLoading}
    >
      <Formik
        innerRef={ref}
        initialValues={{
          code: "",
          title: "",
          segmentCode: ""
        }}
        onSubmit={onSubmit}
        validationSchema={newFamilyValidation}
      >
        <Form>
          <Stack spacing={3}>
            <TextField
              name="code"
              label="Family Code"
              placeholder="Ex: 66010000 or Communications"
            />
            <TextField
              name="title"
              label="Family Name"
              placeholder="Ex: Mobile Communication Devices/Services "
            />
            <SegmentSelect
              name="segmentCode"
              label="Parent Segment"
              placeholder="Ex: Communications"
            />
          </Stack>
        </Form>
      </Formik>
    </FormModal>
  );
};

export default NewFamilyModal;
