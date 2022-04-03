import { Helmet } from "react-helmet";
import { RouteConst } from "@/commons/consts";
import { useHistory, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { EditUserForm } from "@/components/user-management/edit-user-form.comp";

const EditAdminUser = () => {
  const history = useHistory();
  const { state: user } = useLocation();

  const handleCancel = () => {
    history.goBack();
  };

  const handleSuccess = () => {
    history.push(RouteConst.ADMIN_USER_MANAGEMENT);
  };

  return (
    <article>
      <Helmet title="Edit User" />
      <Box p={3}>
        <Typography variant="h5">Edit User Details</Typography>
        <EditUserForm onCancel={handleCancel} onSuccess={handleSuccess} user={user} />
      </Box>
    </article>
  );
};

export default EditAdminUser;
