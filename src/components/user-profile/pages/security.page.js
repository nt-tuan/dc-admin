import React from "react";
import Box from "@mui/material/Box";
import { ChangePasswordForm } from "../components/change-password-form";
import { PageContainer } from "../components/page-container.comp";
import Typography from "@mui/material/Typography";
import { parseFormValues } from "../components/change-password-form/mapper";
import { useChangePassword } from "../services/use-change-password";

const SecurityPage = () => {
  const ref = React.useRef();
  const { mutate, isLoading } = useChangePassword();
  const submit = (values) => {
    mutate(parseFormValues(values), {
      onSuccess: () => {
        ref.current.resetForm();
      }
    });
  };
  return (
    <PageContainer title="Security">
      <Typography mb={3} variant="h6">
        Password
      </Typography>
      <Box maxWidth={416}>
        <ChangePasswordForm ref={ref} onSubmit={submit} isLoading={isLoading} />
      </Box>
    </PageContainer>
  );
};
export default SecurityPage;
