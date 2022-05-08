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
  classCode: string;
  familyCode: string;
  segmentCode: string;
  isLoading?: boolean;
}
interface IBrickFormTabsContext {
  triggerSubmit: () => void;
  submit: () => void;
  attributes: ProductAttribute[];
  deleteAttribute: (code: string) => void;
  addAttributes: (addedAttributes: ProductAttribute[]) => void;
  brick?: ProductBrick;
  ref: React.RefObject<FormikProps<BrickFormValue>>;
  hasAttributesChanged: () => boolean;
}
export const BrickFormTabsContext = React.createContext<IBrickFormTabsContext>(
  {} as IBrickFormTabsContext
);
export const BrickFormTabsProvider = ({
  brick,
  onSubmit,
  children,
  classCode,
  familyCode,
  segmentCode,
  isLoading
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
      hsCode: values.hsCode,
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
  const hasAttributesChanged = () => {
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
        hasAttributesChanged
      }}
    >
      {!isLoading ? (
        <Formik
          innerRef={ref}
          initialValues={{
            code: brick?.code ?? "",
            title: brick?.title ?? "",
            segmentCode,
            familyCode,
            classCode,
            hsCode: brick?.hsCode ?? ""
          }}
          onSubmit={submit}
          validationSchema={validationSchema}
        >
          <div>{children}</div>
        </Formik>
      ) : (
        children
      )}
    </BrickFormTabsContext.Provider>
  );
};

export const BrickFormTabsConsumer = () => {
  const { ref, attributes, deleteAttribute, addAttributes } = React.useContext(
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
    <DTCTabs
      tabs={tabs}
      value={value}
      onChange={onChange}
      actions={
        value === "Attributes" ? (
          <AttributeDropdown initialAttributes={attributes} onAdd={addAttributes} />
        ) : null
      }
    />
  );
};
