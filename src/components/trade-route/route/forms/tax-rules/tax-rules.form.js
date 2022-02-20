import React, { memo, forwardRef, useState } from "react";
import { Formik, Form } from "formik";
import { TAX_RULES_MAIN_SCHEMA, FIELDS, TAX_RULES_TYPE_MAIN_SCHEMA, typeTAX } from "./tax.chemas";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { SelectField, TextField } from "../../../../commons/fields";
import * as yup from "yup";

export const TradeRouteTaxFormV2 = memo(
  forwardRef(({ dataSource }, ref) => {
    const [showTaxItem, setShowTaxItem] = useState(false);

    const taxMain = TAX_RULES_TYPE_MAIN_SCHEMA[0];
    const taxType = TAX_RULES_MAIN_SCHEMA.find((t) => t.name === FIELDS.type);
    const taxPercent = TAX_RULES_MAIN_SCHEMA.find((t) => t.name === FIELDS.percent);

    const initValues = {
      [taxMain.name]: taxMain.initValue,
      [taxType.name]: taxType.initValue,
      [taxPercent.name]: taxPercent.initValue || ""
    };

    const handleOnChangeTaxMain = (e) => {
      ref.current.setFieldValue(taxMain.name, e.target.value);
      setShowTaxItem(e.target.value === typeTAX.MAIN);
    };

    const validationSchema = showTaxItem
      ? yup.object({
          [taxType.name]: yup.string().nullable().required(`${taxType.label} is required`),
          [taxPercent.name]: yup
            .number()
            .min(0, `The tax percentage min 0`)
            .max(100, "The tax percentage max 100")
            .required(`The tax percentage is required`)
        })
      : yup.object({});

    return (
      <div>
        <h5 className="mt-3">Tax Routes</h5>
        <Formik
          initialValues={initValues}
          validationSchema={validationSchema}
          // onSubmit={() => {}}
          innerRef={ref}
        >
          <Form>
            <FieldRadio taxMain={taxMain} handleOnChangeTaxMain={handleOnChangeTaxMain} />

            {showTaxItem && (
              <>
                <FieldSelect taxType={taxType} />
                <br />
                <FieldInput taxPercent={taxPercent} />
              </>
            )}
          </Form>
        </Formik>
      </div>
    );
  })
);

const FieldInput = ({ taxPercent }) => {
  return <TextField {...taxPercent} type={"number"} style={{ width: 300 }} />;
};

const FieldSelect = ({ taxType }) => {
  return (
    <SelectField style={{ width: 300, marginBottom: 20 }} {...taxType} dataSource={taxType.data} />
  );
};

const FieldRadio = ({ taxMain, handleOnChangeTaxMain }) => {
  return (
    <Grid direction="row" alignItems="center" container spacing={2}>
      <Grid item>
        <Typography>{taxMain.label}</Typography>
      </Grid>
      <Grid item>
        <FormControl>
          <RadioGroup
            row
            name={taxMain.name}
            defaultValue={taxMain.initValue}
            onChange={handleOnChangeTaxMain}
          >
            {taxMain.data.map((radio, key) => (
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
  );
};
