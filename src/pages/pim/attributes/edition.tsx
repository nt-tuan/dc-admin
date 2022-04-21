import { DTCTabs, useTabSearchParams } from "@/components/commons";

import { Button } from "@mui/material";
import { Formik } from "formik";
import OptionsForm from "./options-form";
import PageContentLayout from "../page-layout";
import PropertiesForm from "./properties-form";
import { pimRoutePaths } from "@/commons/consts/system/routes/pim-route-paths.const";

// import { useCreateAttribute } from "@/entities/product/libs/use-get-attributes";

const TAB_KEYS = {
  PROPERTIES: "PROPERTIES",
  OPTIONS: "OPTIONS"
};

const { PROPERTIES, OPTIONS } = TAB_KEYS;
const tabs = [
  {
    label: "Properties",
    key: PROPERTIES,
    component: <PropertiesForm />
  },
  {
    label: "Options",
    key: OPTIONS,
    component: <OptionsForm />
  }
];

const AttributeEdition = () => {
  // const { mutate, isLoading } = useCreateAttribute();

  const submit = (values) => {
    // mutate(values, {
    //   onSuccess: () => {
    //     // ref.current.resetForm();
    //     console.log("create successful");
    //   }
    // });
  };

  const [value, onChange] = useTabSearchParams(tabs);

  const initialValues = {};

  return (
    <Formik initialValues={{ ...initialValues, type: "dropdown" }} onSubmit={submit}>
      <PageContentLayout
        title="Input Registration"
        parentPage={pimRoutePaths.PRODUCT_ATTRIBUTES}
        actions={<Button variant="contained">Save</Button>}
      >
        <DTCTabs value={value} onChange={onChange} tabs={tabs} />
      </PageContentLayout>
    </Formik>
  );
};
export default AttributeEdition;
