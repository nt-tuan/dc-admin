import React from "react";
import { Box, Typography } from "@mui/material";
import SearchEmailInput from "./search-email-input.comp";
import InviteUserButton from "./invite-user-button.comp";
import { HeaderContainer, HeaderSearchInputContainer } from "../style.comp";

const AdminUserManagementHeader = ({ haveUsers, email = "", onSearchEmail = {} }) => {
  return (
    <HeaderContainer>
      <Typography variant="h5">Users</Typography>
      {haveUsers && (
        <HeaderSearchInputContainer>
          <SearchEmailInput value={email} onChange={onSearchEmail} />
          <Box sx={{ paddingTop: { xs: 2, sm: 0 } }}>
            <InviteUserButton />
          </Box>
        </HeaderSearchInputContainer>
      )}
    </HeaderContainer>
  );
};

export default React.memo(AdminUserManagementHeader);
