import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { RouteConst } from "commons/consts";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const ForgotPasswordSuccessPage = () => {
  const location = useLocation();
  const email = location.state?.email;
  return (
    <Box component="article" ml={3} mr={5}>
      <Helmet title="Forgot Password Success" />
      <p>
        We've sent a link to <b>{email}</b> to help you reset your password
      </p>
      <p>
        <Link to={RouteConst.LOGIN_ROUTE}>
          <Button variant="contained">Return to Login</Button>
        </Link>
      </p>
    </Box>
  );
};

export default ForgotPasswordSuccessPage;
