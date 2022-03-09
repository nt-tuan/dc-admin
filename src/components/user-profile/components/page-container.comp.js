import Box from "@mui/material/Box";
import { Helmet } from "react-helmet";
import { Loader } from "@/components/commons";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const PageContainer = ({ title, actions, children, isLoading }) => {
  return (
    <Stack height="100%" sx={{ overflowX: "auto" }}>
      <Helmet title={title} />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">{title}</Typography>
        <Box>{actions}</Box>
      </Stack>
      {isLoading && (
        <Box height={200}>
          <Loader />
        </Box>
      )}
      {!isLoading && <Box my={4}>{children}</Box>}
    </Stack>
  );
};
