import React, { useCallback, useState } from "react";
import { Collapse, Card, Row, Col, Select, Input, Modal, Switch, Form, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FIELD_TYPE } from "../../constants";
import FieldLayout from "./FieldLayout";
import "../../product-mutation-template.comp.scss";

const ChildFieldModal = ({ isOpen, closeModal, form }) => {
  return (
    <Modal
      centered
      title="Add child field(s) to this value"
      visible={isOpen}
      onCancel={closeModal}
      okText="Save"
      width={800}
      onOk={() => console.log(111)}
    >
      <Form form={form}>
        <Form.List name="child-field-items">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, curValues) => prevValues.name !== curValues.name}
                >
                  {() => (
                    <Form.Item
                      {...field}
                      name={[field.name, "name"]}
                      fieldKey={[field.fieldKey, "name"]}
                    >
                      <FieldLayout childAble={false} />
                    </Form.Item>
                  )}
                </Form.Item>
              ))}
              <Form.Item className="mt-3">
                <Button
                  type="primary"
                  onClick={add}
                  style={{ minWidth: "100px" }}
                  icon={<PlusOutlined />}
                >
                  New Field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default ChildFieldModal;
