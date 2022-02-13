import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import React from "react";
import { RouteConst } from "commons/consts";
import Typography from "@mui/material/Typography";
const Error404Page = () => (
  <>
    <Helmet title="Page 404" />
    <Box pl={2}>
      <Typography variant="h3">Page not found</Typography>
      <Typography variant="subtitle1">
        This page is deprecated, deleted, or does not exist at all
      </Typography>
      <Typography variant="h1">404</Typography>
      <Link to={`${RouteConst.HOME_ROUTE}`}>
        <Button>Go Back</Button>
      </Link>
    </Box>
  </>
);

export default Error404Page;
