import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
//** components */
import { selectUsers } from "redux/user/user.duck";
import { createFormErrorComp } from "utils";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { Form, Input, Select, Button, message } from "antd";
import { REQUIRED_ERR, MUST_BE_ATLEAST_4_CHARACTERS } from "commons/consts";
import countryList from "assets/country.json";
import currencyList from "assets/currency.json";
import { submitBankDetails } from "services/bankDetail.service";
import { TwoStepsVerifycation } from "../modals";

const tailLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

function BankDetailForm({ companyName, setIsShowView, setIsShowForm, bankDetails }) {
  const users = useSelector(selectUsers);
  const { email } = users;

  const [dataUpdate, setDataUpdate] = useState(null);

  const [dataField, setDataField] = useState([]);
  const [isShowModal2Verify, setIsShowModal2Verify] = useState(false);

  const { Option } = Select;
  const [form] = Form.useForm();

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
        array[0][key] = values[key];
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
      name: "accountHolder",
      label: "Beneficiary Name",
      placeholder: "Beneficiary Name",
      options: {
        rules: [
          { required: true, message: createFormErrorComp(REQUIRED_ERR("Beneficiary Name")) },
          {
            validator: (rule, value, callback) => {
              const splitValue = value.split(" ");
              const splitCompanyName = companyName.split(" ");
              let isOk = false;
              let i = 0;
              while (isOk === false && i < splitCompanyName.length) {
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
      name: "name",
      label: "Bank Name",
      placeholder: "Bank Name",
      options: {
        rules: [{ required: true, message: createFormErrorComp(REQUIRED_ERR("Bank Name")) }]
      }
    },
    {
      name: "accountNumber",
      label: "Account Number",
      placeholder: "Account Number",
      options: {
        rules: [
          { required: true, message: createFormErrorComp(REQUIRED_ERR("Beneficiary Name")) },
          {
            min: 4,
            message: createFormErrorComp(MUST_BE_ATLEAST_4_CHARACTERS("Account Number"))
          }
        ]
      }
    },
    {
      name: "iban",
      label: "IBAN",
      placeholder: "IBAN",
      className: "d-lg-inline-block col-lg-6",
      options: {}
    },
    {
      name: "swiftCode",
      label: "Swift Code",
      placeholder: "Swift Code",
      options: {
        rules: [{ required: true, message: createFormErrorComp(REQUIRED_ERR("Swift Code")) }]
      }
    },
    {
      name: "sortCode",
      label: "Sort Code",
      placeholder: "Sort Code",
      options: {
        rules: [{ required: true, message: createFormErrorComp(REQUIRED_ERR("Sort Code")) }]
      }
    },
    {
      name: "nationality",
      label: "Country of Beneficiary's Bank",
      placeholder: "Country of Beneficiary's Bank",
      options: {
        rules: [
          {
            required: true,
            message: createFormErrorComp(REQUIRED_ERR("Country of Beneficiary's Bank"))
          }
        ]
      },
      data: countryList,
      type: "select"
    },
    {
      name: "currency",
      label: "Bank Currency",
      placeholder: "Bank Currency",
      type: "select",
      data: currencyList,
      options: {
        rules: [
          {
            required: true,
            message: createFormErrorComp(REQUIRED_ERR("Bank Currency"))
          }
        ]
      }
    }
  ];

  const addSubBank = () => {
    const refArray = FORM_FIELDS;
    setDataField(refArray);
  };

  useEffect(() => {
    form.setFieldsValue(...bankDetails);
    // Handle Secondary Bank Account default values
    if (bankDetails && bankDetails.length > 1) {
      const dataSecondary = {};
      Object.keys(bankDetails[1]).forEach((key) => {
        dataSecondary[`secondary-${key}`] = bankDetails[1][key];
      });
      form.setFieldsValue(dataSecondary);
      addSubBank();
    }
  }, [bankDetails]);

  const removeSubBank = () => {
    setDataField([]);
  };

  const renderForm = (item) => {
    switch (item.name) {
      case "nationality":
        return (
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
        );
      case "currency":
        return (
          <Select allowClear size="large" placeholder={item.placeholder}>
            {Object.keys(item.data).map((key) => (
              <Select.Option key={key} value={key}>
                {`${currencyList[key]} (${key})`}
              </Select.Option>
            ))}
          </Select>
        );
      default:
        return <Input />;
    }
  };

  return (
    <>
      <Form name="customized_form_controls" form={form} onFinish={onFinish}>
        {FORM_FIELDS.map((item) => {
          if (item.name === "id") {
            return (
              <Form.Item key={item.name} name={item.name} style={{ display: "none" }}>
                <Input />
              </Form.Item>
            );
          } else {
            return (
              <Form.Item
                key={item.name}
                {...tailLayout}
                name={item.name}
                label={item.label}
                placeholder={item.placeholder}
                rules={item.options?.rules}
                className="label-form-left"
              >
                {renderForm(item)}
              </Form.Item>
            );
          }
        })}

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

        {dataField.map((item) => {
          if (item.name === "id") {
            return (
              <Form.Item key={item.name} name={item.name} style={{ display: "none" }}>
                <Input />
              </Form.Item>
            );
          } else {
            return (
              <Form.Item
                key={`secondary-${item.name}`}
                {...tailLayout}
                name={`secondary-${item.name}`}
                label={item.label}
                placeholder={item.placeholder}
                rules={item.options?.rules}
                className="label-form-left"
              >
                {renderForm(item)}
              </Form.Item>
            );
          }
        })}
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
