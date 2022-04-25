import React from "react";
import { Formik, Form, FormikProps } from "formik";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import SegmentSelect from "../segment-select";
import FormModal, { BaseFormModalProps } from "../form-modal";
import FamilySelect from "../family-select";
import { RenderField } from "@/components/commons/fields";
import { newClassValidation } from "./validation-schema";
interface FormValue {
  code: string;
  title: string;
  familyCode: string;
  segmentCode: string;
}
interface Props extends BaseFormModalProps {
  onSubmit: (value: FormValue) => void;
}
const NewClassModal = ({ open, onClose, onSubmit, isLoading }: Props) => {
  const ref = React.useRef<FormikProps<FormValue>>(null);
  const triggerSubmit = () => {
    ref.current?.submitForm();
  };
  return (
    <FormModal
      open={open}
      onClose={onClose}
      title="New Family"
      onSave={triggerSubmit}
      isLoading={isLoading}
    >
      <Formik
        innerRef={ref}
        initialValues={{
          code: "",
          title: "",
          familyCode: "",
          segmentCode: ""
        }}
        onSubmit={onSubmit}
        validationSchema={newClassValidation}
      >
        <Form>
          <Stack spacing={3}>
            <TextField
              name="code"
              label="Class Code"
              placeholder="Ex: 66010300 or  Mobile Communication"
            />
            <TextField
              name="title"
              label="Class Name"
              placeholder="Ex: Mobile Communication Devices/Services "
            />
            <SegmentSelect
              name="segmentCode"
              label="Parent Segment"
              placeholder="Ex: Communications"
            />
            <RenderField>
              {({ getFieldValue }) => {
                const segmentCode = getFieldValue("segmentCode");
                return (
                  <FamilySelect
                    segmentCode={segmentCode}
                    name="familyCode"
                    label="Parent Family"
                    placeholder="Ex: Communications"
                  />
                );
              }}
            </RenderField>
          </Stack>
        </Form>
      </Formik>
    </FormModal>
  );
};

export default NewClassModal;
