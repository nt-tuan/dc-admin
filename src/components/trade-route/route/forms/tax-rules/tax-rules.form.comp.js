import {
  FIELDS,
  RULES_LUMSUM_FORMAT,
  RULES_PERCENT_FORMAT,
  TAX_RULES_MAIN_SCHEMA,
  TAX_RULES_TYPE_MAIN_SCHEMA,
  typeTAX
} from "./tax.chemas";
import React, { forwardRef, memo, useCallback, useEffect, useState } from "react";

import { Form } from "antd";
import TaxFormItem from "./tax-form-item.comp";
import { createFormErrorComp } from "utils/form.util";
import numeral from "numeral";
import { useFormik } from "formik";

export const TradeRouteTaxForm = memo(
  forwardRef(({ dataSource }, ref) => {
    const [form] = Form.useForm();
    const [dataForm, setDataForm] = useState({ ...dataSource });

    const formikProps = useFormik({
      initialValues: {}
      // validationSchema: {},
      // onSubmit: () => {}
    });

    const handleSetValueForm = useCallback(
      (dataSource) => {
        Object.entries(dataSource).map(async ([key, valueData]) => {
          valueData.map((val, idx) => {
            let filteredFields = val?.data;
            if (val?.dataFilter) {
              filteredFields = val?.data?.filter((field) => !val?.dataFilter.includes(field?.name));
            }
            filteredFields &&
              filteredFields.map(async ({ initValue, name }) => {
                const nameForm = `${key}-${name}-${idx}`;

                if (
                  (name === FIELDS.lumpSum && initValue != null) ||
                  (name === FIELDS.percent && initValue != null)
                ) {
                  initValue = numeral(initValue).format("0,0.00");
                }
                form.setFieldsValue({ [nameForm]: initValue });
                await formikProps.setFieldValue(nameForm, initValue);
              });
          });
        });
      },
      [form]
    );

    useEffect(() => {
      handleSetValueForm(dataSource);
      setDataForm({ ...dataSource });
    }, [dataSource, form, handleSetValueForm]);

    const handleUpdateIntValue = (data, value, field) => {
      if (!data) return;
      return data.map((item) =>
        item.name === field
          ? {
              ...item,
              initValue: value
            }
          : item
      );
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
              // const fieldName = `${applyTypeField}-${FIELDS.lumpSum}-${indexField}`;
              // if (!isNaN(value)) {
              //   form.setFieldsValue({ [fieldName]: `${numeral(value).format("0,0.00")}` });
              // }
              // if (!isNaN(value) && value.length <= 2) {
              //   form.setFieldsValue({ [fieldName]: `${numeral(value).format("00.00")}` });
              // }
              // if (inputAmount < 100) {
              //   form.setFieldsValue({ [fieldName]: `${numeral(value).format("0.00")}` });
              // }
              const dataNew = { ...dataForm };
              const dataUpdate = handleUpdateIntValue(
                dataForm[applyTypeField][indexField].data,
                value,
                FIELDS.lumpSum
              );
              dataNew[applyTypeField][indexField].data = dataUpdate;
              setDataForm(dataNew);
            };
          case FIELDS.name:
            return (e) => {
              const value = e.target.value;
              const dataNew = { ...dataForm };
              const dataUpdate = handleUpdateIntValue(
                dataForm[applyTypeField][indexField].data,
                value,
                FIELDS.name
              );
              dataNew[applyTypeField][indexField].data = dataUpdate;
              setDataForm(dataNew);
            };
          case FIELDS.percent:
            return (e) => {
              const value = e.target.value;
              // const fieldName = `${applyTypeField}-${FIELDS.percent}-${indexField}`;
              // const inputAmount = numeral(value).value();

              const dataNew = { ...dataForm };
              const dataUpdate = handleUpdateIntValue(
                dataForm[applyTypeField][indexField].data,
                value,
                FIELDS.percent
              );
              dataNew[applyTypeField][indexField].data = dataUpdate;
              setDataForm(dataNew);
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

              const dataN = handleUpdateIntValue(
                dataForm[applyTypeField][indexField].data,
                value,
                FIELDS.type
              );
              const dataUpdate = {
                ...dataForm[applyTypeField][indexField],
                dataFilter: value === "OTHER" ? [] : [FIELDS.name],
                data: dataN
              };
              dataNew[applyTypeField][indexField] = dataUpdate;

              setDataForm(dataNew);
            };
          case FIELDS.taxPayer:
            return (value) => {
              const dataNew = { ...dataForm };
              const dataN = handleUpdateIntValue(
                dataForm[applyTypeField][indexField].data,
                value,
                FIELDS.taxPayer
              );
              const dataUpdate = {
                ...dataForm[applyTypeField][indexField],
                data: dataN
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
                  if (item.name === FIELDS.isLumSum) {
                    if (value === item.initValue) {
                      isReset = true;
                    }
                    return {
                      ...item,
                      initValue: value
                    };
                  }
                  if (item.name === FIELDS.percent) {
                    const fieldName = `taxOther-${FIELDS.percent}-${indexField}`;
                    const valueFi = isReset ? item.initValue : null;
                    form.setFieldsValue({ [fieldName]: valueFi });
                    let rule = [];
                    if (value === 1) {
                      rule = [
                        {
                          required: true,
                          message: createFormErrorComp("Please enter the tax percentage")
                        },
                        RULES_PERCENT_FORMAT
                      ];
                    }
                    return {
                      ...item,
                      disabled: value === 1 ? false : true,
                      initValue: valueFi,
                      rules: rule
                    };
                  } else if (item.name === FIELDS.lumpSum) {
                    const fieldName = `taxOther-${FIELDS.lumpSum}-${indexField}`;
                    const valueFi = isReset ? item.initValue : null;
                    form.setFieldsValue({ [fieldName]: valueFi });
                    return {
                      ...item,
                      disabled: value !== 0,
                      initValue: valueFi,
                      rules: [
                        {
                          required: value === 0,
                          message: createFormErrorComp("Please enter the lump-sum amount")
                        },
                        RULES_LUMSUM_FORMAT
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
              const dataN = handleUpdateIntValue(dataNew.data, value, FIELDS.applyType);
              dataNew.data = dataN;

              setDataForm({
                ...dataForm,
                taxMain: [dataNew]
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
              dataForm={dataForm}
              form={form}
              // formikProps={formikProps}
            />
          </div>
        </Form>
      </div>
    );
  })
);
