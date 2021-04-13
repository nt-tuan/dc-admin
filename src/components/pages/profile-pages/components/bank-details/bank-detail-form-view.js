import React from "react";
import { createFormErrorComp } from "utils";
import { Form, Input, Select, Tooltip } from "antd";
import { REQUIRED_ERR } from "commons/consts";
import countryList from "assets/country.json";
import currencyList from "assets/currency.json";
import { KYC3_SCHEMA } from "commons/schemas";
import { InfoCircleOutlined } from "@ant-design/icons";

const FIELDS = KYC3_SCHEMA.BANK_DETAILS;
const LABELS = KYC3_SCHEMA.KYC3_LABEL;
const BANK_TYPES = {
  CHIPS: "CHIPS UID",
  ACH: "ACH Company ID",
  SWIFT: "SWIFT Code"
};
const LABEL_BY_BANK_TYPE = {
  CHIPS: "CHIPS UID",
  ACH: "ACH Company ID",
  SWIFT: "SWIFT Code"
};
const DISABLED_FIELD_BY_BANK_TYPE = {
  CHIPS: [FIELDS.sortCode],
  ACH: [FIELDS.sortCode],
  SWIFT: [FIELDS.abaNumber]
};
const getSwiftCodeLabel = (type) => LABEL_BY_BANK_TYPE[type] ?? LABEL_BY_BANK_TYPE.SWIFT;
const { Option } = Select;
export const FormView = ({ name, companyName, form }) => {
  const [disabledFields, setDisabledFields] = React.useState([]);
  const [labelBankType, setLabelBankType] = React.useState(LABEL_BY_BANK_TYPE.SWIFT);
  const handleBankTypeChange = (value) => {
    const label = getSwiftCodeLabel(value);
    const hasError = form.getFieldError(FIELDS.swiftCode).length > 0;
    const errors = hasError ? [REQUIRED_ERR(label)] : undefined;
    form.setFields([
      {
        name: FIELDS.swiftCode,
        value: "",
        errors
      }
    ]);
    setDisabledFields(DISABLED_FIELD_BY_BANK_TYPE[value]);
    setLabelBankType(label);
  };
  const getName = (fieldName) => {
    if (name == null) return fieldName;
    return [name, fieldName];
  };
  const renderFormItem = (item) => {
    switch (item.name) {
      case "Beneficiary Address":
        return <h5 className="text-primary py-1">{item.name}</h5>;
      case FIELDS.bankIdType:
        return (
          <Form.Item
            key={item.name}
            name={getName(item.name)}
            label={item.label}
            placeholder={item.placeholder}
            rules={item.options?.rules}
            className="label-form-left"
          >
            <Select
              showSearch
              onChange={handleBankTypeChange}
              defaultValue={item.initialValue}
              placeholder={item.placeholder}
            >
              {Object.keys(BANK_TYPES).map((key) => (
                <Select.Option key={key} value={key}>
                  {`${key}`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        );
      case FIELDS.country:
        return (
          <Form.Item
            key={item.name}
            name={getName(item.name)}
            label={item.label}
            placeholder={item.placeholder}
            rules={item.options?.rules}
            className="label-form-left"
          >
            <Select
              allowClear
              showSearch
              onChange={item.onChange}
              defaultValue={item.initialValue}
              placeholder={item.placeholder}
            >
              {item.data &&
                item.data.length &&
                item.data.map((val) => (
                  <Option key={`${item.name}-${val.name}`} value={val.name}>
                    {val.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        );
      case FIELDS.recipientCountry:
        return (
          <Form.Item
            key={`${item.name}`}
            name={getName(item.name)}
            label={item.label}
            placeholder={item.placeholder}
            rules={item.options?.rules}
            className="label-form-left"
          >
            <Select
              allowClear
              showSearch
              defaultValue={item.initialValue}
              placeholder={item.placeholder}
            >
              {item.data &&
                item.data.length &&
                item.data.map((val) => (
                  <Option key={`${item.name}-${val.name}`} value={val.name}>
                    {val.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        );
      case FIELDS.currency:
        return (
          <Form.Item
            key={`${item.name}`}
            name={getName(item.name)}
            label={
              <span>
                {item.label}&nbsp;&nbsp;
                <Tooltip title={`Currency of your local bank account`}>
                  <InfoCircleOutlined />
                </Tooltip>
              </span>
            }
            placeholder={item.placeholder}
            rules={item.options?.rules}
            className="label-form-left"
          >
            <Select
              allowClear
              size="large"
              defaultValue={item.initialValue}
              placeholder={item.placeholder}
            >
              {Object.keys(item.data).map((key) => (
                <Select.Option key={key} value={`${currencyList[key]} (${key})`}>
                  {`${currencyList[key]} (${key})`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        );
      case FIELDS.swiftCode:
        return (
          <Form.Item
            key={`${item.name}`}
            name={getName(item.name)}
            label={labelBankType}
            rules={item.options?.rules}
            className="label-form-left"
          >
            <Input placeholder={`Recipient's Bank  ${labelBankType}`} />
          </Form.Item>
        );
      default:
        return (
          <Form.Item
            key={`${item.name}`}
            name={getName(item.name)}
            label={item.label}
            rules={item.options?.rules}
            className="label-form-left"
          >
            <Input placeholder={item.placeholder} disabled={disabledFields.includes(item.name)} />
          </Form.Item>
        );
    }
  };
  const renderFormItemList = (schema) => {
    return (
      <>
        <Form.Item key="id" name={getName("id")} style={{ display: "none" }}>
          <Input />
        </Form.Item>
        {schema.map((item) => (
          <div className={`${item.name === "Beneficiary Address" ? "col-md-12" : "col-md-6"} mb-2`}>
            {renderFormItem(item)}
          </div>
        ))}
      </>
    );
  };
  const schema = genSchema(labelBankType, companyName);
  return <div className="row">{renderFormItemList(schema)}</div>;
};

const genSchema = (labelBankType, companyName) => [
  {
    name: FIELDS.accountName,
    label: LABELS[FIELDS.accountName],
    placeholder: "Recipient's Bank Account Name",
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {
      rules: [
        {
          required: true,
          message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.accountName]))
        },
        {
          validator: (rule, value, callback) => {
            if (!value || value.length <= 0) {
              return callback();
            }
            const splitValue = value?.toLowerCase().split(" ");
            const splitCompanyName = companyName?.toLowerCase().split(" ");
            let isOk = false;
            let i = 0;
            while (isOk === false && i < splitValue.length) {
              if (splitCompanyName.includes(splitValue[i])) {
                isOk = true;
              }
              i++;
            }
            return value && isOk === false
              ? callback(
                  createFormErrorComp(
                    "The Beneficiary Name should include at least one word in the Business Name (Company Name)"
                  )
                )
              : callback();
          }
        }
      ]
    }
  },
  {
    name: FIELDS.name,
    label: LABELS[FIELDS.name],
    placeholder: "Recipient's Beneficiary Bank",
    className: "d-lg-inline-block col-lg-6",
    options: {
      rules: [
        {
          required: true,
          message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.name]))
        }
      ]
    }
  },
  {
    name: FIELDS.bankIdType,
    label: LABELS[FIELDS.bankIdType],
    placeholder: "Bank ID Type",
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {
      rules: [
        {
          required: true,
          message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.bankIdType]))
        }
      ]
    }
  },
  {
    name: FIELDS.swiftCode,
    label: labelBankType,
    placeholder: labelBankType,
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {
      rules: [
        {
          required: true,
          message: createFormErrorComp(REQUIRED_ERR(LABEL_BY_BANK_TYPE[labelBankType]))
        }
      ]
    }
  },
  {
    name: FIELDS.accountNumber,
    label: LABELS[FIELDS.accountNumber],
    placeholder: "Recipient's Bank Account Number",
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {
      rules: [
        {
          required: true,
          min: 4,
          message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.accountNumber]))
        }
      ]
    }
  },
  {
    name: FIELDS.iban,
    label: LABELS[FIELDS.iban],
    placeholder: "Recipient's Bank IBAN",
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {
      rules: []
    }
  },
  {
    name: FIELDS.sortCode,
    label: LABELS[FIELDS.sortCode],
    placeholder: "Recipient's Bank Sort Code",
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {
      rules: []
    }
  },
  {
    name: FIELDS.abaNumber,
    label: LABELS[FIELDS.abaNumber],
    placeholder: "Recipient's Bank ABA number",
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {
      rules: []
    }
  },
  {
    name: FIELDS.address,
    label: LABELS[FIELDS.address],
    placeholder: "Recipient's Bank Address",
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {
      rules: [
        {
          required: true,
          message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.address]))
        }
      ]
    }
  },
  {
    name: FIELDS.city,
    label: LABELS[FIELDS.city],
    placeholder: "Recipient's Bank City",
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {
      rules: [
        {
          required: true,
          message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.city]))
        }
      ]
    }
  },
  {
    name: FIELDS.state,
    label: LABELS[FIELDS.state],
    placeholder: "Recipient's Bank State/ Province",
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {
      rules: []
    }
  },
  {
    name: FIELDS.country,
    label: LABELS[FIELDS.country],
    placeholder: "Recipient's Bank Country",
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {
      rules: [
        {
          required: true,
          message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.country]))
        }
      ]
    },
    data: countryList
  },
  {
    name: FIELDS.postalCode,
    label: LABELS[FIELDS.postalCode],
    placeholder: "Recipient's Bank Postal/Zip Code/P.O.Box",
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {}
  },
  {
    name: FIELDS.currency,
    label: LABELS[FIELDS.currency],
    placeholder: "Bank Currency",
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {
      rules: [
        {
          required: true,
          message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.currency]))
        }
      ]
    },
    data: currencyList
  },
  {
    name: "Beneficiary Address",
    display: "title"
  },
  {
    name: FIELDS.recipientAddress,
    label: LABELS[FIELDS.recipientAddress],
    placeholder: "Beneficiary Address",
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {
      rules: [
        {
          required: true,
          message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.recipientAddress]))
        }
      ]
    }
  },
  {
    name: FIELDS.recipientCity,
    label: LABELS[FIELDS.recipientCity],
    placeholder: LABELS[FIELDS.recipientCity],
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {
      rules: [
        {
          required: true,
          message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.recipientCity]))
        }
      ]
    }
  },
  {
    name: FIELDS.recipientState,
    label: LABELS[FIELDS.recipientState],
    placeholder: LABELS[FIELDS.recipientState],
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {
      rules: []
    }
  },
  {
    name: FIELDS.recipientCountry,
    label: LABELS[FIELDS.recipientCountry],
    placeholder: LABELS[FIELDS.recipientCountry],
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {
      rules: [
        {
          required: true,
          message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.recipientCountry]))
        }
      ]
    },
    data: countryList
  },
  {
    name: FIELDS.recipientPostalCode,
    label: LABELS[FIELDS.recipientPostalCode],
    placeholder: LABELS[FIELDS.recipientPostalCode],
    className: "d-lg-inline-block col-lg-6 pr-lg-3",
    options: {}
  }
];
