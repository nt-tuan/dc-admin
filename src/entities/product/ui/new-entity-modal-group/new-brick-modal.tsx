import React from "react";
import { Formik, FormikProps } from "formik";
import BrickForm, { BrickFormValue } from "../brick-form";
import FormModal, { BaseFormModalProps } from "../form-modal";
import validationSchema from "../brick-form/validation-schema";

interface Props extends BaseFormModalProps {
  onSubmit: (value: BrickFormValue) => void;
}
const NewBrickModal = ({ open, onClose, onSubmit, isLoading }: Props) => {
  const ref = React.useRef<FormikProps<BrickFormValue>>(null);
  const triggerSubmit = () => {
    ref.current?.submitForm();
  };
  return (
    <FormModal
      open={open}
      onClose={onClose}
      title="New Brick"
      onSave={triggerSubmit}
      isLoading={isLoading}
    >
      <Formik
        innerRef={ref}
        initialValues={{
          code: "",
          title: "",
          segmentCode: "",
          familyCode: "",
          classCode: "",
          hsCode: ""
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <BrickForm gridColumns={6} />
      </Formik>
    </FormModal>
  );
};
export default NewBrickModal;
