import { Form, Formik } from "formik";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { PASSCODE_INVALID } from "commons/consts";
import PassCodeItemForm from "./passcode-item-form";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";

function PassCodeForm({ handleSubmitPassCode }) {
  const { enqueueSnackbar } = useSnackbar();

  //** Handle Submit Form */
  const handleSubmit = ({ passCode, confirmPassCode }) => {
    if (JSON.stringify(passCode) === JSON.stringify(confirmPassCode)) {
      handleSubmitPassCode(passCode);
      return;
    }
    enqueueSnackbar(PASSCODE_INVALID, { variant: "error" });
  };

  return (
    <Box>
      <Typography variant="h5">Select security questions and answers</Typography>
      <Typography mb={4}>
        You have to select and answer questions you have set up to update your passcode
      </Typography>

      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          passCode: Array(6).fill(""),
          confirmPassCode: Array(6).fill("")
        }}
      >
        <Form>
          <Stack spacing={2} direction="column">
            <Grid container columnSpacing={2}>
              <Grid item xs={6}>
                <Typography mb={2} variant="h6">
                  Enter your passcode
                </Typography>
                <PassCodeItemForm name="passCode" characters={[0, 1, 2, 3, 4, 5]} />
              </Grid>
              <Grid item xs={6}>
                <Typography mb={2} variant="h6">
                  Confirm your passcode
                </Typography>
                <PassCodeItemForm name="confirmPassCode" characters={[0, 1, 2, 3, 4, 5]} />
              </Grid>
            </Grid>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </Form>
      </Formik>
    </Box>
  );
}

export default PassCodeForm;
