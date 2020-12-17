import { Checkbox, Input, Radio, Form, Modal } from "antd";
import React, {
  forwardRef,
  Fragment,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState
} from "react";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import every from "lodash/every";
import ChildFieldReview from "../ChildFieldReview/ChildFieldReview.comp";
import { REQUIRED_ERR } from "commons/consts";
import { createFormErrorComp } from "utils/form.util";

const initialFieldOptions = {
  label: "",
  isError: false,
  childField: [
    {
      fieldName: "time of breakfast",
      type: "dropdown",
      fieldOption: [{ label: "6AM" }, { label: "7AM" }, { label: "8AM" }]
    },
    {
      fieldName: "note",
      type: "textbox",
      fieldOption: [
        {
          allowInput: "string",
          fieldType: "shortText"
        }
      ]
    },
    {
      fieldName: "price of breakfast",
      type: "radio",
      fieldOption: [
        { label: "$100 hrhtr erhrtyt erye" },
        { label: "$200 ggw egewew" },
        { label: "$300" }
      ]
    },
    {
      fieldName: "note",
      type: "textbox",
      fieldOption: [
        {
          allowInput: "string",
          fieldType: "longText"
        }
      ]
    }
  ]
};

const CustomFieldOption = memo(
  forwardRef(
    (
      { type, handleRemove, openChildField, childAble, fieldName, childValue, setChildValue },
      ref
    ) => {
      const [fieldOptions, setFieldOptions] = useState([{ ...initialFieldOptions }]);
      const [isOpen, setIsOpen] = useState(false);
      const [deletedField, setDeletedField] = useState({});
      const [deletedIndex, setDeletedIndex] = useState({});
      const [textOptions, setTextOptions] = useState([
        {
          allowInput: "string",
          fieldType: "shortText"
        }
      ]);

      useEffect(() => {
        setFieldOptions([{ ...initialFieldOptions }]);
        setTextOptions([
          {
            allowInput: "string",
            fieldType: "shortText"
          }
        ]);
      }, [type]);

      useImperativeHandle(ref, () => ({
        onValidateFieldOptions: () => {
          if (type !== "textbox") {
            const fieldOptionsClone = [...fieldOptions];
            fieldOptions.forEach((item, index) => {
              if (!item.label) {
                fieldOptionsClone[index].isError = true;
                setFieldOptions(fieldOptionsClone);
              }
            });
            return every(fieldOptions, ["isError", false])
              ? fieldOptions.map((item) => ({ label: item.label }))
              : null;
          } else {
            return textOptions;
          }
        }
      }));
      const handleOK = (func) => {
        setIsOpen(false);
        func();
      };
      const handleDelete = useCallback((fields, field, index) => {
        if (fields.length === 1) return;
        setDeletedField(field);
        setDeletedIndex(index);
        setIsOpen(true);
      }, []);
      const renderDynamicFields = useMemo(() => {
        switch (type) {
          case "dropdown":
          case "radio":
          case "multiDropdown": {
            const hasChildFields = ["dropdown", "radio"].includes(type);
            return (
              <section key={type}>
                <p>Enter values(s) for this field:</p>
                <Form.List name={[fieldName, "fieldOption"]}>
                  {(fields, { add, remove }) => (
                    <>
                      <Modal
                        centered
                        visible={isOpen}
                        onCancel={() => setIsOpen(false)}
                        onOk={() =>
                          handleOK(() => {
                            remove(deletedField.name);
                            handleRemove(deletedIndex);
                          })
                        }
                        okText=""
                      >
                        <p className="mt-3">
                          If you delete value, your entered data will not be saved. Are you sure you
                          want to delete it anyway?
                        </p>
                      </Modal>
                      {fields.map((field, index) => (
                        <div className="row mt-2">
                          <div className="col-3">{`Value ${index + 1}`}:</div>
                          <div className="col-9">
                            <div className="d-flex align-items-center">
                              <Form.Item
                                name={[field.name, "label"]}
                                rules={[
                                  {
                                    required: true,
                                    message: createFormErrorComp(REQUIRED_ERR("option"))
                                  }
                                ]}
                              >
                                <Input placeholder="Enter field value" />
                              </Form.Item>
                              <PlusCircleOutlined className="mx-2" onClick={() => add()} />
                              <MinusCircleOutlined
                                onClick={() => handleDelete(fields, field, index)}
                                // onClick={() => remove(field.name)}
                                style={{ opacity: fieldOptions.length === 1 ? 0.5 : 1 }}
                              />
                            </div>
                            {hasChildFields && childAble && (
                              <>
                                <Checkbox
                                  className="mt-2"
                                  onClick={() => openChildField(index)}
                                  checked={childValue && !!childValue[index]}
                                >
                                  Add child field(s) to this value
                                </Checkbox>
                                {childValue[index] && (
                                  <ChildFieldReview
                                    reOpenModal={() => openChildField(index)}
                                    data={childValue[index]}
                                    onRemove={() => setChildValue(undefined)}
                                  />
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </Form.List>
              </section>
            );
          }
          case "textbox":
            return (
              <section>
                <p>Please choose field's properties:</p>
                <Form.List name={[fieldName, "fieldOption"]}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field, index) => (
                        <>
                          <Form.Item
                            name={[field.name, "allowInput"]}
                            rules={[
                              {
                                required: true,
                                message: createFormErrorComp(REQUIRED_ERR("Allow input"))
                              }
                            ]}
                          >
                            <div className="row">
                              <div className="col-3 font-weight-bold">Allowed input:</div>
                              <Radio.Group className="col-9">
                                <Radio value="string">String</Radio>
                                <Radio value="number">Number</Radio>
                              </Radio.Group>
                            </div>
                          </Form.Item>
                          <Form.Item
                            name={[field.name, "textboxType"]}
                            rules={[
                              {
                                required: true,
                                message: createFormErrorComp(REQUIRED_ERR("Field type"))
                              }
                            ]}
                          >
                            <div className="row mt-2">
                              <div className="col-3 font-weight-bold">Field type:</div>
                              <Radio.Group className="col-9">
                                <Radio value="shortText">Single Texbox (Short text)</Radio>
                                <Radio value="longText">Comment Box (Long text)</Radio>
                              </Radio.Group>
                            </div>
                          </Form.Item>
                        </>
                      ))}
                    </>
                  )}
                </Form.List>
              </section>
            );
          default:
            return;
        }
      }, [
        type,
        fieldOptions,
        childAble,
        openChildField,
        setChildValue,
        fieldName,
        childValue,
        handleDelete,
        isOpen,
        deletedField.name,
        deletedIndex,
        handleRemove
      ]);

      // return renderDynamicFields;
      return <Form.Item>{renderDynamicFields}</Form.Item>;
    }
  )
);

export default CustomFieldOption;
