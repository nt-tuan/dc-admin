import { Card, Col, Collapse, Form, Input, Row, Select, Switch } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect, useState } from "react";

import CustomFieldOption from "../CustomFieldOption/CustomFieldOption.comp";
import { FIELD_TYPE } from "../../constants";
// import "../../product-mutation-template.comp.scss";
import { REQUIRED_ERR } from "commons/consts";
import { createFormErrorComp } from "utils/form.util";
import { getLagecyModalContainer } from "components/lagecy/lagecy.comp";

const { Panel } = Collapse;
const { Option } = Select;

const FieldLayout = ({
  form,
  canAddChildFields = true,
  setTypeModalOpen,
  openChildField,
  onRemoveField,
  field,
  index,
  canDelete,
  fieldValue
}) => {
  const [fieldType, setFieldType] = useState(fieldValue?.type || undefined);
  const [fieldName, setFieldName] = useState(fieldValue?.fieldName || undefined);
  const ref = React.useRef();

  useEffect(() => {
    if ((!fieldType && fieldValue?.type) || (fieldValue?.type && fieldType !== fieldValue.type)) {
      setFieldType(fieldValue.type);
    }
  }, [fieldType, fieldValue]);

  useEffect(() => {
    if (
      (!fieldName && fieldValue?.fieldName) ||
      (fieldValue?.fieldName && fieldName !== fieldValue.fieldName)
    ) {
      setFieldName(fieldValue.fieldName);
    }
  }, [fieldName, fieldValue]);

  const handleChange = useCallback(
    (value) => {
      setFieldType(value);
      //reset option if change value of dropdown
      const formValue = form.getFieldsValue();
      const fieldData = Object.keys(formValue)[0];
      const newValue = [...formValue[fieldData]];
      newValue[index].fieldOption = [""];
      form.setFieldsValue({ [fieldData]: newValue });
    },
    [form, index]
  );

  const genExtra = useCallback(() => {
    if (canDelete) {
      return (
        <DeleteOutlined
          onClick={(event) => {
            event.stopPropagation();
            onRemoveField();
          }}
        />
      );
    }
    return null;
  }, [canDelete, onRemoveField]);

  return (
    <div ref={ref} key={field.key} className="mb-3 customCollapseField">
      <Collapse defaultActiveKey={[field.key]}>
        <Panel header={fieldName} key={field.key} extra={genExtra()}>
          <Card className="mb-1">
            <Row>
              <Col xs={8} sm={4} md={4} lg={3} xl={3} className="mt-1">
                Field Name
              </Col>
              <Col xs={16} sm={10} md={10} lg={15} xl={15} className="mb-1 pr-1">
                <Form.Item
                  name={[field.name, "fieldName"]}
                  rules={[
                    {
                      required: true,
                      message: createFormErrorComp(REQUIRED_ERR("Field Name"))
                    }
                  ]}
                >
                  <Input
                    placeholder="Enter field name"
                    onChange={(e) => setFieldName(e.target.value)}
                  />
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
                    getPopupContainer={getLagecyModalContainer}
                    onChange={handleChange}
                    style={{ width: "90%" }}
                    className="mr-1"
                  >
                    {FIELD_TYPE.map((type) => (
                      <Option value={type.value} key={`type-${type.value}`}>
                        {type.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                {canAddChildFields && (
                  <QuestionCircleOutlined
                    className="question"
                    onClick={() => setTypeModalOpen(true)}
                  />
                )}
              </Col>
            </Row>
            <div className="text-right mt-2">
              Make this field required?
              <Form.Item name={[field.name, "isRequired"]} valuePropName="checked">
                <Switch />
              </Form.Item>
            </div>
          </Card>
          <Card>
            <CustomFieldOption
              type={fieldType}
              form={form}
              canAddChildFields={canAddChildFields}
              fieldName={field.name}
              openChildField={openChildField}
              fieldIndex={index}
            />
          </Card>
        </Panel>
      </Collapse>
    </div>
  );
};

export default FieldLayout;
