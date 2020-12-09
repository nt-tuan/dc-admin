import { Collapse, Input, Radio, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { memo, useCallback, useMemo, useState } from "react";

const sample = [
  {
    fieldName: "custom child field 1",
    type: "dropdown",
    fieldOption: [
      { label: "child label 1" },
      { label: "child label 2" },
      { label: "child label 3" }
    ]
  }
];

const ChildFieldReview = memo(({ onRemove, data }) => {
  const [isOpenConfirmPopup, setIsOpenConfirmPopup] = useState(false);

  const handleRemove = useCallback(() => {
    onRemove();
    setIsOpenConfirmPopup(false);
  }, [onRemove]);

  const renderRemoveIcon = useMemo(() => {
    const handleClick = (e) => {
      e.stopPropagation();
      setIsOpenConfirmPopup(true);
    };
    return <i className="fe fe-minus-circle text-danger" onClick={handleClick} />;
  }, []);

  const renderChildField = useCallback((fieldName, type, options) => {
    switch (type) {
      case "multiDropdown":
      case "dropdown":
        return (
          <div className="col-12 col-xl-6 my-2" key={fieldName}>
            <div className="text-capitalize">{fieldName}</div>
            <Select className="mt-2">
              {options.map((opt) => (
                <Select.Option value={opt.label} key={opt.label}>
                  {opt.label}
                </Select.Option>
              ))}
            </Select>
          </div>
        );
      case "radio":
        return (
          <div className="col-12 row my-2" key={fieldName}>
            <div className="col-3 text-capitalize">{fieldName}</div>
            <Radio.Group className="col-9 row">
              {options.map((opt) => (
                <Radio value={opt.label} key={opt.label} className="col-3">
                  {opt.label}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        );
      case "textbox":
        return (
          <div
            className={`${options[0].type === "shortText" ? "col-6 my-2" : "col-9 my-2"}`}
            key={fieldName}
          >
            <div className="text-capitalize">{fieldName}</div>
            {options[0].type === "shortText" ? (
              <Input className="mt-2" />
            ) : (
              <Input.TextArea className="mt-2" />
            )}
          </div>
        );
      default:
        return;
    }
  }, []);

  return (
    <>
      <Collapse defaultActiveKey={["1"]} className="my-3">
        <Collapse.Panel header="Child field review" key="1" extra={renderRemoveIcon}>
          <div className="row">
            {data?.map(({ fieldName, type, fieldOption }) =>
              renderChildField(fieldName, type, fieldOption)
            )}
          </div>
        </Collapse.Panel>
      </Collapse>
      <Modal
        visible={isOpenConfirmPopup}
        onCancel={() => setIsOpenConfirmPopup(false)}
        onOk={handleRemove}
        okText="Yes"
        cancelText="No"
        title="Cancel child field?"
      >
        If you cancel this window, the data will not be saved.Are you sure you want to cancel
      </Modal>
    </>
  );
});

export default ChildFieldReview;
