import { Form, Formik } from "formik";
import React, { useState } from "react";

import Button from "@mui/material/Button";
import { CompanyService } from "services/company.service";
import { DTCModal } from "components/commons";
import Stack from "@mui/material/Stack";
import { TextField } from "components/commons/fields";
import Typography from "@mui/material/Typography";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { useMessage } from "@/hooks/use-message";

export function TwoStepsVerifycation({
  isShowModal2Verify,
  setIsShowModal2Verify,
  email,
  handleUpdateBankDetail
}) {
  const message = useMessage();
  const [isShowFormCode, setIsShowFormCode] = useState(false);

  const handleSendConfirmEmail = () => {
    asyncErrorHandlerWrapper(async () => {
      await CompanyService.sendEmailConfirmBank();
      setIsShowFormCode(true);
    });
  };

  const submit = (values) => {
    asyncErrorHandlerWrapper(async () => {
      try {
        await CompanyService.verifyBankConfirmCode(values.code);
        handleUpdateBankDetail();
      } catch {
        message.error("Invalid Code");
      }
    });
  };
  return (
    <DTCModal
      open={Boolean(isShowModal2Verify)}
      title="2-Steps Verification"
      onClose={() => setIsShowModal2Verify(false)}
      content={
        <>
          {!isShowFormCode && (
            <>
              <Typography>
                Send a verification code to your email <b>{email}</b>
              </Typography>
              <Button variant="contained" onClick={handleSendConfirmEmail}>
                Send
              </Button>
            </>
          )}
          {isShowFormCode && (
            <>
              <Typography>
                Your verification code has been sent to <b>{email}</b>
              </Typography>
              <Formik initialValues={{ code: "" }} onSubmit={submit}>
                <Form>
                  <Stack spacing={2}>
                    <TextField name="code" required placeholder="Enter your code" />
                    <Button type="submit" variant="contained">
                      Verify
                    </Button>
                  </Stack>
                </Form>
              </Formik>
            </>
          )}
        </>
      }
    />
  );
}
