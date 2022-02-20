import React from "react";
import { Form } from "antd";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";

function TaxFormItem({ handleFieldChange, dataForm, onRemoveTax, form, formikProps }) {
  const renderTaxRules = () => {
    return Object.entries(dataForm).map(([key, valueData]) => {
      if (valueData && valueData?.length) {
        return valueData.map((val, idx) => {
          let filteredFields = val?.data;
          if (val?.dataFilter) {
            filteredFields = val?.data?.filter((field) => !val?.dataFilter.includes(field?.name));
          }
          return (
            <>
              {filteredFields &&
                filteredFields.map(
                  (
                    {
                      label,
                      name,
                      type,
                      placeholder,
                      rules,
                      data,
                      classNames,
                      disabled,
                      or,
                      hidden,
                      initValue
                    },
                    index
                  ) => {
                    const nameForm = `${key}-${name}-${idx}`;

                    switch (type) {
                      case "radio":
                        return (
                          <Grid
                            key={`${nameForm} ${index}`}
                            direction="row"
                            alignItems="center"
                            container
                            spacing={2}
                          >
                            <Grid item>
                              <Typography>{label}</Typography>
                            </Grid>
                            <Grid item>
                              <FormControl>
                                <RadioGroup
                                  row
                                  name={nameForm}
                                  defaultValue={initValue}
                                  onChange={handleFieldChange(nameForm)}
                                >
                                  {data &&
                                    data.map((radio, key) => (
                                      <FormControlLabel
                                        key={`name-${key}`}
                                        value={radio.value}
                                        control={<Radio />}
                                        label={radio.name}
                                      />
                                    ))}
                                </RadioGroup>
                              </FormControl>
                            </Grid>
                          </Grid>
                          // <div key={`${nameForm} ${index}`} className="col-md-12">
                          //   <Form.Item
                          //     name={nameForm}
                          //     label={label}
                          //     className={`${classNames ? "col-12" : ""}`}
                          //   >
                          //     <Radio.Group
                          //       defaultValue={initValue}
                          //       className={`${
                          //         classNames ? "row justify-content-between" : "d-inline"
                          //       }`}
                          //       onChange={handleFieldChange(nameForm)}
                          //     >
                          //       {data &&
                          //         data.map((radio, key) => (
                          //           <Radio
                          //             key={`name-${key}`}
                          //             value={radio.value}
                          //             style={{ width: `${classNames ? "" : "auto"}` }}
                          //           >
                          //             {radio.name}
                          //           </Radio>
                          //         ))}
                          //     </Radio.Group>
                          //   </Form.Item>
                          // </div>
                        );
                      // case "select":
                      //   const formSelectType = (
                      //     <Form.Item
                      //       key={`${nameForm} ${index}`}
                      //       label={label}
                      //       className="col-6"
                      //       name={nameForm}
                      //       rules={[...rules]}
                      //       labelCol={{ span: 24 }}
                      //     >
                      //       <Select
                      //         placeholder={placeholder}
                      //         onChange={handleFieldChange(nameForm)}
                      //       >
                      //         {data &&
                      //           data.map((item) => (
                      //             <Option key={item.label} value={item.value}>
                      //               {item.label}
                      //             </Option>
                      //           ))}
                      //       </Select>
                      //     </Form.Item>
                      //   );
                      //   return (
                      //     <>
                      //       {dataForm[key][idx].dataFilter.length !== 0 ? (
                      //         <div className="w-100" key={`${nameForm} ${index}-1`}>
                      //           {formSelectType}
                      //         </div>
                      //       ) : (
                      //         formSelectType
                      //       )}
                      //     </>
                      //   );
                      case "select":
                        const formSelectType = (
                          <Form.Item
                            key={`${nameForm} ${index}`}
                            label={label}
                            className="col-6"
                            name={nameForm}
                            rules={[...rules]}
                            labelCol={{ span: 24 }}
                          >
                            <Select
                              style={{ width: 300 }}
                              placeholder={placeholder}
                              onChange={handleFieldChange(nameForm)}
                            >
                              {data &&
                                data.map((item) => (
                                  <MenuItem key={item.label} value={item.value}>
                                    {item.label}
                                  </MenuItem>
                                ))}
                            </Select>
                          </Form.Item>
                          // <SelectField
                          //   autoWidth
                          //   key={`${nameForm} ${index}`}
                          //   name={nameForm}
                          //   label={label}
                          //   placeholder="From"
                          //   dataSource={data}
                          // />
                        );
                        return (
                          <>
                            {dataForm[key][idx].dataFilter.length !== 0 ? (
                              <div className="w-100" key={`${nameForm} ${index}-1`}>
                                {formSelectType}
                              </div>
                            ) : (
                              formSelectType
                            )}
                          </>
                        );

                      default:
                        return (
                          <>
                            <TextField
                              style={{ marginTop: 20 }}
                              key={`${nameForm} ${index}`}
                              sx={{ maxWidth: 500 }}
                              name={nameForm}
                              label={label}
                              placeholder={placeholder}
                            />
                            {/*<Form.Item*/}
                            {/*  key={`${nameForm} ${index}`}*/}
                            {/*  label={label}*/}
                            {/*  className={`${or && or !== "" ? "col-5" : "col-6"}`}*/}
                            {/*  name={nameForm}*/}
                            {/*  rules={[...rules]}*/}
                            {/*  labelCol={{ span: 24 }}*/}
                            {/*>*/}
                            {/*  <Input*/}
                            {/*    style={{ width: 300 }}*/}
                            {/*    hidden={hidden}*/}
                            {/*    disabled={disabled}*/}
                            {/*    onBlur={(e) => handleFormatNumber(nameForm, e.target.value, name)}*/}
                            {/*    suffix={`${name === FIELDS.percent ? "%" : ""}`}*/}
                            {/*    placeholder={placeholder}*/}
                            {/*    onChange={handleFieldChange(nameForm)}*/}
                            {/*  />*/}
                            {/*</Form.Item>*/}

                            {or && <span>{or}</span>}
                          </>
                        );
                    }
                  }
                )}
            </>
          );
        });
      }
    });
  };

  return <>{renderTaxRules()}</>;
}

export default TaxFormItem;
