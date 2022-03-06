import { Form, Formik } from "formik";
import { PhoneField, RenderField, TextField } from "@/components/commons/fields";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { PhoneOTPModal } from "../phone-otp-modal";
import React from "react";
import Stack from "@mui/material/Stack";
import { usePhoneVerify } from "../../controllers/use-phone-verify";
import { validationSchema } from "./validation.schema";

const Item = ({ children, extra }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box width={416}>{children}</Box>
      {extra}
    </Stack>
  );
};
export const PersonalInformationForm = React.forwardRef(({ data, onSubmit }, ref) => {
  const initialValues = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone
  };
  const {
    isLoading,
    isVerifyingPhone,
    isSubmitting,
    startVerifyingPhone,
    verifyPhone,
    cancelVerifyingPhone
  } = usePhoneVerify();

  return (
    <>
      <Formik
        innerRef={ref}
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form>
          <Stack direction="column" spacing={2}>
            <Item>
              <TextField fullWidth label="First Name" name="firstName" placeholder="First Name" />
            </Item>
            <Item>
              <TextField fullWidth label="Last Name" name="lastName" placeholder="Last Name" />
            </Item>
            <Item>
              <TextField fullWidth disabled label="Email" name="email" placeholder="Email" />
            </Item>
            <RenderField>
              {({ getFieldValue }) => {
                const renderVerifyElement = () => {
                  const currentPhone = getFieldValue("phone");
                  if (!data.phoneVerified && data.phone === currentPhone)
                    return (
                      <Button onClick={startVerifyingPhone} variant="contained">
                        Verify
                      </Button>
                    );
                  if (data.phoneVerified && currentPhone === data.phone) {
                    return <CheckCircleIcon color="success" />;
                  }
                };
                return (
                  <Item extra={renderVerifyElement()}>
                    <PhoneField
                      fullWidth
                      prefixeDisableClearable
                      prefixWidth={112}
                      name="phone"
                      label="Phone Number"
                      placeholder="Phone Number"
                    />
                  </Item>
                );
              }}
            </RenderField>
          </Stack>
        </Form>
      </Formik>
      {isVerifyingPhone && (
        <PhoneOTPModal
          isLoading={isLoading}
          open={isVerifyingPhone}
          onClose={cancelVerifyingPhone}
          onVerify={verifyPhone}
          isSubmitting={isSubmitting}
          phone={data.phone}
        />
      )}
    </>
  );
});
