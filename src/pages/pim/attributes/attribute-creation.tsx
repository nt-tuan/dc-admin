import { Form, Formik } from "formik";
import { SelectField, TextField } from "@/components/commons/fields";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { Loader } from "@/components/commons";

const AttributesCreation = ({ onSubmit, isLoading }) => {
  if (isLoading)
    return (
      <Box height={200}>
        <Loader />
      </Box>
    );
  return (
    <Formik initialValues={{ type: "dropdown" }} onSubmit={onSubmit}>
      <Form>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              required
              name="code"
              label="Attribute Code"
              fieldConfig={{}}
              placeholder="|Ex: 20002603"
            />
          </Grid>
          <Grid item xs={8} />
          <Grid item xs={4}>
            <TextField
              fullWidth
              required
              name="title"
              label="Label"
              fieldConfig={{}}
              placeholder="Ex: Input Registration"
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={4}>
            <SelectField
              fullWidth
              required
              disabled
              name="type"
              dataSource={[{ label: "Simple Select Dropdown", value: "dropdown" }]}
              label="Attribute Type*"
            />
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default AttributesCreation;
