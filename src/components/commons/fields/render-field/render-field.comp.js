import get from "lodash/get";
import { useFormikContext } from "formik";

export const RenderField = ({ children }) => {
  const formikProps = useFormikContext();
  const getFieldValue = (name) => get(formikProps.values, name);
  return children({ ...formikProps, getFieldValue });
};
