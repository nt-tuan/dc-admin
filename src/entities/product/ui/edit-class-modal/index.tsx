import { Loader } from "@/components/commons";
import { TextField } from "@/components/commons/fields";
import { Form, Formik } from "formik";
import { getActualCode } from "../../libs/tree-node";
import { useGetFamilies } from "../../libs/use-get-families";
import FamilySelect from "../family-select";
import FormModal, { BaseFormModalProps } from "../form-modal";

interface Props extends BaseFormModalProps {
  code: string;
  title: string;
  segmentCode: string;
}

const EditClassModal = ({ code, segmentCode, title, open, onClose }: Props) => {
  const { data, isLoading } = useGetFamilies();
  const submit = () => {};
  return (
    <FormModal open={open} onClose={onClose} title={`Edit ${title}`} onSave={submit}>
      {data == null || isLoading ? (
        <Loader />
      ) : (
        <Formik initialValues={{ name: title }} onSubmit={submit}>
          <Form>
            <TextField required name="title" label="Family Name" fieldConfig={{}} />
            <FamilySelect
              segmentCode={getActualCode(segmentCode)}
              name="parentSegment"
              label="Parent Segment"
              placeholder="Select Parent Segment"
            />
          </Form>
        </Formik>
      )}
    </FormModal>
  );
};
export default EditClassModal;
