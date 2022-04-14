import React from "react";
import { Formik, Form } from "formik";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import SegmentSelect from "../segment-select";

interface FamilyValue {
  code?: number;
  title?: string;
  segmentCode?: number;
}

interface Props {
  onSubmit: (value: FamilyValue) => void;
  initialValues: FamilyValue;
}

const ClassForm = ({ onSubmit, initialValues }: Props) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <Grid container>
          <Grid item xs={6}>
            <TextField name="code" label="Brick Code" placeholder="Ex: 10001198 or Mobile Phones" />
          </Grid>
          <Grid item xs={6}>
            <TextField name="name" label="Brick Name" placeholder="Ex: Mobilephone/Smartphones" />
          </Grid>
          <Grid item xs={6}>
            <SegmentSelect
              name="parentSegment"
              label="Parent Segment"
              placeholder="Ex: Communications"
            />
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default ClassForm;
