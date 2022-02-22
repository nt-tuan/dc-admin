import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { createOTP, validateOTP } from "services/user-profile.service";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DTCModal } from "components/commons";
import Stack from "@mui/material/Stack";
import { THREE_STEPS_SECURITY_STATUS } from "commons/consts";
import { TextField } from "components/commons/fields";
import Typography from "@mui/material/Typography";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { selectUsers } from "redux/user/user.duck";
import { useSelector } from "react-redux";
import { useMessage } from "@/hooks/use-message";

export const PhoneVerifierModal = ({ visible, onCancel, onVerified }) => {
  const users = useSelector(selectUsers);
  const message = useMessage();

  //** Handle Finish  */
  const onFinish = (values, { setFieldError }) => {
    asyncErrorHandlerWrapper(async () => {
      const res = await validateOTP({ code: values.otp });
      if (res && res.status === THREE_STEPS_SECURITY_STATUS.SUCCESS) {
        message.success("Verify successful");
        onVerified();
      } else {
        if (res.status === THREE_STEPS_SECURITY_STATUS.OTP_LOCKED) {
          setFieldError("otp", "OTP is locked");
          return;
        }
        if (res.status === THREE_STEPS_SECURITY_STATUS.OTP_EXPIRED) {
          setFieldError("otp", "OTP is expired");

          return;
        }
        setFieldError("otp", "Incorrect code");
      }
    });
  };

  const sendOPT = React.useCallback(() => {
    asyncErrorHandlerWrapper(async () => {
      await createOTP();
      message.info(`New OTP code was send to ${users.phone}`);
    });
  }, [users.phone, message]);

  useEffect(() => {
    if (visible) {
      sendOPT();
    }
  }, [sendOPT, visible]);

  const onResendVerificationCode = () => {
    sendOPT();
  };

  return (
    <DTCModal
      open={Boolean(visible)}
      title="Enter your verification code"
      onClose={onCancel}
      content={
        <Box>
          <Typography>
            Input the code we sent to <b>{users.phone}</b> to access your account.
          </Typography>
          <Formik initialValues={{ otp: "" }} onSubmit={onFinish}>
            <Form>
              <Stack alignItems="center" direction="row" mt={4} mb={2} spacing={2}>
                <TextField name="otp" placeholder="Enter your code" required />
                <Button variant="text" onClick={onResendVerificationCode}>
                  Resend
                </Button>
              </Stack>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Form>
          </Formik>
        </Box>
      }
    ></DTCModal>
  );
};
