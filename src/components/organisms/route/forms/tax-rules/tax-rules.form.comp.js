import React, { memo, forwardRef, useState, useCallback, useEffect } from "react";
import { Button, Form, Modal } from "antd";
import { createFormErrorComp } from "utils/form.util";
// import { REQUIRED_ERR } from "commons/consts";
// import { isEmpty } from "lodash/isEmpty";
import {
  TAX_RULES_MAIN_SCHEMA,
  FIELDS,
  TAX_RULES_OTHER_SCHEMA,
  TAX_RULES_TYPE_MAIN_SCHEMA,
  TAX_RULES_TYPE_OTHER_SCHEMA,
  typeTAX
} from "./tax.chemas";
import TaxFormItem from "./tax-form-item.comp";
import numeral from "numeral";

export const TaxRulesFrom = memo(
  forwardRef(({ dataSource }, ref) => {
    const [form] = Form.useForm();
    const [isShowPopup, setShowPopup] = useState({
      isShow: false,
      index: null
    });
    // console.log("xxxxxxxxx", dataSource);
    const [dataForm, setDataForm] = useState({ ...dataSource });

    useEffect(() => {
      Object.entries(dataSource).map(([key, valueData]) => {
        valueData.map((val, idx) => {
          let filteredFields = val?.data;
          if (val?.dataFilter) {
            filteredFields = val?.data?.filter((field) => !val?.dataFilter.includes(field?.name));
          }
          filteredFields &&
            filteredFields.map(({ initValue, name }) => {
              const nameForm = `${key}-${name}-${idx}`;
              form.setFieldsValue({ [nameForm]: initValue });
            });
        });
      });
      setDataForm({ ...dataSource });
    }, [dataSource, form]);

    const onAddTax = () => {
      console.log({
        ...dataForm,
        taxOther: [
          ...dataForm.taxOther,
          {
            data: [...TAX_RULES_OTHER_SCHEMA],
            dataFilter: [FIELDS.name]
          }
        ]
      });
      setDataForm({
        ...dataForm,
        taxOther: [
          ...dataForm.taxOther,
          {
            data: [...TAX_RULES_OTHER_SCHEMA],
            dataFilter: [FIELDS.name]
          }
        ]
      });
    };

    const onRemoveTax = (index) => {
      let array = dataForm.taxOther;
      // handleResetFieldRemove(array,index);
      array.splice(index, 1);

      const newArr = [...array];
      if (index === 0 && newArr.length === 0) {
        const fieldName = `taxOther-${FIELDS.applyTypeOther}-${index}`;
        form.setFieldsValue({ [fieldName]: 0 });
        array = [
          {
            data: [...TAX_RULES_TYPE_OTHER_SCHEMA],
            dataFilter: [FIELDS.name]
          }
        ];
      }
      if (index === 0 && newArr.length > 0) {
        newArr[0].data.unshift(TAX_RULES_TYPE_OTHER_SCHEMA[0]);
        array = newArr;
      }
      const dataNew = {
        ...dataForm,
        taxOther: [...array]
      };
      setDataForm(dataNew);
    };
    const togglePopup = (index, bol) => {
      setShowPopup({
        isShow: bol,
        index
      });
    };
    const handleRemoveTax = (index) => {
      const array = dataForm.taxOther[index].data;
      const arrayFilter = dataForm.taxOther[index].data;
      let isEmpty = false;
      const arrayFieldsRequired = [FIELDS.type, FIELDS.taxPayer, FIELDS.lumpSum, FIELDS.percent];
      if (array) {
        array
          .filter((value) => !arrayFilter.includes(value.name))
          .map((item) => {
            const fieldName = `taxOther-${item.name}-${index}`;
            const valueForm = form.getFieldValue(fieldName);
            if (arrayFieldsRequired.includes(item.name) && valueForm) {
              isEmpty = true;
            }
          });
      }
      if (isEmpty) {
        togglePopup(index, true);
      } else {
        onRemoveTax(index);
      }
    };

    //** Handle change field */
    const handleFieldChange = useCallback(
      (name) => {
        const nameParse = name.split("-");
        if (!nameParse && !nameParse.length) return false;
        const applyTypeField = nameParse[0];
        const nameField = nameParse[1];
        const indexField = nameParse[2];

        switch (nameField) {
          case FIELDS.lumpSum:
            return (e) => {
              const value = e.target.value;
              const fieldName = `${applyTypeField}-${FIELDS.lumpSum}-${indexField}`;
              if (!isNaN(value)) {
                form.setFieldsValue({ [fieldName]: `${numeral(value).format("0,0.00")}` });
              }
            };
          case FIELDS.percent:
            return (e) => {
              const value = e.target.value;
              const fieldName = `${applyTypeField}-${FIELDS.percent}-${indexField}`;
              const inputAmount = numeral(value).value();

              if (!isNaN(value) && value.length <= 2) {
                form.setFieldsValue({ [fieldName]: `${numeral(value).format("00.00")}` });
              }
              if (inputAmount < 100) {
                form.setFieldsValue({ [fieldName]: `${numeral(value).format("0.00")}` });
              }
            };
          case FIELDS.type:
            return (value) => {
              const dataNew = { ...dataForm };
              const fieldName = TAX_RULES_MAIN_SCHEMA.find((item) => item.name === FIELDS.name);
              const dataFieldOld = dataForm[applyTypeField][indexField].data;
              const findName = dataFieldOld.find((field) => field.name === FIELDS.name);
              if (!findName) {
                dataFieldOld.push(fieldName);
              }
              const dataUpdate = {
                ...dataForm[applyTypeField][indexField],
                dataFilter: value === "OTHER" ? [] : [FIELDS.name]
              };
              dataNew[applyTypeField][indexField] = dataUpdate;
              setDataForm(dataNew);
            };
          case FIELDS.isLumSum:
            return (e) => {
              const value = e.target.value;
              const data = dataForm.taxOther[indexField].data;
              let isReset = false;
              if (data && data.length) {
                const dataUpdate = data.map((item) => {
                  if (item.name === FIELDS.isLumSum && value === item.initValue) {
                    isReset = true;
                  }
                  if (item.name === FIELDS.percent) {
                    const fieldName = `taxOther-${FIELDS.percent}-${indexField}`;
                    form.setFieldsValue({ [fieldName]: isReset ? item.initValue : null });

                    return {
                      ...item,
                      disabled: value === 1 ? false : true,
                      rules: [
                        {
                          required: value === 1 ? true : false,
                          message: createFormErrorComp("Please enter the tax percentage")
                        },
                        {
                          validator: (rule, value, callback) => {
                            const inputAmount = numeral(value).value();
                            if (inputAmount >= 0 && inputAmount < 100) {
                              return callback();
                            }
                            return callback(createFormErrorComp("The tax percentage max 2 number"));
                          }
                        }
                      ]
                    };
                  } else if (item.name === FIELDS.lumpSum) {
                    const fieldName = `taxOther-${FIELDS.lumpSum}-${indexField}`;
                    form.setFieldsValue({ [fieldName]: isReset ? item.initValue : null });
                    return {
                      ...item,
                      disabled: value === 0 ? false : true,
                      rules: [
                        {
                          required: value === 0 ? true : false,
                          message: createFormErrorComp("Please enter the lump-sum amount")
                        },
                        {
                          validator: (rule, value, callback) => {
                            const inputAmount = numeral(value).value();
                            if (inputAmount <= 0) {
                              return callback(
                                createFormErrorComp("The lump-sum amount must be greater than 0")
                              );
                            }
                          }
                        }
                      ]
                    };
                  } else {
                    return {
                      ...item
                    };
                  }
                });
                const dataNew = { ...dataForm };
                dataNew[applyTypeField][indexField].data = [...dataUpdate];
                setDataForm(dataNew);
              }
            };
          case FIELDS.applyType:
            return (e) => {
              const value = e.target.value;
              const dataNew = {
                ...dataForm.taxMain[indexField],
                data:
                  value === typeTAX.MAIN
                    ? [...dataForm.taxMain[indexField].data, ...TAX_RULES_MAIN_SCHEMA]
                    : [...TAX_RULES_TYPE_MAIN_SCHEMA]
              };

              setDataForm({
                ...dataForm,
                taxMain: [dataNew]
              });
            };
          case FIELDS.applyTypeOther:
            return (e) => {
              const value = e.target.value;
              const dataNew = {
                ...dataForm.taxOther[indexField],
                data:
                  value === typeTAX.OTHERS
                    ? [...dataForm.taxOther[indexField].data, ...TAX_RULES_OTHER_SCHEMA]
                    : [...TAX_RULES_TYPE_OTHER_SCHEMA]
              };
              const fieldName = `taxOther-${FIELDS.isLumSum}-${indexField}`;
              const fieldLumsumName = `taxOther-${FIELDS.lumpSum}-${indexField}`;
              form.setFieldsValue({ [fieldName]: 1 });
              form.setFieldsValue({ [fieldLumsumName]: null });

              setDataForm({
                ...dataForm,
                taxOther: [dataNew]
              });
            };
          default:
            return () => {};
        }
      },
      [dataForm, form]
    );

    return (
      <div>
        <h5 className="mt-3">Tax Routes</h5>
        <Form form={form} ref={ref} key="wrap-tax">
          <div className="row justify-content-between" key="wrap-tax">
            <TaxFormItem
              key="TaxFormItem"
              handleFieldChange={handleFieldChange}
              onRemoveTax={handleRemoveTax}
              dataForm={dataForm}
              form={form}
            />
            <div className="col-12 text-right mt-3">
              <Button
                type="primary"
                disabled={dataForm?.taxOther && dataForm?.taxOther[0]?.data?.length === 1}
                onClick={onAddTax}
              >
                Add another tax/charge
              </Button>
            </div>
          </div>
        </Form>
        {isShowPopup.isShow && (
          <Modal
            visible={isShowPopup}
            onCancel={() => setShowPopup(false)}
            footer={[
              <>
                <Button
                  type="primary"
                  onClick={() => {
                    console.log("index", isShowPopup.index);
                    onRemoveTax(isShowPopup.index);
                    togglePopup(null, false);
                  }}
                >
                  Delete
                </Button>
                <Button type="primary" onClick={() => togglePopup(null, false)}>
                  Cancel
                </Button>
              </>
            ]}
            title="Confirm Deletion"
          >
            Do you want to delete the Tax details ?
          </Modal>
        )}
      </div>
    );
  })
);
