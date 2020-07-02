import { Button } from "antd";
import { useInOutAnimation } from "hooks/useInOutAnimation";
import React, { useEffect, useState } from "react";
import { animated } from "react-spring";

export const withMultiForm = ({
  name,
  onRemoveForm,
  formLimit = null,
  readonlySectionFieldName,
  cantRemoveSectionFieldName
}) => (FormComponent) => {
  const idPrefix = `form-${name}-`;
  let initId = 0;
  const generateId = () => `${idPrefix}${initId++}`;

  return React.memo(
    ({
      title,
      initialValues,
      addBtnText,
      wrappedRef,
      wrapperClass,
      deleteIcon,
      deleteBtnWrapperClass,
      ...restProps
    }) => {
      const [formArr, setFormArr] = useState([]);
      const transitions = useInOutAnimation(formArr, (form) => form.id);
      let formRefArr = [];

      useEffect(() => {
        if (initialValues && initialValues.length) {
          setFormArr(
            initialValues.map((values) => ({
              id: values.id || generateId(),
              Form: FormComponent,
              initialValues: values,
              cantRemove: values[cantRemoveSectionFieldName] || false,
              cantEdit: values[readonlySectionFieldName] || false
            }))
          );
        }
      }, [initialValues]);

      useEffect(() => {
        wrappedRef && wrappedRef(formRefArr);
      }, [wrappedRef, formRefArr]);

      const addForm = () => {
        if (formLimit !== null && formArr.length === formLimit) {
          return;
        }
        setFormArr([
          ...formArr,
          { id: generateId(), Form: FormComponent, initialValues: {}, cantRemove: false }
        ]);
      };

      const removeForm = (id, index) => {
        const target = formArr.find((form) => form.id === id);
        if (target && target.cantRemove === false) {
          setFormArr(formArr.filter((form) => form.id !== id));
          onRemoveForm && onRemoveForm(id, index);
        }
      };

      const renderAddBtn = () => {
        if (formLimit !== null && formArr.length === formLimit) {
          return;
        }
        return addBtnText ? (
          <Button type="primary" onClick={addForm}>
            {addBtnText}
          </Button>
        ) : (
          <Button className="p-0 font-size-18 font-weight-bolder" type="primary" onClick={addForm}>
            <i className="fe fe-plus pl-2 pr-2 mt-1" />
          </Button>
        );
      };

      const renderRemoveBtn = (id, index) => {
        return (
          <div className={`text-right ${deleteBtnWrapperClass}`}>
            <Button
              className="p-0 font-size-18 font-weight-bolder"
              type="primary"
              onClick={() => removeForm(id, index)}
            >
              {deleteIcon || <i className="fe fe-minus pl-2 pr-2 mt-1" />}
            </Button>
          </div>
        );
      };

      return (
        <React.Fragment>
          <h5 className="mb-3 font-weight-bold text-uppercase">{title}</h5>

          {transitions.map(({ item, props, key }, index) => {
            const { Form, initialValues, cantRemove, cantEdit, id } = item;
            return (
              <animated.div key={key} style={props}>
                <div className={wrapperClass}>
                  <Form
                    {...restProps}
                    index={index}
                    editable={!cantEdit}
                    wrappedComponentRef={(form) => (formRefArr = [...formRefArr, form])}
                    initialValues={initialValues}
                  />
                  {formArr.length === 1 || cantRemove ? null : renderRemoveBtn(id, index)}
                </div>
              </animated.div>
            );
          })}

          {renderAddBtn()}
        </React.Fragment>
      );
    }
  );
};
