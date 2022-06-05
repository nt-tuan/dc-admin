import { DTCTabs, useTabSearchParams } from "@/components/commons";
import { Form } from "formik";
import { useParams } from "react-router-dom";
import React from "react";

import { ProductAttribute } from "@/services/pim.service";
import Button from "@mui/lab/LoadingButton";
import AttributeValueForm from "@/entities/product/ui/attribute-value-form";
import PageContentLayout from "../page-layout";
import Typography from "@mui/material/Typography";
import { pimRoutePaths } from "@/commons/consts/system/routes/pim-route-paths.const";
import { useUpdateProductAttribute } from "@/entities/product/libs/use-update-entity";
import { useGetProductAttribute } from "@/entities/product/libs/use-get-entity";
import {
  AttributeFormContext,
  AttributeFormProvider
} from "@/entities/product/ui/attribute-form-provider";
import AttributeForm from "@/entities/product/ui/attribute-form";

const TAB_KEYS = {
  PROPERTIES: "PROPERTIES",
  OPTIONS: "OPTIONS"
};

const { PROPERTIES, OPTIONS } = TAB_KEYS;

type QuizParams = {
  code: string;
};

const Content = ({ attribute }: { attribute: ProductAttribute }) => {
  const { isMutating, ref } = React.useContext(AttributeFormContext);
  const tabs = React.useMemo(
    () => [
      {
        label: "Properties",
        key: PROPERTIES,
        component: <AttributeForm disabledFields={{ code: true }} />
      },
      {
        label: "Options",
        key: OPTIONS,
        component: <AttributeValueForm />
      }
    ],
    []
  );
  const [value, onChange] = useTabSearchParams(tabs);

  const handleSubmit = async () => {
    if (ref.current == null) return;
    await ref.current.validateForm();
    if (!ref.current.isValid) {
      onChange(PROPERTIES);
      return;
    }
    ref.current.submitForm();
  };

  return (
    <Form name="properties-form" noValidate>
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
          <Button loading={isMutating} onClick={handleSubmit} variant="contained">
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
    <AttributeFormProvider attribute={{ ...data }} onSubmit={mutate} isMutating={isLoading}>
      <Content attribute={data} />
    </AttributeFormProvider>
  );
};
export default AttributeEdition;
