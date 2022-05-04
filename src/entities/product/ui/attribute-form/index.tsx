import { Formik } from "formik";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { AttributeValue, ProductAttribute } from "@/services/pim.service";
import validationSchema from "./validation.schema";

export interface IAttributeFormContext {
  options: AttributeValue[];
  isMutating: boolean;
  newOptions: AttributeValue[];
  deletedCodes: string[];
  isManualSort: boolean;
  addOption: (code: string) => void;
  deleteOption: (code: string) => void;
  setOptions: React.Dispatch<React.SetStateAction<AttributeValue[]>>;
  changeManualSort: (value: boolean) => void;
  saveOptions: () => void;
  clearOptions: () => void;
}
export const AttributeFormContext = React.createContext<IAttributeFormContext>({} as never);

interface Props {
  attribute?: ProductAttribute;
  children?: React.ReactNode;
  isMutating?: boolean;
  onSubmit: (
    params: {
      attribute: ProductAttribute;
      newValues: AttributeValue[];
      deletedValues: string[];
    },
    options?: {
      onError: () => void;
    }
  ) => void;
}
export const AttributeFormProvider = ({ attribute, children, onSubmit, isMutating }: Props) => {
  const [isManualSort, setManualSort] = useState<boolean>(false);
  const [options, setOptions] = useState<AttributeValue[]>(attribute?.attributeValues ?? []);
  const [deletedCodes, setDeletedCodes] = useState<string[]>([]);
  const [newOptions, setNewOptions] = useState<AttributeValue[]>([]);
  const clearOptions = React.useCallback(() => {
    setOptions(attribute?.attributeValues ?? []);
    setDeletedCodes([]);
    setNewOptions([]);
  }, [attribute]);
  React.useEffect(() => {
    clearOptions();
  }, [clearOptions]);

  const submit = ({ code, title }) => {
    const attribute: ProductAttribute = {
      code,
      title
    };
    onSubmit({ attribute, deletedValues: deletedCodes, newValues: newOptions });
  };

  const saveOptions = () => {
    if (attribute == null) return;
    onSubmit(
      { attribute, deletedValues: deletedCodes, newValues: newOptions },
      {
        onError: clearOptions
      }
    );
  };

  const addOption = (title: string) => {
    if (attribute == null) return;
    const code = uuidv4();
    const newOption: AttributeValue = {
      code,
      title,
      attributeCode: attribute.code
    };
    setNewOptions((options) => [...options, newOption]);
    setOptions((options) => [...options, newOption]);
  };
  const deleteOption = (code: string) => {
    setOptions((options) => options.filter((current) => current.code !== code));
    setNewOptions((options) => options.filter((current) => current.code !== code));
    setDeletedCodes((codes) => [...codes, code]);
  };
  const initialValues = { code: attribute?.code ?? "", title: attribute?.title ?? "" };
  return (
    <AttributeFormContext.Provider
      value={{
        isMutating: Boolean(isMutating),
        isManualSort,
        changeManualSort: setManualSort,
        options,
        setOptions,
        deletedCodes: deletedCodes,
        newOptions,
        addOption,
        deleteOption,
        saveOptions,
        clearOptions
      }}
    >
      <Formik
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
