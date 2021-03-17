import React, { useCallback, useState } from "react";
import { Checkbox, Input, Radio, Form, Modal } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { REQUIRED_ERR } from "commons/consts";
import { createFormErrorComp } from "utils/form.util";
import ChildFieldReview from "../ChildFieldReview/ChildFieldReview.comp";

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

const CustomFieldOption = (props) => {
  const { type, openChildField, canAddChildFields, fieldName, form, fieldIndex } = props;
  const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false);
  const [deletedField, setDeletedField] = useState({});
  const formName = Object.keys(form.getFieldsValue())[0];

  const handleOK = (func) => {
    setShowDeleteConfirmPopup(false);
    func();
  };

  const handleDelete = useCallback((fields, field) => {
    if (fields.length === 1) return;
    setDeletedField(field);
    setShowDeleteConfirmPopup(true);
  }, []);

  const handleRemoveAllChildFields = useCallback(
    (fieldOptionIndex, children) => {
      const newFormValues = form.getFieldsValue();
      const fieldId = children[0].parentId;
      const formName = Object.keys(newFormValues)[0];
      newFormValues[formName][fieldId].fieldOption[fieldOptionIndex].childField = undefined;
      form.setFieldsValue(newFormValues);
    },
    [form]
  );

  const renderDynamicFields = useCallback(() => {
    switch (type) {
      case "dropdown":
      case "radio":
      case "multiDropdown": {
        const childFieldsAllowed = ["dropdown", "radio"].includes(type);
        return (
          <section>
            <p>Enter values(s) for this field:</p>
            <Form.List name={[fieldName, "fieldOption"]}>
              {(fields, { add, remove }) => {
                return (
                  <>
                    {fields.map((field, index) => {
                      return (
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
                              <PlusCircleOutlined
                                className="mx-2"
                                disabled={true}
                                onClick={() => {
                                  if (type === "radio" && fields.length === 3) return;
                                  add();
                                }}
                              />
                              <MinusCircleOutlined
                                onClick={() => handleDelete(fields, field)}
                                style={{ opacity: fields.length === 1 ? 0.5 : 1 }}
                              />
                            </div>
                            {childFieldsAllowed && canAddChildFields && (
                              <>
                                <Checkbox
                                  className="mt-2"
                                  onClick={() => openChildField(index)}
                                  checked={
                                    form.getFieldsValue()[formName][fieldIndex].fieldOption[index]
                                      ?.childField || false
                                  }
                                >
                                  Add child field(s) to this value
                                </Checkbox>
                                {form.getFieldsValue()[formName][fieldIndex].fieldOption[index]
                                  ?.childField && (
                                  <ChildFieldReview
                                    data={
                                      form.getFieldsValue()[formName][fieldIndex].fieldOption[index]
                                        .childField
                                    }
                                    onRemove={() =>
                                      handleRemoveAllChildFields(
                                        index,
                                        form.getFieldsValue()[formName][fieldIndex].fieldOption[
                                          index
                                        ].childField
                                      )
                                    }
                                  />
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    <Modal
                      centered
                      visible={showDeleteConfirmPopup}
                      onCancel={() => setShowDeleteConfirmPopup(false)}
                      onOk={() =>
                        handleOK(() => {
                          remove(deletedField.name);
                        })
                      }
                    >
                      <p className="mt-4 mb-0">Your entered data will not be saved.</p>
                      <p>Are you sure you want to delete it anyway?</p>
                    </Modal>
                  </>
                );
              }}
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
                      <div className="row">
                        <div className="col-3 font-weight-bold">Allowed input:</div>
                        <div className="col-9">
                          <Form.Item
                            name={[field.name, "allowInput"]}
                            rules={[
                              {
                                required: true,
                                message: createFormErrorComp(REQUIRED_ERR("Allow input"))
                              }
                            ]}
                          >
                            <Radio.Group className="w-100">
                              <Radio value="string">String</Radio>
                              <Radio value="number">Number</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-3 font-weight-bold">Field type:</div>
                        <div className="col-9">
                          <Form.Item
                            name={[field.name, "textboxType"]}
                            rules={[
                              {
                                required: true,
                                message: createFormErrorComp(REQUIRED_ERR("Field type"))
                              }
                            ]}
                          >
                            <Radio.Group className="w-100">
                              <Radio value="shortText">Single Texbox (Short text)</Radio>
                              <Radio value="longText">Comment Box (Long text)</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </div>
                      </div>
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
    canAddChildFields,
    deletedField.name,
    fieldIndex,
    fieldName,
    form,
    formName,
    handleDelete,
    handleRemoveAllChildFields,
    openChildField,
    showDeleteConfirmPopup,
    type
  ]);

  return <Form.Item>{renderDynamicFields()}</Form.Item>;
};

export default CustomFieldOption;
