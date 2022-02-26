import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

export const Loader = ({ spinning = true }) => {
  if (!spinning) return null;
  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <CircularProgress />
    </Box>
  );
};
