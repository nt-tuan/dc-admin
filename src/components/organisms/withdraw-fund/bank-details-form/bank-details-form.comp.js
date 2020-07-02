import React, { Fragment } from "react";
import { Form, Input } from "antd";
import { KYC3_SCHEMA } from "commons/schemas";
import { useForm } from "antd/lib/form/util";

const FIELDS = KYC3_SCHEMA.BANK_DETAILS;
const LABELS = KYC3_SCHEMA.KYC3_LABEL;

export const BankDetailsForm = ({ initialValues, schema, index }) => {
  const [form] = useForm();

  const _schema = schema ? schema : SCHEMA;

  const renderTitle = (index) => {
    switch (index) {
      case 0:
        return "Primary Bank Account";
      case 1:
        return "Secondary Bank Account";
      default:
        return null;
    }
  };

  return (
    <Fragment>
      <h5 className="text-primary">{renderTitle(index)}</h5>
      <Form form={form} layout="vertical" hideRequiredMark className="no-gutters">
        {_schema.map(({ name, className, label, placeholder, options }) => (
          <Form.Item
            key={name}
            label={label}
            className={className}
            initialValue={initialValues[name]}
            name={name}
          >
            <Input size="large" placeholder={placeholder} />
          </Form.Item>
        ))}
      </Form>
    </Fragment>
  );
};

const SCHEMA = [
  {
    name: FIELDS.accountHolder,
    label: LABELS[FIELDS.accountHolder],
    placeholder: "Account Holder",
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {}
  },
  {
    name: FIELDS.bankName,
    label: LABELS[FIELDS.bankName],
    placeholder: "Bank Name",
    className: "d-lg-inline-block col-lg-6",
    options: {}
  },
  {
    name: FIELDS.accountNumber,
    label: "Account Number",
    placeholder: "Account Number",
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {}
  },
  {
    name: FIELDS.iban,
    label: "IBAN (What is IBAN?)",
    placeholder: "IBAN",
    className: "d-lg-inline-block col-lg-6",
    options: {}
  },
  {
    name: FIELDS.nationality,
    label: LABELS[FIELDS.nationality],
    placeholder: LABELS[FIELDS.nationality],
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {}
  },
  {
    name: FIELDS.swiftCode,
    label: LABELS[FIELDS.swiftCode],
    placeholder: LABELS[FIELDS.swiftCode],
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {}
  }
];
