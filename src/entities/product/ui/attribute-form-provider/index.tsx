import { Formik, FormikProps } from "formik";
import React, { useState } from "react";

import { AttributeValue, ProductAttribute } from "@/services/pim.service";
import validationSchema from "./validation.schema";
import {
  useCreateAttributeValue,
  useDeleteAttributeValue,
  useUpdateAttributeValue
} from "../../libs/use-update-entity";

export interface IAttributeFormContext {
  options: AttributeValue[];
  isMutating: boolean;
  isManualSort: boolean;
  addOption: (option: { code: string; title: string }) => void;
  updateOption: (option: { code: string; title: string }) => void;
  deleteOption: (code: string) => void;
  changeManualSort: (value: boolean) => void;
  selectedOptionCode?: string;
  changeSelectedOptionCode: (code?: string) => void;
  ref: React.RefObject<FormikProps<FormValue>>;
}
export const AttributeFormContext = React.createContext<IAttributeFormContext>({} as never);

interface Props {
  attribute?: ProductAttribute;
  children?: React.ReactNode;
  isMutating?: boolean;
  onSubmit: (params: { attribute: ProductAttribute }) => void;
}

interface FormValue {
  code: string;
  title: string;
}
export const AttributeFormProvider = ({ attribute, children, onSubmit, isMutating }: Props) => {
  const [isManualSort, setManualSort] = useState<boolean>(false);
  const ref = React.useRef<FormikProps<FormValue>>(null);
  const options = attribute?.attributeValues ?? [];
  const [selectedOptionCode, setSelectedOptionCode] = React.useState<string>();
  const createValueMutation = useCreateAttributeValue();
  const updateValueMutation = useUpdateAttributeValue();
  const deleteValueMutation = useDeleteAttributeValue();

  const submit = ({ code, title }) => {
    const attribute: ProductAttribute = {
      code,
      title
    };
    onSubmit({ attribute });
  };

  const addOption = ({ code, title }: { code: string; title: string }) => {
    if (attribute == null) return;
    const newOption: AttributeValue = {
      code,
      title,
      attributeCode: attribute.code
    };
    createValueMutation.mutate(newOption);
  };
  const updateOption = (value: { code: string; title: string }) => {
    if (attribute == null) return;
    updateValueMutation.mutate({ ...value, attributeCode: attribute.code });
  };
  const deleteOption = (code: string) => {
    deleteValueMutation.mutate(code);
  };
  const initialValues = { code: attribute?.code ?? "", title: attribute?.title ?? "" };
  return (
    <AttributeFormContext.Provider
      value={{
        isMutating: Boolean(
          isMutating ||
            createValueMutation.isLoading ||
            deleteValueMutation.isLoading ||
            updateValueMutation.isLoading
        ),
        isManualSort,
        changeManualSort: setManualSort,
        options,
        addOption,
        updateOption,
        deleteOption,
        selectedOptionCode,
        changeSelectedOptionCode: setSelectedOptionCode,
        ref
      }}
    >
      <Formik
        innerRef={ref}
        enableReinitialize
        initialValues={{ ...initialValues, type: "dropdown" }}
        onSubmit={submit}
        validationSchema={validationSchema}
      >
        {children}
      </Formik>
    </AttributeFormContext.Provider>
  );
};
