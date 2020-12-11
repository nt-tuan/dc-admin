import React, { useCallback, useState, useRef } from "react";
import { Collapse, Card, Row, Col, Select, Input, Form, Switch } from "antd";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { FIELD_TYPE } from "../../constants";
import CustomFieldOption from "../CustomFieldOption/CustomFieldOption.comp";
import "../../product-mutation-template.comp.scss";
import { REQUIRED_ERR } from "commons/consts";
import { createFormErrorComp } from "utils/form.util";

const { Panel } = Collapse;
const { Option } = Select;

const FieldLayout = ({
  type,
  childAble = true,
  setTypeModalOpen,
  setIsChildModalOpen,
  remove,
  field,
  childValue,
  setChildValue
}) => {
  const [fieldType, setFieldType] = useState();
  const fieldOptionsRef = useRef();

  const handleChange = useCallback((value) => {
    setFieldType(value);
  }, []);

  const genExtra = () => (
    <DeleteOutlined
      onClick={(event) => {
        remove();
        // fieldOptionsRef.current.onValidateFieldOptions();
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  );

  return (
    <div key={field.key} className="mb-3">
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="" key="1" extra={genExtra()}>
          <Card className="mb-1">
            <Row>
              <Col xs={8} sm={4} md={4} lg={3} xl={3}>
                Field Name
              </Col>
              <Col xs={16} sm={10} md={10} lg={15} xl={15} className="mb-1 pr-1">
                <Form.Item
                  name={[field.name, "fieldName"]}
                  rules={[
                    {
                      required: true,
                      message: createFormErrorComp(REQUIRED_ERR("name"))
                    }
                  ]}
                >
                  <Input placeholder="Enter field name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={10} md={10} lg={6} xl={6}>
                <Form.Item
                  name={[field.name, "type"]}
                  rules={[
                    {
                      required: true,
                      message: createFormErrorComp(REQUIRED_ERR("Field Type"))
                    }
                  ]}
                >
                  <Select
                    defaultValue={type}
                    onChange={handleChange}
                    style={{ width: "90%" }}
                    className="mr-1"
                  >
                    {FIELD_TYPE.map((type) => (
                      <Option value={type.value}>{type.label}</Option>
                    ))}
                  </Select>
                </Form.Item>
                {childAble && (
                  <QuestionCircleOutlined
                    className="question"
                    onClick={() => setTypeModalOpen(true)}
                  />
                )}
              </Col>
            </Row>
            <div className="text-right mt-2">
              Make this field required?
              <Switch defaultChecked onChange={(value) => console.log(value)} className="mx-3" />
            </div>
          </Card>

          {fieldType && (
            <Card>
              <CustomFieldOption
                type={fieldType}
                ref={fieldOptionsRef}
                childAble={childAble}
                fieldKey={field.key}
                {...{ setIsChildModalOpen, childValue, setChildValue }}
              />
            </Card>
          )}
        </Panel>
      </Collapse>
    </div>
  );
};

export default FieldLayout;
