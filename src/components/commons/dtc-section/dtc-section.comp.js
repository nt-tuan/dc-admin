import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import React from "react";
import Typography from "@mui/material/Typography";

export const DTCSection = ({ children, hidden, ...rest }) => {
  if (hidden) return null;
  return (
    <Card {...rest}>
      {children}
      <div />
    </Card>
  );
};

DTCSection.Header = ({ children, actions }) => {
  return (
    <CardHeader
      action={<Box>{actions}</Box>}
      title={
        <Typography
          variant="h5"
          sx={{
            color: (theme) => theme.palette.primary.main
          }}
        >
          {children}
        </Typography>
      }
    />
  );
};
DTCSection.Content = ({ children }) => {
  return <CardContent>{children}</CardContent>;
};
