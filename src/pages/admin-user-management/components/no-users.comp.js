import { Box, Typography } from "@mui/material";
import { memo } from "react";
import InviteUserButton from "./invite-user-button.comp";

const NoUsers = () => {
  return (
    <Box height="100vh" display="flex" justifyContent="center">
      <Box paddingTop={4}>
        <Typography>You have not added any users yet</Typography>
        <Box paddingTop={3.75} textAlign="center">
          <InviteUserButton />
        </Box>
      </Box>
    </Box>
  );
};

export default memo(NoUsers);
