import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
//** components */
import { selectUsers } from "redux/user/user.duck";
import { createFormErrorComp } from "utils";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { Form, Input, Select, Button, message, Tooltip } from "antd";
import { REQUIRED_ERR, MUST_BE_ATLEAST_4_CHARACTERS } from "commons/consts";
import countryList from "assets/country.json";
import currencyList from "assets/currency.json";
import { submitBankDetails } from "services/bankDetail.service";
import { TwoStepsVerifycation } from "../modals";
import { KYC3_SCHEMA } from "commons/schemas";
import { InfoCircleOutlined } from "@ant-design/icons";

const FIELDS = KYC3_SCHEMA.BANK_DETAILS;
const LABELS = KYC3_SCHEMA.KYC3_LABEL;
const BANK_TYPES = {
  CHIPS: "CHIPS UID",
  ACH: "ACH Company ID",
  SWIFT: "SWIFT Code"
};

function BankDetailForm({ companyName, setIsShowView, setIsShowForm, bankDetails }) {
  const users = useSelector(selectUsers);
  const { email } = users;
  const [dataUpdate, setDataUpdate] = useState(null);
  const [dataField, setDataField] = useState([]);
  const [isShowModal2Verify, setIsShowModal2Verify] = useState(false);
  const { Option } = Select;
  const [form] = Form.useForm();
  const [labelBankType, setLabelBankType] = useState("SWIFT Code");
  const [disabledField, setDisabledField] = useState([]);

  const [labelBankTypeSecondary, setLabelBankTypeSecondary] = useState("SWIFT Code");
  const [disabledFieldSecondary, setDisabledFieldSecondary] = useState([]);
  const [currencyName, setCurrencyName] = useState(null);
  const [currencyNameSecondary, setCurrencyNameSecondary] = useState(null);

  const handleUpdateBankDetail = () => {
    asyncErrorHandlerWrapper(async () => {
      try {
        await submitBankDetails(dataUpdate);
        setIsShowView(true);
        setIsShowForm(false);
        message.success("Update Successful");
      } catch (error) {
        message.error("Error");
      }
    });
  };

  const onFinish = (values) => {
    const array = [{}, {}];
    Object.keys(values).forEach((key) => {
      if (key.includes("secondary")) {
        array[1][key.replace("secondary-", "")] = values[key];
      } else {
        array[0][key.replace("primary-", "")] = values[key];
      }
    });
    const dataFilter = array.filter((value) => Object.keys(value).length !== 0);
    setDataUpdate(dataFilter);
    setIsShowModal2Verify(true);
  };

  const FORM_FIELDS = [
    {
      name: "id"
    },
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
              const splitValue = value?.toLowerCase().split(" ");
              const splitCompanyName = companyName?.toLowerCase().split(" ");
              console.log("value: " + splitValue);
              console.log("splitCompanyName: " + splitCompanyName);
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
      label: LABELS[FIELDS.swiftCode],
      placeholder: LABELS[FIELDS.swiftCode],
      className: "d-lg-inline-block col-lg-6 pr-lg-3",
      options: {
        rules: [
          {
            required: true,
            message: createFormErrorComp(REQUIRED_ERR(labelBankType))
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

  const addSubBank = () => {
    const refArray = FORM_FIELDS;
    setDataField(refArray);
  };

  useEffect(() => {
    if (bankDetails && bankDetails.length === 1) {
      const dataPrimary = {};
      Object.keys(bankDetails[0]).forEach((key) => {
        dataPrimary[`primary-${key}`] = bankDetails[0][key];
      });
      form.setFieldsValue(dataPrimary);
      setCurrencyName(
        `${currencyList[bankDetails[0]["currency"]]} (${bankDetails[0]["currency"]})`
      );

      const bankIDTypeData = currencyList[bankDetails[0]["bankIdType"]];
      if (bankIDTypeData === "ACH" || bankIDTypeData === "CHIPS") {
        setDisabledField([FIELDS.sortCode]);
      }
      if (bankIDTypeData === "SWIFT") {
        setDisabledField([FIELDS.abaNumber]);
      }
    }

    // Handle Secondary Bank Account default values
    if (bankDetails && bankDetails.length > 1) {
      const dataSecondary = {};
      Object.keys(bankDetails[1]).forEach((key) => {
        dataSecondary[`secondary-${key}`] = bankDetails[1][key];
      });
      form.setFieldsValue(dataSecondary);
      setCurrencyName(
        `${currencyList[bankDetails[1]["currency"]]} (${bankDetails[0]["currency"]})`
      );
      const bankIDTypeData = currencyList[bankDetails[0]["bankIdType"]];
      if (bankIDTypeData === "ACH" || bankIDTypeData === "CHIPS") {
        setDisabledFieldSecondary([FIELDS.sortCode]);
      }
      if (bankIDTypeData === "SWIFT") {
        setDisabledFieldSecondary([FIELDS.abaNumber]);
      }
      addSubBank();
    }
  }, [bankDetails]);

  const removeSubBank = () => {
    setDataField([]);
  };

  const renderForm = (item, type = "") => {
    switch (item.name) {
      case "Beneficiary Address":
        return (
          <>
            <h5 className="text-primary py-1">{item.name}</h5>
          </>
        );
      case FIELDS.bankIdType:
        return (
          <Form.Item
            key={`${type}-${item.name}`}
            name={`${type}-${item.name}`}
            label={item.label}
            placeholder={item.placeholder}
            rules={item.options?.rules}
            className="label-form-left"
          >
            <Select
              showSearch
              onChange={(value) => {
                if (type === "primary") {
                  setLabelBankType(BANK_TYPES[value]);
                  if (value === "ACH" || value === "CHIPS") {
                    setDisabledField([FIELDS.sortCode]);
                  }
                  if (value === "SWIFT") {
                    setDisabledField([FIELDS.abaNumber]);
                  }
                } else {
                  setLabelBankTypeSecondary(BANK_TYPES[value]);
                  if (value === "ACH" || value === "CHIPS") {
                    setDisabledFieldSecondary([FIELDS.sortCode]);
                  }
                  if (value === "SWIFT") {
                    setDisabledFieldSecondary([FIELDS.abaNumber]);
                  }
                }
              }}
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
            key={`${type}-${item.name}`}
            name={`${type}-${item.name}`}
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
            key={`${type}-${item.name}`}
            name={`${type}-${item.name}`}
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
            key={`${type}-${item.name}`}
            name={`${type}-${item.name}`}
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
              onChange={(val) => {
                if (type === "primary") {
                  setCurrencyName(`${val}`);
                } else {
                  setCurrencyNameSecondary(`${val}`);
                }
              }}
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
            key={`${type}-${item.name}`}
            name={`${type}-${item.name}`}
            label={`${type === null ? labelBankType : labelBankTypeSecondary}`}
            rules={item.options?.rules}
            className="label-form-left"
          >
            <Input placeholder={`${type === null ? labelBankType : labelBankTypeSecondary}`} />
          </Form.Item>
        );
      default:
        return (
          <Form.Item
            key={`${type}-${item.name}`}
            name={`${type}-${item.name}`}
            label={item.label}
            rules={item.options?.rules}
            className="label-form-left"
          >
            <Input
              placeholder={item.placeholder}
              disabled={
                type === "primary"
                  ? disabledField.includes(item.name)
                  : disabledFieldSecondary.includes(item.name)
              }
            />
          </Form.Item>
        );
    }
  };
  return (
    <>
      <Form className="customized_form_controls" layout="vertical" form={form} onFinish={onFinish}>
        <div className="row">
          {FORM_FIELDS.map((item) => {
            if (item.name === "id") {
              return (
                <Form.Item key={item.name} name={item.name} style={{ display: "none" }}>
                  <Input />
                </Form.Item>
              );
            } else {
              return (
                <div
                  className={`${
                    item.name === "Beneficiary Address" ? "col-md-12" : "col-md-6"
                  } mb-2`}
                >
                  {renderForm(item, "primary")}
                </div>
              );
            }
          })}
        </div>

        {/* Title bank account */}
        <Form.Item>
          {dataField.length === 0 ? (
            <Button type="primary" style={{ margin: "20px 0" }} onClick={addSubBank}>
              Add a Secondary Bank Account
            </Button>
          ) : (
            <h4 className="d-flex justify-content-between mt-2 mb-3">
              <span className="text-primary">Secondary Bank Account</span>
              <Button type="primary" onClick={removeSubBank}>
                <i className="fe fe-minus"></i>
              </Button>
            </h4>
          )}
        </Form.Item>

        <div className="row">
          {dataField.map((item) => {
            if (item.name === "id") {
              return (
                <Form.Item key={item.name} name={item.name} style={{ display: "none" }}>
                  <Input />
                </Form.Item>
              );
            } else {
              return (
                <div
                  className={`${
                    item.name === "Beneficiary Address" ? "col-md-12" : "col-md-6"
                  } mb-2`}
                >
                  {renderForm(item, "secondary")}
                </div>
              );
            }
          })}
        </div>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 }
          }}
          style={{ marginTop: "30px" }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {isShowModal2Verify && (
        <TwoStepsVerifycation
          isShowModal2Verify={isShowModal2Verify}
          setIsShowModal2Verify={(val) => setIsShowModal2Verify(val)}
          email={email}
          handleUpdateBankDetail={handleUpdateBankDetail}
        />
      )}
    </>
  );
}

export default BankDetailForm;
