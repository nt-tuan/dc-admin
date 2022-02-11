import React from "react";
import Typography from "@mui/material/Typography";
import { getTermsAndConditionVersion } from "utils/config.util";

export const AppFooter = () => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ py: 2, backgroundColor: "common.white" }}
    >
      Version: {getTermsAndConditionVersion()}
    </Typography>
  );
};
