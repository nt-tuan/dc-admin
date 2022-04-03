import { Box } from "@mui/material";
import { memo } from "react";
import InviteUserButton from "./invite-user-button.comp";
import { InviteUserButtonWrapper, NoUserContainer, NoUserDescription } from "../style.comp";

const NoUsers = () => {
  return (
    <NoUserContainer>
      <Box>
        <NoUserDescription>You have not added any users yet</NoUserDescription>
        <InviteUserButtonWrapper>
          <InviteUserButton />
        </InviteUserButtonWrapper>
      </Box>
    </NoUserContainer>
  );
};

export default memo(NoUsers);
