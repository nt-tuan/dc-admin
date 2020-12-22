import React, { memo } from "react";
import { Form, Input, Button, Select } from "antd";
import PropTypes from "prop-types";

//** Components */
import { PHONE_SCHEMA, COUNTRY_SCHEMA } from "commons/schemas";
import { createFormErrorComp } from "utils";
import { REQUIRED_ERR } from "commons/consts";
import countryList from "assets/country.json";

const InformationEdit = memo((props) => {
  const {
    users: { middleName, firstName, lastName, email, country, phone },
    handleEditForm
  } = props;
  // const countryValue = countryList.find((it) => it.alpha2Code === country)?.name;
  const preFix = phone.split(" ");
  const phoneParse = preFix[1] || "";
  const prefixPhone = preFix[0] || "";

  const [form] = Form.useForm();

  const onFinish = (values) => {
    values.phone = `${values.prefixPhone} ${values.phone}`;
    if (values.prefixPhone !== null) delete values.prefixPhone;
    handleEditForm(values);
  };

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

  const { Option } = Select;
  const FORM_FIELDS = [
    {
      name: "firstName",
      label: "First Name",
      placeholder: "First Name",
      options: {
        initialValue: firstName,
        rules: [{ required: true, message: createFormErrorComp(REQUIRED_ERR("First Name")) }]
      }
    },
    {
      name: "lastName",
      label: "Last Name",
      placeholder: "Last Name",
      options: {
        initialValue: lastName,
        rules: [{ required: true, message: createFormErrorComp(REQUIRED_ERR("Last Name")) }]
      }
    },
    {
      name: "middleName",
      label: "Middle Name",
      placeholder: "Middle name",
      options: {
        initialValue: middleName
      }
    },
    {
      name: "country",
      label: COUNTRY_SCHEMA.label,
      placeholder: COUNTRY_SCHEMA.placeholder,
      options: {
        initialValue: COUNTRY_SCHEMA.initialValue(countryList, "country"),
        rules: [{ required: true, message: COUNTRY_SCHEMA.required.errMsg }]
      },
      onChange: (val) => {
        const selectedValue = countryList.find((it) => it.alpha2Code === val);
        if (selectedValue && selectedValue.callingCodes[0]) {
          form.setFieldsValue({ prefixPhone: `+${selectedValue.callingCodes[0]}` });
        }
      }
    },

    {
      name: "phone",
      label: "Phone Number",
      placeholder: "Phone Number",
      options: {
        initialValue: PHONE_SCHEMA.numberInitialValue(phone),
        rules: [
          {
            required: true,
            message: PHONE_SCHEMA.required.errMsg
          },
          {
            pattern: PHONE_SCHEMA.numberOnly.regex,
            message: PHONE_SCHEMA.numberOnly.errMsg
          }
        ]
      },
      createPhonePrefix: PHONE_SCHEMA.createPhonePrefix
    }
  ];
  const renderForm = (item) => {
    switch (item.name) {
      case "country":
        return (
          <Select
            allowClear
            showSearch
            filterOption={(input, option) => {
              return (
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
            onChange={item.onChange}
            placeholder="Search Country"
          >
            {countryList.map((val) => (
              <Option key={`Country${val.name}`} value={val.alpha2Code}>
                {val.name}
              </Option>
            ))}
          </Select>
        );
      case "phone":
        const prefixSelector = (
          <Form.Item name="prefixPhone" noStyle>
            <Select style={{ width: 90 }}>
              {countryList.map((val) => (
                <Option key={`ctryo-${val.name}`} value={val.alpha2Code}>
                  +{val.callingCodes}
                </Option>
              ))}
            </Select>
          </Form.Item>
        );
        return <Input addonBefore={prefixSelector} />;

      default:
        return <Input />;
    }
  };
  return (
    <Form
      name="customized_form_controls"
      form={form}
      onFinish={onFinish}
      initialValues={{
        middleName,
        firstName,
        lastName,
        email,
        country,
        prefixPhone: prefixPhone,
        phone: phoneParse
      }}
    >
      {FORM_FIELDS.map((item) => (
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
      ))}
      <Form.Item
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 16, offset: 8 }
        }}
      >
        <Button type="primary" htmlType="submit" style={{ marginTop: "30px" }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
});

InformationEdit.propTypes = {
  username: PropTypes.string
};

InformationEdit.defaultProps = {
  username: null // define title
};

export default InformationEdit;
