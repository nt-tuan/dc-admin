import { LABEL_BY_BANK_TYPE } from "./bank-type.enum";
import React from "react";
import { TextField } from "components/commons/fields";
import get from "lodash/get";
import { useFormikContext } from "formik";

export const SwiftCodeField = ({ name, bankIdTypeName }) => {
  const { values } = useFormikContext();
  const bankIdType = get(values, bankIdTypeName);
  const label =
    bankIdType in LABEL_BY_BANK_TYPE ? LABEL_BY_BANK_TYPE[bankIdType] : LABEL_BY_BANK_TYPE.SWIFT;

  return (
    <TextField name={name} label={label} fullWidth placeholder={`Recipient's Bank ${label}`} />
  );
};
