import React from "react";
import { DTCTabs, useTabSearchParams } from "@/components/commons";
import BrickForm, { BrickFormValue } from "@/entities/product/ui/brick-form";
import { Formik, FormikProps } from "formik";
import AttributeSelect from "@/entities/product/ui/attribute-select";
import AttributeDropdown from "@/entities/product/ui/attribute-dropdown";
import { Box } from "@mui/material";
import { ProductAttribute, ProductBrick } from "@/services/pim.service";
import validationSchema from "../brick-form/validation-schema";

interface Props {
  brick?: ProductBrick;
  onSubmit: (brick: ProductBrick) => void;
}
interface IBrickFormTabsContext {
  triggerSubmit: () => void;
  submit: () => void;
  attributes: ProductAttribute[];
  deleteAttribute: (code: string) => void;
  addAttributes: (addedAttributes: ProductAttribute[]) => void;
  brick?: ProductBrick;
  ref: React.RefObject<FormikProps<BrickFormValue>>;
  hasChanged: () => boolean;
}
export const BrickFormTabsContext = React.createContext<IBrickFormTabsContext>(
  {} as IBrickFormTabsContext
);
export const BrickFormTabsProvider = ({
  brick,
  onSubmit,
  children
}: React.PropsWithChildren<Props>) => {
  const ref = React.useRef<FormikProps<BrickFormValue>>(null);
  const [attributes, setAttributes] = React.useState<ProductAttribute[]>(brick?.attributes ?? []);
  React.useEffect(() => {
    setAttributes(brick?.attributes ?? []);
  }, [brick]);
  const submit = () => {
    if (ref.current == null) return;
    const { values } = ref.current;
    onSubmit({
      code: values.code,
      title: values.title,
      classCode: values.classCode,
      attributes
    });
  };

  const triggerSubmit = () => {
    ref.current?.submitForm();
  };
  const deleteAttribute = (code: string) => {
    setAttributes((current) => current.filter((item) => item.code !== code));
  };
  const addAttributes = (addedAttributes: ProductAttribute[]) => {
    setAttributes((current) => {
      const uniqueAttributes = addedAttributes.filter((addedAttribute) =>
        current.every((att) => att.code !== addedAttribute.code)
      );
      return [...uniqueAttributes, ...current];
    });
  };
  const hasChanged = () => {
    if (ref.current == null) return false;
    const { initialValues, values } = ref.current;
    const isValueChanged =
      initialValues.code !== values.code ||
      initialValues.title !== values.title ||
      initialValues.classCode !== values.classCode;
    console.log(initialValues, values);
    if (isValueChanged) return true;
    const initialAttributeCodes = (brick?.attributes ?? [])
      .map((att) => att.code)
      .sort()
      .join();
    const attributeCodes = attributes
      .map((att) => att.code)
      .sort()
      .join();
    return initialAttributeCodes !== attributeCodes;
  };
  return (
    <BrickFormTabsContext.Provider
      value={{
        submit,
        triggerSubmit,
        deleteAttribute,
        addAttributes,
        ref,
        attributes,
        brick,
        hasChanged
      }}
    >
      {children}
    </BrickFormTabsContext.Provider>
  );
};

interface ConsumerProps {
  classCode: string;
  familyCode: string;
  segmentCode: string;
}
export const BrickFormTabsConsumer = ({ classCode, familyCode, segmentCode }: ConsumerProps) => {
  const { ref, attributes, deleteAttribute, addAttributes, submit, brick } = React.useContext(
    BrickFormTabsContext
  );

  const tabs = [
    {
      label: "Properties",
      key: "Properties",
      component: (
        <Box maxWidth={864}>
          <BrickForm ref={ref} />
        </Box>
      )
    },
    {
      label: "Attributes",
      key: "Attributes",
      component: <AttributeSelect attributes={attributes} onDelete={deleteAttribute} />
    }
  ];
  const [value, onChange] = useTabSearchParams(tabs);
  return (
    <Formik
      innerRef={ref}
      initialValues={{
        code: brick?.code ?? "",
        title: brick?.title ?? "",
        segmentCode,
        familyCode,
        classCode,
        hsCode: ""
      }}
      onSubmit={submit}
      validationSchema={validationSchema}
    >
      <DTCTabs
        tabs={tabs}
        value={value}
        onChange={onChange}
        actions={value === "Attributes" ? <AttributeDropdown onAdd={addAttributes} /> : null}
      />
    </Formik>
  );
};
