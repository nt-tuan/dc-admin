import { Form, Formik, FormikProps } from "formik";
import FormModal, { BaseFormModalProps } from "../form-modal";

import FamilySelect from "../family-select";
import React from "react";
import Stack from "@mui/material/Stack";
import { TextField } from "@/components/commons/fields";
import { extractLocalCode } from "../../libs/tree-node";
import { useUpdateClassTitle } from "../../libs/use-update-entity";
import { classSchema } from "./validation.chema";
import { ProductClass } from "@/services/pim.service";

interface Props extends BaseFormModalProps {
  code: string;
  title: string;
  parentCode: string | undefined;
  onSuccess: (productClass?: ProductClass) => Promise<void>;
}

interface FormValue {
  title: string;
  familyCode: string;
}
const EditClassModal = ({ code, parentCode, title, open, onClose, onSuccess }: Props) => {
  const { mutate, isLoading } = useUpdateClassTitle(code);
  const ref = React.useRef<FormikProps<FormValue>>(null);
  const { familyCode } = extractLocalCode(parentCode);
  const triggerSubmit = () => {
    ref.current?.submitForm();
  };
  const submit = (value: FormValue) => {
    mutate(value, {
      onSuccess: async (productClass) => {
        await onSuccess(productClass);
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
      <Formik
        innerRef={ref}
        initialValues={{ title, familyCode }}
        onSubmit={submit}
        validationSchema={classSchema}
      >
        <Form>
          <Stack spacing={3}>
            <TextField required name="title" label="Class Name" fieldConfig={{}} />
            <FamilySelect
              name="familyCode"
              label="Parent Family"
              placeholder="Select Parent Family"
            />
          </Stack>
        </Form>
      </Formik>
    </FormModal>
  );
};
export default EditClassModal;
