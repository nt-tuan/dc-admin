import Box from "@mui/material/Box";
import { ChangePasswordForm } from "../components/change-password-form";
import { PageContainer } from "../components/page-container.comp";
import { parseFormValues } from "../components/change-password-form/mapper";
import { useChangePassword } from "../services/use-change-password";

const SecurityPage = () => {
  const { mutate, isLoading } = useChangePassword();
  const submit = (values) => {
    mutate(parseFormValues(values));
  };
  return (
    <PageContainer title="Security">
      <Box maxWidth={416}>
        <ChangePasswordForm onSubmit={submit} isLoading={isLoading} />
      </Box>
    </PageContainer>
  );
};
export default SecurityPage;
