import React, { memo } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { DTCSection } from "components/commons";
import PersonIcon from "@mui/icons-material/Person";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ProfileCard = memo((props) => {
  const { title, avatarSrc, successfulTransactions } = props;

  return (
    <DTCSection>
      <Box position="relative">
        <Stack
          height={150}
          sx={{ background: "linear-gradient(45deg,#005691,#f4f7f6)" }}
          alignItems="center"
          justifyContent="center"
        >
          <Typography fontSize={24} color="white" fontWeight="bold">
            {title}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          height={150}
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ textAlign: "center" }}
        >
          <Stack spacing={1} alignItems="center" justifyContent="center">
            <Typography component="span" variant="h4">
              {successfulTransactions ?? 0}
            </Typography>
            <Typography>
              <b> Successful Transactions</b>
            </Typography>
          </Stack>
          <Stack spacing={1} alignItems="center" justifyContent="center">
            <Typography component="span" variant="h4">
              {successfulTransactions ?? 0}
            </Typography>
            <Typography>
              <b> Successful Transactions</b>
            </Typography>
          </Stack>
        </Stack>
        <Stack
          sx={{ transform: "translate(-50%, -50%)" }}
          position="absolute"
          left="50%"
          top="50%"
          alignItems="center"
          justifyContent="center"
        >
          <Avatar sx={{ width: 100, height: 100 }} src={avatarSrc}>
            <PersonIcon sx={{ width: 80, height: 80 }} />
          </Avatar>
        </Stack>
      </Box>
    </DTCSection>
  );
});

export default ProfileCard;
