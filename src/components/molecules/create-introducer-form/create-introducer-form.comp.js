import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import { Link } from "react-router-dom";
import React, { memo, useEffect, useState } from "react";
import { USER_SCHEMA } from "commons/schemas";
import { API_ERRORS, RegexConst, REQUIRED_ERR, RouteConst } from "commons/consts";
import * as ERR_MSG from "commons/consts/system/errors.const";
import { createFormErrorComp } from "utils/form.util";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { isScreensize } from "utils/general.util";
import { IntroducerService } from "services";

import moment from "moment";
import countryList from "assets/country.json";
import styles from "./styles.module.scss";

const { FIELDS, LABELS } = USER_SCHEMA;
const isSmallDevice = isScreensize("md");

export const CreateIntroducerForm = memo(
  ({ name, initialValues, isView = false, isEdit = false, id = "", onSubmitData }) => {
    const [form] = Form.useForm();
    const [phonePrefixList, setPhonePrefixList] = useState([]);
    const [traderList, setTraderList] = useState([]);
    const [usernames, setUsernames] = useState([]);
    const [companyNames, setCompanyNames] = useState([]);

    useEffect(() => {
      asyncErrorHandlerWrapper(async () => {
        const res =
          isView || isEdit
            ? await IntroducerService.getTraderListByIntroducer(id)
            : await IntroducerService.getTraderList();
        setUsernames(res);
        setCompanyNames(res);
        setTraderList(res);
      });
    }, [id, isEdit, isView]);

    const handleSubmit = (values) => {
      const request = parseSubmitData(values);
      const onServerError = (errors) => {
        const errorFields = errors.map((error) => {
          const errorField = error[0];
          const errorCode = error[1];
          return {
            name: errorField,
            errors: [API_ERRORS[errorCode]]
          };
        });
        form.setFields(errorFields);
      };
      onSubmitData(request, { onError: onServerError });
    };

    const parseSubmitData = (values) => {
      const traderNames = values.traderUserName
        ? values.traderUserName.map((username) => ({
            companyName: null,
            username
          }))
        : [];
      const traderCompanyName = values.traderCompanyName
        ? values.traderCompanyName.map((companyName) => ({
            companyName,
            username: null
          }))
        : [];
      let request = {
        username: values.username,
        companyName: values.companyName.trim(),
        country: values.country.trim(),
        email: values.email,
        expiryDate: moment(values.expiryDate).format("YYYY-MM-DDTHH:mm:ss"),
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        middleName: values.middleName ? values.middleName.trim() : "",
        phone: `${values.phonePrefix} ${values.phone}`,
        traderDTOList: [...traderNames, ...traderCompanyName]
      };
      if (isEdit && !isView)
        request = {
          expiryDate: moment(values.expiryDate).format("YYYY-MM-DDTHH:mm:ss"),
          traderDTOList: [...traderNames, ...traderCompanyName]
        };
      return request;
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
            className={styles["phone-prefix"]}
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
        initialValues={initialValues}
      >
        <h5>{name}</h5>
        {SCHEMA.map((item) => (
          <Row key={item[0].name}>
            {item.map(({ name, label, rules }) => {
              if (name === FIELDS.contractExpiryDate) {
                return (
                  <Form.Item
                    name={name}
                    label={label}
                    rules={rules}
                    key={name}
                    {...labelConfig}
                    className="col-sm-12 col-md-6 col-lg-6"
                  >
                    <DatePicker
                      disabled={isView}
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
                    {...labelConfig}
                    className="col-sm-12 col-md-6 col-lg-6"
                  >
                    <Select
                      disabled={isView || isEdit}
                      showSearch
                      allowClear
                      placeholder="Search Country"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                        option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
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
                    {...labelConfig}
                    className="col-sm-12 col-md-6 col-lg-6"
                  >
                    <Input
                      addonBefore={renderPhonePrefix()}
                      style={{ width: "100%", height: 30 }}
                      disabled={isView || isEdit || phonePrefixList.length === 0}
                    />
                  </Form.Item>
                );
              }
              return (
                <Form.Item
                  name={name}
                  label={label}
                  rules={rules}
                  key={name}
                  {...labelConfig}
                  className="col-sm-12 col-md-6 col-lg-6"
                >
                  <Input disabled={isView || isEdit} />
                </Form.Item>
              );
            })}
          </Row>
        ))}
        <h5>Assign Traders</h5>
        <h6>Please assign Traders to the Introducer</h6>
        <Row className={isSmallDevice ? null : "my-3"} key="trader-user-name">
          <Form.Item
            name={FIELDS.traderUserName}
            label={LABELS[FIELDS.traderUserName]}
            {...labelTradersConfig}
            className="col-sm-12 col-md-12 col-lg-12"
          >
            <Select
              disabled={isView}
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
        </Row>
        {/* ant-select ant-select-single ant-select-show-arrow ant-select-disabled */}
        <Row className="text-center mx-3">Or</Row>
        <Row className={isSmallDevice ? null : "my-3"} key="trader-company-name">
          <Form.Item
            name={FIELDS.traderCompanyName}
            label={LABELS[FIELDS.traderCompanyName]}
            {...labelTradersConfig}
            className="col-sm-12 col-md-12 col-lg-12"
          >
            <Select
              disabled={isView}
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
        </Row>
        <div className="text-center">
          <Link to={RouteConst.INTRODUCERS}>
            <Button type="primary" className="mr-3">
              Cancel
            </Button>
          </Link>
          {isView ? (
            <Link to={`${RouteConst.INTRODUCER_EDIT}?id=${id}`}>
              <Button type="primary">Edit</Button>
            </Link>
          ) : (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
        </div>
      </Form>
    );
  }
);
const labelConfig = {
  labelCol: { xl: 12, lg: 12, md: 12, sm: 24 },
  wrapperCol: { xl: 12, lg: 12, md: 12, sm: 24 }
};
const labelTradersConfig = {
  labelCol: { xl: 6, lg: 6, md: 6, sm: 24 },
  wrapperCol: { xl: 12, lg: 12, md: 12, sm: 24 }
};
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
        { required: true, message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.firstName])) }
      ]
    },
    {
      name: FIELDS.middleName,
      label: LABELS[FIELDS.middleName],
      rules: []
    },
    {
      name: FIELDS.lastName,
      label: LABELS[FIELDS.lastName],
      rules: [
        { required: true, message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.lastName])) }
      ]
    }
  ],
  [
    {
      name: FIELDS.companyName,
      label: LABELS[FIELDS.companyName],
      rules: [
        { required: true, message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.companyName])) }
      ]
    },
    {
      name: FIELDS.country,
      label: LABELS[FIELDS.country],
      rules: [
        { required: true, message: createFormErrorComp(REQUIRED_ERR(LABELS[FIELDS.country])) }
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
