import { PhoneOTPModal } from "@/components/auth/components/phone-otp-modal";
import { DTCModal, Loader } from "@/components/commons";
import { PhoneField } from "@/components/commons/fields";
import Button from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";

import { useUpdateProfile, useUserProfile } from "../../services/use-user-profile";
import { useNewPhoneVerifier } from "../personal-information-form/use-new-phone-verifier";

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
const validationSchema = yup.object({
  phone: yup.string().required().matches(phoneRegExp, "Please enter a valid phone number")
});

export const PhoneFormModal = ({ open, onClose, onUpdated = undefined }) => {
  const { data, isLoading } = useUserProfile();
  const { mutate, isLoading: isUpdating } = useUpdateProfile({
    onSuccess: () => {
      if (onUpdated) onUpdated();
    }
  });
  const submit = (values) => {
    const { phone } = values;
    const { firstName, lastName } = data;
    mutate({
      phone,
      firstName,
      lastName
    });
  };
  return (
    <DTCModal
      size="tiny"
      onClose={onClose}
      open={open}
      title={
        <Typography variant="inherit" alignItems="center">
          Phone Number
        </Typography>
      }
      content={
        <Stack spacing={2}>
          <Typography variant="body2">
            Please add your phone number for verification to update your notification preference.
          </Typography>
          {isLoading && <Loader />}
          {data && (
            <>
              <Formik
                initialValues={{ phone: data.phone }}
                validationSchema={validationSchema}
                onSubmit={submit}
                onValuesChange
              >
                <Form>
                  <Stack spacing={2}>
                    <PhoneField name="phone" label="Phone Number" placeholder="Phone Number" />
                    <Button
                      sx={{ alignSelf: "center" }}
                      loading={isUpdating || isLoading}
                      variant="contained"
                      type="submit"
                    >
                      Verify
                    </Button>
                  </Stack>
                </Form>
              </Formik>
            </>
          )}
        </Stack>
      }
    />
  );
};

export const AddPhoneModal = ({ open, onClose, onVerify }) => {
  const { data } = useUserProfile();
  const {
    isLoading: isLoadingVerifyingPhone,
    isVerifyingPhone,
    isSubmitting,
    startVerifyingPhone,
    verifyPhone,
    cancelVerifyingPhone
  } = useNewPhoneVerifier({ onSuccess: onVerify, phone: data.phone });
  const closeOTP = () => {
    cancelVerifyingPhone();
    onClose();
  };
  if (!open) return <></>;
  return (
    <>
      <PhoneFormModal onClose={onClose} open={open} onUpdated={startVerifyingPhone} />
      {isVerifyingPhone && (
        <PhoneOTPModal
          open={isVerifyingPhone}
          onClose={closeOTP}
          phone={data.phone}
          isSubmitting={isSubmitting}
          onVerify={verifyPhone}
          isLoading={isLoadingVerifyingPhone}
        />
      )}
    </>
  );
};
