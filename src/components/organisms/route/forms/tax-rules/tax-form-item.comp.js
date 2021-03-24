import React from "react";
import { Form, Select, Input, Radio, Button } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { FIELDS } from "./tax.chemas";
// import { FIELDS } from "./tax.chemas";

const { Option } = Select;

function TaxFormItem({ handleFieldChange, dataForm, onRemoveTax }) {
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
              {key === "taxOther" && (
                <div className="col-12 text-right ">
                  <Button
                    disabled={dataForm?.taxOther[0]?.data?.length === 1}
                    // className="position-absolute"
                    // style={{top:'100%',right:'15px'}}
                    onClick={() => onRemoveTax(idx)}
                    type="primary"
                    danger
                    size="small"
                    shape="circle"
                    icon={<MinusOutlined />}
                  />
                </div>
              )}
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
                                onBlur={handleFieldChange(nameForm)}
                                suffix={`${name === FIELDS.percent ? "%" : ""}`}
                                placeholder={placeholder}
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
