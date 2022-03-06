import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/lab/LoadingButton";
import { Loader } from "@/components/commons";
import { PageContainer } from "../components/page-container.comp";
import { PersonalInformationForm } from "../components/personal-information-form";
import { PersonalInformationView } from "../components/personal-information-view";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { parseFormValues } from "../components/personal-information-form/mapper";
import { usePersonalInformation } from "../controllers/use-personal-information";

const PersonalInformationPage = () => {
  const { isEdit, data, isLoading, isSubmitting, toEdit, updateProfile } = usePersonalInformation();
  const getAvatarName = () => {
    if (data == null) return null;
    if (data.logoUrl) return null;
    return data.username;
  };
  const handleSubmit = (values) => {
    updateProfile(parseFormValues(ref.current.values));
  };
  const triggerSubmit = () => {
    ref.current.submitForm();
  };

  const ref = React.useRef();
  if (data == null || isLoading) return <Loader />;
  return (
    <Box>
      <PageContainer
        title="Personal Information"
        actions={
          isEdit ? (
            <Button loading={isSubmitting} onClick={triggerSubmit} variant="contained">
              Save
            </Button>
          ) : (
            <Button onClick={toEdit} variant="contained">
              Edit
            </Button>
          )
        }
      >
        <Stack direction="row" alignItems="center" spacing={3}>
          <Avatar sx={{ width: 80, height: 80 }} src={data.logoUrl}>
            {getAvatarName()}
          </Avatar>
          <Typography variant="body2">{data.username}</Typography>
        </Stack>
        {isEdit && <PersonalInformationForm ref={ref} data={data} onSubmit={handleSubmit} />}
        {!isEdit && <PersonalInformationView data={data} />}
      </PageContainer>
    </Box>
  );
};

export default PersonalInformationPage;
