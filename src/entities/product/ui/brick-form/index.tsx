import React from "react";
import { Form, FormikProps } from "formik";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import SegmentSelect from "../segment-select";
import FamilySelect from "../family-select";
import { RenderField, TextField } from "@/components/commons/fields";
import ClassSelect from "../class-select";

export interface BrickFormValue {
  code: string;
  title: string;
  familyCode: string;
  classCode: string;
  segmentCode: string;
  hsCode: string;
}

interface Props {
  gridColumns?: number;
}

const isNullOrEmpty = (value: string | null | undefined) => value == null || value === "";

const BrickForm = React.forwardRef(
  ({ gridColumns = 12 }: Props, ref: React.RefObject<FormikProps<BrickFormValue>>) => {
    return (
      <Form>
        <Grid container spacing={3} columns={gridColumns}>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              name="code"
              label="Brick Code"
              placeholder="Ex: 10001198 or Mobile Phones"
              fieldConfig={{}}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              name="title"
              label="Brick Name"
              placeholder="Ex: Mobilephone/Smartphones"
              fieldConfig={{}}
            />
          </Grid>
          <Grid item xs={6}>
            <Box width="100%">
              <SegmentSelect
                required
                name="segmentCode"
                label="Parent Segment"
                placeholder="Ex: Communications"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <RenderField>
              {({ getFieldValue }) => {
                const segmentCode = getFieldValue("segmentCode");
                return (
                  <FamilySelect
                    required
                    segmentCode={segmentCode}
                    disabled={isNullOrEmpty(segmentCode)}
                    name="familyCode"
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
                const familyCode = getFieldValue("familyCode");
                return (
                  <ClassSelect
                    required
                    familyCode={familyCode}
                    disabled={isNullOrEmpty(familyCode)}
                    name="classCode"
                    label="Parent Class"
                    placeholder="Ex: Mobile Communication Devices/Services "
                  />
                );
              }}
            </RenderField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              name="hsCode"
              placeholder="Ex: 85171300, 851713"
              label="HS Code"
              fieldConfig={{}}
            />
          </Grid>
        </Grid>
      </Form>
    );
  }
);

export default BrickForm;
