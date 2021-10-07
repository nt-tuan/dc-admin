import React from "react";
import { Form, Select, Input, Radio } from "antd";
import { FIELDS } from "./tax.chemas";
import numeral from "numeral";

const { Option } = Select;

function TaxFormItem({ handleFieldChange, dataForm, onRemoveTax, form }) {
  const handleFormatNumber = (fieldName, value, field) => {
    const inputAmount = numeral(value).value();
    if (field === FIELDS.lumpSum) {
      if (inputAmount > 0) {
        form.setFieldsValue({ [fieldName]: `${numeral(value).format("0,0.00")}` });
      }
    }
    if (field === FIELDS.percent) {
      if (isNaN(value) && value.length <= 2 && value > 0) {
        form.setFieldsValue({ [fieldName]: `${numeral(value).format("00.00")}` });
      }
      if (inputAmount < 100 && inputAmount > 0) {
        form.setFieldsValue({ [fieldName]: `${numeral(value).format("0.00")}` });
      }
    }
  };

  const renderTaxRules = () => {
    return Object.entries(dataForm).map(([key, valueData]) => {
      if (valueData && valueData?.length) {
        return valueData.map((val, idx) => {
          let filteredFields = val?.data;
          if (val?.dataFilter) {
            filteredFields = val?.data?.filter((field) => !val?.dataFilter.includes(field?.name));
          }
          return (
            <>
              {filteredFields &&
                filteredFields.map(
                  (
                    {
                      label,
                      name,
                      type,
                      placeholder,
                      rules,
                      data,
                      classNames,
                      disabled,
                      or,
                      hidden,
                      initValue
                    },
                    index
                  ) => {
                    const nameForm = `${key}-${name}-${idx}`;

                    switch (type) {
                      case "radio":
                        return (
                          <div key={`${nameForm} ${index}`} className="col-md-12">
                            <Form.Item
                              name={nameForm}
                              label={label}
                              className={`${classNames ? "col-12" : ""}`}
                            >
                              <Radio.Group
                                defaultValue={initValue}
                                className={`${
                                  classNames ? "row justify-content-between" : "d-inline"
                                }`}
                                onChange={handleFieldChange(nameForm)}
                              >
                                {data &&
                                  data.map((radio, key) => (
                                    <Radio
                                      key={`name-${key}`}
                                      value={radio.value}
                                      style={{ width: `${classNames ? "" : "auto"}` }}
                                    >
                                      {radio.name}
                                    </Radio>
                                  ))}
                              </Radio.Group>
                            </Form.Item>
                          </div>
                        );
                      case "select":
                        const formSelectType = (
                          <Form.Item
                            key={`${nameForm} ${index}`}
                            label={label}
                            className="col-6"
                            name={nameForm}
                            rules={[...rules]}
                            labelCol={{ span: 24 }}
                          >
                            <Select
                              placeholder={placeholder}
                              onChange={handleFieldChange(nameForm)}
                            >
                              {data &&
                                data.map((item) => (
                                  <Option key={item.label} value={item.value}>
                                    {item.label}
                                  </Option>
                                ))}
                            </Select>
                          </Form.Item>
                        );
                        return (
                          <>
                            {dataForm[key][idx].dataFilter.length !== 0 ? (
                              <div className="w-100" key={`${nameForm} ${index}-1`}>
                                {formSelectType}
                              </div>
                            ) : (
                              formSelectType
                            )}
                          </>
                        );

                      default:
                        return (
                          <>
                            <Form.Item
                              key={`${nameForm} ${index}`}
                              label={label}
                              className={`${or && or !== "" ? "col-5" : "col-6"}`}
                              name={nameForm}
                              rules={[...rules]}
                              labelCol={{ span: 24 }}
                            >
                              <Input
                                hidden={hidden}
                                disabled={disabled}
                                onBlur={(e) => handleFormatNumber(nameForm, e.target.value, name)}
                                suffix={`${name === FIELDS.percent ? "%" : ""}`}
                                placeholder={placeholder}
                                onChange={handleFieldChange(nameForm)}
                              />
                            </Form.Item>
                            {or && <span>{or}</span>}
                          </>
                        );
                    }
                  }
                )}
            </>
          );
        });
      }
    });
  };

  return <>{renderTaxRules()}</>;
}

export default TaxFormItem;
