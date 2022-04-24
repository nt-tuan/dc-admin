import { DTCTabs, Loader, useTabSearchParams } from "@/components/commons";
import { Form, Formik } from "formik";
import { useGetAttribute, useUpdateAttribute } from "@/entities/product/libs/use-get-attributes";
import { useHistory, useParams } from "react-router-dom";
import { useMemo, useState } from "react";

import { AttributeValue } from "@/services/pim.service";
import Button from "@mui/material/Button";
import OptionsForm from "./options-form";
import PageContentLayout from "../page-layout";
import PropertiesForm from "./properties-form";
import Typography from "@mui/material/Typography";
import { pimRoutePaths } from "@/commons/consts/system/routes/pim-route-paths.const";
import { useMessage } from "@/hooks/use-message";

const TAB_KEYS = {
  PROPERTIES: "PROPERTIES",
  OPTIONS: "OPTIONS"
};

const { PROPERTIES, OPTIONS } = TAB_KEYS;

type QuizParams = {
  code: string;
};

const AttributeEdition = () => {
  const message = useMessage();
  const history = useHistory();
  const { code } = useParams<QuizParams>();

  const { data: attributeData, isLoading: getAttributeLoading } = useGetAttribute(code);

  const [isManualSort, setManualSort] = useState<boolean>(false);
  const [options, setOptions] = useState<AttributeValue[]>([]);

  const { mutate, isLoading } = useUpdateAttribute();

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
        component: (
          <OptionsForm
            isManualSort={isManualSort}
            setManualSort={() => setManualSort((s) => !s)}
            options={options}
            onChange={setOptions}
          />
        )
      }
    ],
    [options, isManualSort]
  );

  const validation = (code: string, title: string) => {
    if (!code || !title) {
      return false;
    }
    if (options.length === 0) {
      message.error("You have not created any options for this attribute");
      return false;
    }

    return true;
  };

  const submit = ({ code, title }) => {
    if (validation(code, title))
      mutate(
        { code, title, attributeValue: options },
        {
          onSuccess: async () => {
            history.push(pimRoutePaths.PRODUCT_ATTRIBUTES);
          }
        }
      );
  };

  const [value, onChange] = useTabSearchParams(tabs);

  const initialValues = { code: attributeData?.code || "", title: attributeData?.title || "" };

  return (
    <Formik
      enableReinitialize
      initialValues={{ ...initialValues, type: "dropdown" }}
      onSubmit={submit}
    >
      <Form name="properties-form">
        <PageContentLayout
          title={
            <Typography variant="h5">
              Input Registration
              <Typography component="span" variant="subtitle1" ml={2} color="rgba(0, 0, 0, 0.38)">
                (Code {code})
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

          {(getAttributeLoading || isLoading) && <Loader />}
        </PageContentLayout>
      </Form>
    </Formik>
  );
};
export default AttributeEdition;
