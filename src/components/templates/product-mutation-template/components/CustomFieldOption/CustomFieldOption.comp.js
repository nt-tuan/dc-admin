import { Checkbox, Input, Radio } from "antd";
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

const CustomFieldOption = memo(
  forwardRef(({ type }, ref) => {
    const [fieldOptions, setFieldOptions] = useState([{ label: "", isError: false }]);
    const [textOptions, setTextOptions] = useState([
      {
        allowInput: "string",
        fieldType: "shortText"
      }
    ]);

    useEffect(() => {
      setFieldOptions([{ label: "", isError: false }]);
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
                      <CustomInput
                        value={field.label}
                        hasError={field.isError}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        addOnBelow={() =>
                          hasChildFields && (
                            <Checkbox className="mt-2">Add child field(s) to this value</Checkbox>
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
                    </div>
                  </div>
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
    }, [type, fieldOptions, handleRemoveField, handleAddField, handleInputChange, textOptions]);

    return renderDynamicFields;
  })
);

export default CustomFieldOption;
