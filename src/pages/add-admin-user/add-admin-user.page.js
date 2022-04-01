import { AddUserForm } from "@/components/user-management/add-user-form.comp";
import { DTCSection } from "@/components/commons";
import { Helmet } from "react-helmet";
import React from "react";
import { RouteConst } from "@/commons/consts";
import { useHistory } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const AddAdminUser = () => {
  const history = useHistory();
  const handleCancel = () => {
    history.goBack();
  };
  const handleSuccess = () => {
    history.push(RouteConst.ADMIN_USER_MANAGEMENT);
  };
  return (
    <article>
      <Helmet title="Add User" />
      <Box p={2}>
        <Typography variant="h5">Add User Details</Typography>
      </Box>
      <DTCSection.Content>
        <AddUserForm onCancel={handleCancel} onSuccess={handleSuccess} />
      </DTCSection.Content>
    </article>
  );
};

export default AddAdminUser;
