import { Button, Form, Input, Select } from "antd";
import { USER_SCHEMA } from "commons/schemas";
import React, { memo } from "react";
import { REQUIRED_ERR, RouteConst } from "commons/consts";
import { isScreensize } from "utils/general.util";
import { Link } from "react-router-dom";

const { FIELDS, LABELS } = USER_SCHEMA;
const isSmallDevice = isScreensize("sm");

export const CreateIntroducerForm = memo(({ name }) => {
  const [form] = Form.useForm();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    console.log("handleSubmit -> value", value);
  };
  return (
    <Form
      form={form}
      hideRequiredMark={true}
      colon={false}
      scrollToFirstError={true}
      labelAlign="left"
      onSubmit={handleSubmit}
    >
      <h5>{name}</h5>
      {SCHEMA.map((item) => (
        <div className={`${isSmallDevice ? null : "my-3"} row`} key={item[0].name}>
          {item.map(({ name, label, rules }) => (
            <Form.Item
              name={name}
              label={label}
              rules={rules}
              key={name}
              labelCol={{ sx: 24, sm: 12, md: 8, lg: 14 }}
              wrapperCol={{
                sx: 24,
                sm: 12,
                md: 16,
                lg: 12
              }}
              className="col-12 col-sm-12 col-md-12 col-lg-4"
            >
              <Input />
            </Form.Item>
          ))}
        </div>
      ))}
      <h5>Assign Traders</h5>
      <h6>Please assign Traders to the Introducer</h6>
      <Form.Item
        name={FIELDS.traderUserName}
        label={LABELS[FIELDS.traderUserName]}
        labelCol={{ sx: 24, sm: 12, md: 8, lg: 10 }}
        wrapperCol={{
          sx: 24,
          sm: 12,
          md: 16,
          lg: 14
        }}
        className="my-3 w-75"
      >
        <Select>
          {traderList.map(({ id, name }) => (
            <Select.Option key={id} value={name}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <div className="text-center w-75">Or</div>
      <Form.Item
        name={FIELDS.traderCompanyName}
        label={LABELS[FIELDS.traderCompanyName]}
        labelCol={{ sx: 24, sm: 12, md: 8, lg: 10 }}
        wrapperCol={{
          sx: 24,
          sm: 12,
          md: 16,
          lg: 14
        }}
        className="my-3 w-75"
      >
        <Select>
          {traderList.map(({ id, name }) => (
            <Select.Option key={id} value={name}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <div className="text-center">
        <Link to={RouteConst.INTRODUCERS}>
          <Button type="primary">Cancel</Button>
        </Link>
        <Button type="primary" className="ml-3" htmlType="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
});

const traderList = [
  { id: 0, name: "Trader 1" },
  { id: 1, name: "Trader 2" },
  { id: 2, name: "Trader 3" }
];

const SCHEMA = [
  [
    {
      name: FIELDS.username,
      label: LABELS[FIELDS.username],
      rules: [{ required: true, message: REQUIRED_ERR(LABELS[FIELDS.username]) }]
    },
    {
      name: FIELDS.contractExpiryDate,
      label: LABELS[FIELDS.contractExpiryDate],
      rules: [{ required: true, message: REQUIRED_ERR(LABELS[FIELDS.contractExpiryDate]) }]
    }
  ],
  [
    {
      name: FIELDS.firstName,
      label: LABELS[FIELDS.firstName],
      rules: [{ required: true, message: REQUIRED_ERR(LABELS[FIELDS.firstName]) }]
    },
    {
      name: FIELDS.middleName,
      label: LABELS[FIELDS.middleName],
      rules: [{ required: true, message: REQUIRED_ERR(LABELS[FIELDS.middleName]) }]
    },
    {
      name: FIELDS.lastName,
      label: LABELS[FIELDS.lastName],
      rules: [{ required: true, message: REQUIRED_ERR(LABELS[FIELDS.lastName]) }]
    }
  ],
  [
    {
      name: FIELDS.companyName,
      label: LABELS[FIELDS.companyName],
      rules: [{ required: true, message: REQUIRED_ERR(LABELS[FIELDS.companyName]) }]
    },
    {
      name: FIELDS.country,
      label: LABELS[FIELDS.country],
      rules: [{ required: true, message: REQUIRED_ERR(LABELS[FIELDS.country]) }]
    }
  ],
  [
    {
      name: FIELDS.email,
      label: LABELS[FIELDS.email],
      rules: [{ required: true, message: REQUIRED_ERR(LABELS[FIELDS.email]) }]
    },
    {
      name: FIELDS.phone,
      label: LABELS[FIELDS.phone],
      rules: [{ required: true, message: REQUIRED_ERR(LABELS[FIELDS.phone]) }]
    }
  ]
];
