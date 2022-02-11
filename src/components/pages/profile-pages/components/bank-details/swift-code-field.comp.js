import React from "react";
import { TextField } from "components/commons/fields";
import get from "lodash/get";
import { useFormikContext } from "formik";

const LABEL_BY_BANK_TYPE = {
  CHIPS: "CHIPS UID",
  ACH: "ACH Company ID",
  SWIFT: "SWIFT Code"
};

export const SwiftCodeField = ({ name, bankIdTypeName }) => {
  const { values } = useFormikContext();
  const bankIdType = get(values, bankIdTypeName);
  const label =
    bankIdType in LABEL_BY_BANK_TYPE ? LABEL_BY_BANK_TYPE[bankIdType] : LABEL_BY_BANK_TYPE.SWIFT;

  return (
    <TextField name={name} label={label} fullWidth placeholder={`Recipient's Bank ${label}`} />
  );
};
