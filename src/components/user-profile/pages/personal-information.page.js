import { Loader } from "@/components/commons";
import Button from "@mui/lab/LoadingButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

import { PageContainer } from "../components/page-container.comp";
import { PersonalInformationForm } from "../components/personal-information-form";
import { PersonalInformationView } from "../components/personal-information-view";
import { usePersonalInformation } from "../controllers/use-personal-information";

const UserIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.87"
        strokeWidth="2"
        d="M33.333 35v-3.333A6.667 6.667 0 0026.667 25H13.332a6.667 6.667 0 00-6.667 6.667V35M20 18.333A6.667 6.667 0 1020 5a6.667 6.667 0 000 13.333z"
      ></path>
    </svg>
  );
};

const PersonalInformationPage = () => {
  const { isEdit, data, isLoading, isSubmitting, toEdit, updateProfile } = usePersonalInformation();
  const handleSubmit = () => {
    updateProfile(ref.current.values);
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
          <Avatar sx={{ width: 80, height: 80, backgroundColor: "grey.100" }} src={data.logoUrl}>
            {!data.logoUrl && (
              <Box color="common.black">
                <UserIcon />
              </Box>
            )}
          </Avatar>
          <Typography variant="body2">{data.username}</Typography>
        </Stack>
        <Box mt={4}>
          {isEdit && <PersonalInformationForm ref={ref} data={data} onSubmit={handleSubmit} />}
          {!isEdit && <PersonalInformationView data={data} />}
        </Box>
      </PageContainer>
    </Box>
  );
};

export default PersonalInformationPage;
