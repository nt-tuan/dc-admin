import React from "react";
import { Formik, Form } from "formik";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import FamilySelect from "../family-select";
import { RenderField } from "@/components/commons/fields";
import SegmentSelect from "../segment-select";

interface BrickValue {
  code?: number;
  title?: string;
  classCode?: number;
  segmentCode?: number;
}

interface Props {
  onSubmit: (value: BrickValue) => void;
  initialValues: BrickValue;
}

const BrickForm = ({ onSubmit, initialValues }: Props) => {
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
          <Grid item xs={6}>
            <RenderField>
              {({ getFieldValue }) => {
                const segmentCode = getFieldValue("parentSegment");
                return (
                  <FamilySelect
                    segmentCode={segmentCode}
                    name="parentFamily"
                    label="Parent Segment"
                    placeholder="Ex: Communications"
                  />
                );
              }}
            </RenderField>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default BrickForm;
