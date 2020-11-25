import React, { forwardRef, useState } from "react";
import { Form } from "antd";
import Field from "./CustomField/Field";

const VariantDetails = forwardRef(({}, ref) => {
  const [fields, setFields] = useState([]);
  return (
    <div>
      <Field />
    </div>
  );
});

export default VariantDetails;
