import React, { useCallback, useState } from "react";
import { Collapse, Card, Row, Col, Select, Input, Modal, Switch } from "antd";
import { QuestionCircleOutlined, PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { FIELD_TYPE } from "../../constants";
import "../../product-mutation-template.comp.scss";

const { Panel } = Collapse;
const { Option } = Select;

const Field = ({ type }) => {
  const [isTypeModalOpen, setTypeModalOpen] = useState(false);

  const handleChange = useCallback((value) => {
    console.log();
  }, []);
  return (
    <>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="This is panel header 2" key="2">
          <Card className="mb-1">
            <Row>
              <Col xs={8} sm={4} md={4} lg={3} xl={2}>
                Field Name
              </Col>
              <Col xs={16} sm={10} md={10} lg={15} xl={16} className="mb-1 pr-1">
                <Input placeholder="Enter field name" />
              </Col>
              <Col xs={24} sm={10} md={10} lg={6} xl={6}>
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
                <QuestionCircleOutlined
                  className="question"
                  onClick={() => setTypeModalOpen(true)}
                />
              </Col>
            </Row>
            <div className="text-right mt-2">
              Make this field required?
              <Switch defaultChecked onChange={(value) => console.log(value)} className="mx-3" />
            </div>
          </Card>

          <Card>
            <p>Enter value(s) for this field:</p>
            <Row>
              <Col xs={8} sm={4} md={4} lg={3} xl={2}>
                Value
              </Col>
              <Col xs={16} sm={10} md={10} lg={15} xl={16} className="mb-1 pr-1">
                <Input placeholder="Enter field value" />
              </Col>
              <Col xs={24} sm={10} md={10} lg={6} xl={6}>
                <MinusCircleOutlined style={{ fontSize: "24px" }} className="mr-1" />
                <PlusCircleOutlined style={{ fontSize: "24px" }} />
              </Col>
            </Row>
          </Card>
        </Panel>
      </Collapse>
      <Modal
        centered
        visible={isTypeModalOpen}
        onCancel={() => setTypeModalOpen(false)}
        footer={null}
        okText=""
      >
        <p className="mt-3">
          You can switch a field type by selecting an option from the dropdown menu. When you switch
          question types, some previously entered data, such as field values and child fields of
          each value (if any) may not be saved.
        </p>
      </Modal>
    </>
  );
};

export default Field;
