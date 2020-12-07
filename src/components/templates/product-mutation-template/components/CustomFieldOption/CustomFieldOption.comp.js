import { Checkbox, Input, Radio, Form } from "antd";
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
import CustomInput from "../CustomInput/CustomInput.comp";
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
  forwardRef(({ type, setIsChildModalOpen, childAble }, ref) => {
    const [fieldOptions, setFieldOptions] = useState([{ ...initialFieldOptions }]);
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

    const handleRemoveChildField = useCallback(
      (index) => {
        const fieldOptionsClone = [...fieldOptions];
        delete fieldOptionsClone[index].childField;
        setFieldOptions(fieldOptionsClone);
      },
      [fieldOptions]
    );

    const handleAddField = useCallback(
      (index) => {
        const fieldsClone = [...fieldOptions];
        const firstPart = fieldsClone.slice(0, index + 1);
        const secondPart = fieldsClone.slice(index + 1);

        secondPart.unshift({ label: "" });
        setFieldOptions(firstPart.concat(secondPart));
      },
      [fieldOptions]
    );

    const handleRemoveField = useCallback(
      (index) => {
        const fieldsClone = [...fieldOptions];
        fieldsClone.splice(index, 1);
        setFieldOptions(fieldsClone);
      },
      [fieldOptions]
    );

    const handleInputChange = useCallback(
      (index, value) => {
        const fieldsClone = [...fieldOptions];
        fieldsClone[index] = { label: value, isError: false };
        setFieldOptions(fieldsClone);
      },
      [fieldOptions]
    );

    const renderDynamicFields = useMemo(() => {
      switch (type) {
        case "dropdown":
        case "radio":
        case "multiDropdown": {
          const hasChildFields = ["dropdown", "radio"].includes(type);
          return (
            <section key={type}>
              <p>Enter values(s) for this field:</p>
              {fieldOptions.map((field, index) => (
                <Fragment key={index}>
                  <div className="row mt-2">
                    <div className="col-3">{`Value ${index + 1}`}:</div>
                    <div className="col-9">
                      <Form.Item
                        name={"childValue"}
                        rules={[
                          {
                            required: true,
                            message: createFormErrorComp(REQUIRED_ERR("Value"))
                          }
                        ]}
                      >
                        <CustomInput
                          value={field.label}
                          hasError={field.isError}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                          addOnBelow={() =>
                            hasChildFields &&
                            childAble && (
                              <Checkbox className="mt-2" onClick={() => setIsChildModalOpen(true)}>
                                Add child field(s) to this value
                              </Checkbox>
                            )
                          }
                          addOnAfter={() => (
                            <>
                              <PlusCircleOutlined
                                className="mx-2"
                                onClick={() => handleAddField(index)}
                              />
                              <MinusCircleOutlined
                                onClick={
                                  fieldOptions.length === 1
                                    ? undefined
                                    : () => handleRemoveField(index)
                                }
                                style={{ opacity: fieldOptions.length === 1 ? 0.5 : 1 }}
                              />
                            </>
                          )}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  {/* {field.childField && (
                    <ChildFieldReview
                      data={field.childField}
                      onRemove={() => handleRemoveChildField(index)}
                    />
                  )} */}
                </Fragment>
              ))}
            </section>
          );
        }
        case "textbox":
          return (
            <section>
              <p>Please choose field's properties:</p>
              <div className="row">
                <div className="col-3 font-weight-bold">Allowed input:</div>
                <Radio.Group
                  className="col-9"
                  value={textOptions[0].allowInput}
                  onChange={(e) =>
                    setTextOptions([{ ...textOptions[0], allowInput: e.target.value }])
                  }
                >
                  <Radio value="string">String</Radio>
                  <Radio value="number">Number</Radio>
                </Radio.Group>
              </div>
              <div className="row mt-2">
                <div className="col-3 font-weight-bold">Field type:</div>
                <Radio.Group
                  className="col-9"
                  value={textOptions[0].fieldType}
                  onChange={(e) =>
                    setTextOptions([{ ...textOptions[0], fieldType: e.target.value }])
                  }
                >
                  <Radio value="shortText">Single Texbox (Short text)</Radio>
                  <Radio value="longText">Comment Box (Long text)</Radio>
                </Radio.Group>
              </div>
            </section>
          );
        default:
          return;
      }
    }, [
      type,
      fieldOptions,
      handleRemoveField,
      handleAddField,
      handleInputChange,
      textOptions,
      handleRemoveChildField
    ]);

    return renderDynamicFields;
  })
);

export default CustomFieldOption;
