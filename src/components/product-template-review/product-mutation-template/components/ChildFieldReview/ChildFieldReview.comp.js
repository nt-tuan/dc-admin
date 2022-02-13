import { Collapse, Input, Radio, Select } from "antd";
import React, { memo, useCallback, useMemo, useState } from "react";

import Modal from "antd/lib/modal/Modal";
import { getLagecyModalContainer } from "components/lagecy/lagecy.comp";

// import "./ChildFieldReview.comp.scss";

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
            <Select className="mt-2" getPopupContainer={getLagecyModalContainer}>
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
          <div className="childFieldReview" key={fieldName}>
            <div className="col-3 text-capitalize">{fieldName}</div>
            <Radio.Group className="childFieldReview">
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
        <Collapse.Panel header="Child fields review" key="1" extra={renderRemoveIcon}>
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
        title="Remove all child fields"
      >
        <p className="mb-0">If you proceed, all entered field data will be lost.</p>
        <p>Are you sure you want to delete all child fields?</p>
      </Modal>
    </>
  );
});

export default ChildFieldReview;
