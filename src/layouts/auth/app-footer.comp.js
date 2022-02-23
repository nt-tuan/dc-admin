import React from "react";
import Typography from "@mui/material/Typography";
import { getAppVersion } from "utils/config.util";
import { useBreakpoints } from "@/utils/use-breakpoints";

export const AppFooter = ({ collapse }) => {
  const { isSmall } = useBreakpoints();
  return (
    <Typography
      variant="body2"
      align="left"
      color="grey.500"
      px={2}
      title={`Version: ${getAppVersion()}`}
      sx={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }}
    >
      {isSmall || collapse ? "" : "Version: "}
      {getAppVersion()}
    </Typography>
  );
};
