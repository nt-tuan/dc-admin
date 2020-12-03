import React, { forwardRef, useCallback, useMemo, useRef, useState } from "react";
import { Collapse, Card, Row, Col, Select, Input, Modal, Switch, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { FIELD_TYPE } from "../../constants";
import ChildFieldModal from "./ChildFieldModal";
import FieldLayout from "./FieldLayout";
import "../../product-mutation-template.comp.scss";
import CustomFieldOption from "../CustomFieldOption/CustomFieldOption.comp";

const { Panel } = Collapse;
const { Option } = Select;

const Field = forwardRef(({ type, onRemove, name, field, fieldKey, remove }, ref) => {
  const [isTypeModalOpen, setTypeModalOpen] = useState(false);
  // const [fieldType, setFieldType] = useState();
  const [isOpenConfirmPopup, setIsOpenConfirmPopup] = useState(false);
  const [isChildModalOpen, setIsChildModalOpen] = useState(false);
  const fieldOptionsRef = useRef();

  // const handleChange = useCallback((value) => {
  //   setFieldType(value);
  // }, []);

  const renderRemoveIcon = useMemo(() => {
    const handleClick = (e) => {
      e.stopPropagation();
      setIsOpenConfirmPopup(true);
    };
    return <i className="fe fe-minus-circle text-danger" onClick={handleClick} />;
  }, []);
  return (
    <>
      {/* <Collapse defaultActiveKey={["1"]}>
        <Panel header="This is panel header 2" extra={renderRemoveIcon} key="2">
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
                    <Option value={type.value} key={type.value}>
                      {type.label}
                    </Option>
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
          {fieldType && (
            <Card>
              <CustomFieldOption type={fieldType} ref={fieldOptionsRef} />
            </Card>
          )}
        </Panel>
      </Collapse> */}
      <FieldLayout {...{ type, setTypeModalOpen, fieldKey, setIsChildModalOpen, remove }} />
      <ChildFieldModal isOpen={isChildModalOpen} closeModal={() => setIsChildModalOpen(false)} />
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
      <Modal
        visible={isOpenConfirmPopup}
        onCancel={() => setIsOpenConfirmPopup(false)}
        onOk={() => onRemove(name)}
        okText="Yes"
        cancelText="No"
        title="Are you sure?"
      >
        If you delete this field, all the data that you entered will be lost.Are you sure you want
        to delete the field
      </Modal>
    </>
  );
});

export default Field;
