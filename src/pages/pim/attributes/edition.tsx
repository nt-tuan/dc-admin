import { DTCTabs, useTabSearchParams } from "@/components/commons";
import { Form } from "formik";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

import { ProductAttribute } from "@/services/pim.service";
import Button from "@mui/material/Button";
import OptionsForm from "./options-form";
import PageContentLayout from "../page-layout";
import PropertiesForm from "./properties-form";
import Typography from "@mui/material/Typography";
import { pimRoutePaths } from "@/commons/consts/system/routes/pim-route-paths.const";
import { useUpdateProductAttribute } from "@/entities/product/libs/use-update-entity";
import { useGetProductAttribute } from "@/entities/product/libs/use-get-entity";
import { AttributeFormProvider } from "@/entities/product/ui/attribute-form";

const TAB_KEYS = {
  PROPERTIES: "PROPERTIES",
  OPTIONS: "OPTIONS"
};

const { PROPERTIES, OPTIONS } = TAB_KEYS;

type QuizParams = {
  code: string;
};

const Content = ({ attribute }: { attribute: ProductAttribute }) => {
  const tabs = useMemo(
    () => [
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
    ],
    []
  );
  const [value, onChange] = useTabSearchParams(tabs);

  return (
    <Form name="properties-form">
      <PageContentLayout
        title={
          <Typography component="div" variant="h5">
            Input Registration
            <Typography component="span" variant="subtitle1" ml={1} color="rgba(0, 0, 0, 0.38)">
              (Code {attribute.code})
            </Typography>
          </Typography>
        }
        parentPage={pimRoutePaths.PRODUCT_ATTRIBUTES}
        actions={
          <Button type="submit" variant="contained">
            Save
          </Button>
        }
      >
        <DTCTabs value={value} onChange={onChange} tabs={tabs} />
      </PageContentLayout>
    </Form>
  );
};

const AttributeEdition = () => {
  const { code } = useParams<QuizParams>();
  const { data, isLoading: getAttributeLoading } = useGetProductAttribute(code);
  const { mutate, isLoading } = useUpdateProductAttribute();
  if (getAttributeLoading || data == null)
    return (
      <PageContentLayout
        loading
        title="Input Registration"
        parentPage={pimRoutePaths.PRODUCT_ATTRIBUTES}
      />
    );

  return (
    <AttributeFormProvider attribute={data} onSubmit={mutate} isMutating={isLoading}>
      <Content attribute={data} />
    </AttributeFormProvider>
  );
};
export default AttributeEdition;
