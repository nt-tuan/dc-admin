import React from "react";
import { Formik, Form } from "formik";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import SegmentSelect from "../segment-select";
import FamilySelect from "../family-select";
import { RenderField } from "@/components/commons/fields";
import ClassSelect from "../class-select";

interface BrickValue {
  code?: number;
  title?: string;
  familyCode?: number;
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
                    label="Parent Family"
                    placeholder="Ex: Communications"
                  />
                );
              }}
            </RenderField>
          </Grid>
          <Grid item xs={6}>
            <RenderField>
              {({ getFieldValue }) => {
                const familyCode = getFieldValue("parentFamily");
                return (
                  <ClassSelect
                    familyCode={familyCode}
                    name="parentClass"
                    label="Parent Class"
                    placeholder="Ex: Mobile Communication Devices/Services "
                  />
                );
              }}
            </RenderField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              multiline
              rows={3}
              name="hsCode"
              placeholder="Ex: 85171300, 851713"
              label="HS Code"
            />
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default BrickForm;
