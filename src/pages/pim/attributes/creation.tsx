import { Form, Formik } from "formik";
import {
  getAttributeEditionPath,
  pimRoutePaths
} from "@/commons/consts/system/routes/pim-route-paths.const";

import AttributesCreation from "./attribute-creation";
import { Button } from "@mui/material";
import PageContentLayout from "../page-layout";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import { useCreateProductAttribute } from "@/entities/product/libs/use-update-entity";

const Attributes = () => {
  const history = useHistory();
  const { mutate, isLoading } = useCreateProductAttribute();

  const submit = ({ code, title }) => {
    mutate(
      { code, title },
      {
        onSuccess: async () => {
          history.push(getAttributeEditionPath(code));
        }
      }
    );
  };

  const initialValues = { code: "", title: "" };

  return (
    <Formik initialValues={{ ...initialValues, type: "dropdown" }} onSubmit={submit}>
      <Form name="properties-form">
        <PageContentLayout
          title="Create Attribute"
          parentPage={pimRoutePaths.PRODUCT_ATTRIBUTES}
          actions={
            <Button type="submit" variant="contained">
              Save
            </Button>
          }
        >
          <Typography mb={3} variant="body2">
            General Properties
          </Typography>
          <AttributesCreation isLoading={isLoading} />
        </PageContentLayout>
      </Form>
    </Formik>
  );
};

export default Attributes;
