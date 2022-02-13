import { CountryField, PhoneField, TextField } from "components/commons/fields";
import { Form, Formik } from "formik";
import React, { memo } from "react";

import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";

const InformationEdit = memo(({ initialValues, onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <Stack direction="column" spacing={2}>
          <TextField label="First Name" name="firstName" placeholder="First Name" />
          <TextField label="Last Name" name="lastName" placeholder="Last Name" />
          <TextField label="Middle Name" name="middleName" placeholder="Middle Name" />
          <CountryField label="Country" placeholder="Country" name="country" />
          <PhoneField
            countryFieldName="country"
            name="phone"
            label="Phone Number"
            placeholder="Phone Number"
          />
          <Button variant="contained" sx={{ alignSelf: "flex-start" }} type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
});

InformationEdit.propTypes = {
  username: PropTypes.string
};

InformationEdit.defaultProps = {
  username: null // define title
};

export default InformationEdit;
