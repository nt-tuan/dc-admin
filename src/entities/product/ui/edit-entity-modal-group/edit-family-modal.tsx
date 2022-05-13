import React from "react";
import { TextField } from "@/components/commons/fields";
import Stack from "@mui/material/Stack";

import { Form, Formik, FormikProps } from "formik";
import { getActualCode } from "../../libs/tree-node";
import FormModal, { BaseFormModalProps } from "../form-modal";
import SegmentSelect from "../segment-select";
import { useUpdateFamilyTitle } from "../../libs/use-update-entity";
import { familySchema } from "./validation.chema";
import { ProductFamily } from "@/services/pim.service";

interface Props extends BaseFormModalProps {
  code: string;
  title: string;
  segmentCode: string;
  onSuccess: (family: ProductFamily) => Promise<void>;
}
interface FormValue {
  title: string;
  segmentCode: string;
}
const EditFamilyModal = ({ code, segmentCode, title, open, onClose, onSuccess }: Props) => {
  const { mutate, isLoading } = useUpdateFamilyTitle(code);
  const ref = React.useRef<FormikProps<FormValue>>(null);
  const triggerSubmit = () => {
    ref.current?.submitForm();
  };
  const submit = async (value: FormValue) => {
    const actualCode = getActualCode(code);
    if (actualCode == null) return;
    mutate(value, {
      onSuccess: async (family) => {
        onClose();
        if (family) {
          await onSuccess(family);
        }
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
        initialValues={{ title, segmentCode: getActualCode(segmentCode) ?? 0 }}
        onSubmit={submit}
        validationSchema={familySchema}
      >
        <Form>
          <Stack spacing={3}>
            <TextField required name="title" label="Family Name" fieldConfig={{}} />
            <SegmentSelect
              required
              name="segmentCode"
              label="Parent Segment"
              placeholder="Select Parent Segment"
            />
          </Stack>
        </Form>
      </Formik>
    </FormModal>
  );
};
export default EditFamilyModal;
