import { Button, DatePicker, Form, Input, Select } from "antd";
import { USER_SCHEMA } from "commons/schemas";
import React, { memo, useEffect, useState } from "react";
import { RegexConst, REQUIRED_ERR, RouteConst } from "commons/consts";
import { isScreensize } from "utils/general.util";
import { Link } from "react-router-dom";
import { createFormErrorComp } from "utils/form.util";
import * as ERR_MSG from "commons/consts/system/errors.const";
import moment from "moment";
import countryList from "assets/country.json";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { IntroducerService } from "services";

const { FIELDS, LABELS } = USER_SCHEMA;
const isSmallDevice = isScreensize("md");

export const CreateIntroducerForm = memo(({ name }) => {
  const [form] = Form.useForm();
  const [phonePrefixList, setPhonePrefixList] = useState([]);
  const [traderList, setTraderList] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [companyNames, setCompanyNames] = useState([]);

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      let res = await IntroducerService.getTraderList();
      res = [
        { companyName: "Company 1", username: "Trader 1" },
        { companyName: "Company 2", username: "Trader 2" },
        { companyName: "Company 3", username: "Trader 3" }
      ];
      setUsernames(res);
      setCompanyNames(res);
      setTraderList(res);
    });
  }, []);

  const handleSubmit = (values) => {
    const traderNames = traderList.filter((item) => values.traderUserName.includes(item.username));
    const traderCompanyName = traderList.filter((item) =>
      values.traderCompanyName.includes(item.companyName)
    );
    const request = {
      username: values.username,
      companyName: values.companyName,
      country: values.country,
      email: values.email,
      expiryDate: moment(values.expiryDate).format("YYYY-MM-DDTHH:mm:ss"),
      firstName: values.firstName,
      lastName: values.lastName,
      middleName: values.middleName,
      phone: `${values.phonePrefix} ${values.phone}`,
      traderDTOList: [...traderNames, ...traderCompanyName]
    };
    asyncErrorHandlerWrapper(async () => {
      await IntroducerService.addIntroducer(request);
    });
  };

  const handleSelectChange = (valArr, setStateFunc, type) => {
    const newArr = traderList.filter((item) => !valArr.includes(item[type]));
    setStateFunc(newArr);
  };

  const renderPhonePrefix = () => {
    return (
      <Form.Item
        name="phonePrefix"
        noStyle
        style={{ height: 30 }}
        initialValue={phonePrefixList[0]}
      >
        <Select
          notFoundContent={<div />}
          style={{ width: 90 }}
          disabled={phonePrefixList.length === 0}
        >
          {phonePrefixList.map((code) => (
            <Select.Option value={code} key={code}>
              +{code}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    );
  };

  return (
    <Form
      form={form}
      hideRequiredMark={true}
      colon={false}
      scrollToFirstError={true}
      labelAlign="left"
      onFinish={handleSubmit}
    >
      <h5>{name}</h5>
      {SCHEMA.map((item) => (
        <div className={`${isSmallDevice ? null : "my-3"} row`} key={item[0].name}>
          {item.map(({ name, label, rules }) => {
            if (name === FIELDS.contractExpiryDate) {
              return (
                <Form.Item
                  name={name}
                  label={label}
                  rules={rules}
                  key={name}
                  className="col-12 col-sm-12 col-md-12 col-lg-4"
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    disabledDate={(current) => current && current < moment().endOf("day")}
                  />
                </Form.Item>
              );
            }
            if (name === FIELDS.country) {
              return (
                <Form.Item
                  name={name}
                  label={label}
                  rules={rules}
                  key={name}
                  className="col-12 col-sm-12 col-md-12 col-lg-4"
                >
                  <Select
                    showSearch
                    placeholder="Search Country"
                    onChange={(countryCode) => {
                      const prefixList = countryList.find(
                        (country) => country.alpha2Code === countryCode
                      );
                      if (prefixList) {
                        setPhonePrefixList(prefixList.callingCodes);
                        form.setFieldsValue({ phonePrefix: prefixList.callingCodes[0] });
                      }
                    }}
                  >
                    {countryList.map((item) => (
                      <Select.Option key={item.name} value={item.alpha2Code}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              );
            }
            if (name === FIELDS.phone) {
              return (
                <Form.Item
                  name={name}
                  label={label}
                  rules={rules}
                  key={name}
                  className="col-12 col-sm-12 col-md-12 col-lg-4"
                >
                  <Input addonBefore={renderPhonePrefix()} style={{ width: "100%", height: 30 }} />
                </Form.Item>
              );
            }
            return (
              <Form.Item
                name={name}
                label={label}
                rules={rules}
                key={name}
                className="col-12 col-sm-12 col-md-12 col-lg-4"
              >
                <Input />
              </Form.Item>
            );
          })}
        </div>
      ))}
      <h5>Assign Traders</h5>
      <h6>Please assign Traders to the Introducer</h6>
      <Form.Item
        name={FIELDS.traderUserName}
        label={LABELS[FIELDS.traderUserName]}
        className="my-3 col-12 col-lg-6 p-0"
      >
        <Select
          mode="multiple"
          placeholder="Choose username"
          onChange={(val) => handleSelectChange(val, setCompanyNames, "username")}
        >
          {usernames.map(({ username }) => (
            <Select.Option key={username} value={username}>
              {username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <div className="text-center col-12 col-lg-6 p-0">Or</div>
      <Form.Item
        name={FIELDS.traderCompanyName}
        label={LABELS[FIELDS.traderCompanyName]}
        className="my-3 col-12 col-lg-6 p-0"
      >
        <Select
          mode="multiple"
          placeholder="Choose company name"
          onChange={(val) => handleSelectChange(val, setUsernames, "companyName")}
        >
          {companyNames.map(({ companyName }) => (
            <Select.Option key={companyName} value={companyName}>
              {companyName}
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

const SCHEMA = [
  [
    {
      name: FIELDS.username,
      label: LABELS[FIELDS.username],
      rules: [
        { required: true, message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.username])) },
        {
          pattern: RegexConst.ONLY_NORMAL_CHARACTERS_AND_UNDERSCORE_REGEX,
          message: createFormErrorComp(
            ERR_MSG.USERNAME_NOT_CONTAIN_WHITESPACE_AND_SPECIAL_CHARACTERS_ERR
          )
        }
      ]
    },
    {
      name: FIELDS.contractExpiryDate,
      label: LABELS[FIELDS.contractExpiryDate],
      rules: [
        {
          required: true,
          message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.contractExpiryDate]))
        }
      ]
    }
  ],
  [
    {
      name: FIELDS.firstName,
      label: LABELS[FIELDS.firstName],
      rules: [
        { required: true, message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.firstName])) },
        {
          pattern: RegexConst.NO_WHITE_SPACE_STRING,
          message: createFormErrorComp("First name is text only")
        }
      ]
    },
    {
      name: FIELDS.middleName,
      label: LABELS[FIELDS.middleName],
      rules: [
        {
          pattern: RegexConst.NO_WHITE_SPACE_STRING,
          message: createFormErrorComp("Middle name is text only")
        }
      ]
    },
    {
      name: FIELDS.lastName,
      label: LABELS[FIELDS.lastName],
      rules: [
        { required: true, message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.lastName])) },
        {
          pattern: RegexConst.NO_WHITE_SPACE_STRING,
          message: createFormErrorComp("Last name is text only")
        }
      ]
    }
  ],
  [
    {
      name: FIELDS.companyName,
      label: LABELS[FIELDS.companyName],
      rules: [
        { required: true, message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.companyName])) },
        {
          pattern: RegexConst.NO_WHITE_SPACE_STRING,
          message: createFormErrorComp("Company name is text only")
        }
      ]
    },
    {
      name: FIELDS.country,
      label: LABELS[FIELDS.country],
      rules: [
        { required: true, message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.country])) },
        {
          pattern: RegexConst.NO_WHITE_SPACE_STRING,
          message: createFormErrorComp("Country is text only")
        }
      ]
    }
  ],
  [
    {
      name: FIELDS.email,
      label: LABELS[FIELDS.email],
      rules: [
        { required: true, message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.email])) },
        { type: "email", message: createFormErrorComp(ERR_MSG.EMAIL_NOT_VALID_ERR) }
      ]
    },
    {
      name: FIELDS.phone,
      label: LABELS[FIELDS.phone],
      rules: [
        { required: true, message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.phone])) },
        {
          pattern: RegexConst.ONLY_NUMBER_REGEX,
          message: createFormErrorComp("Phone is number only")
        }
      ]
    }
  ]
];
