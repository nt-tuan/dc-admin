import { AppBar } from "./app-bar.comp";
import React from "react";
import { useBreakpoints } from "@/utils/use-breakpoints";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/user/user.duck";
import { Loader } from "@/components/commons";
import { RouteConst } from "@/commons/consts";
import { Redirect } from "react-router-dom";
import * as CONFIGS_DUCK from "@/redux/configs/configs.duck";

export const AuthLayout = ({ children }) => {
  const user = useSelector(selectCurrentUser);
  const { isSmall } = useBreakpoints();
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    setOpen(!isSmall);
  }, [isSmall]);
  const handleToggle = () => {
    setOpen(!open);
  };
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: CONFIGS_DUCK.LOAD_ASSETS });
    dispatch({ type: CONFIGS_DUCK.LOAD_MARKETPLACE_NAME });
  }, [dispatch]);

  if (user.loading) return <Loader />;
  if (!user.authorized) return <Redirect to={RouteConst.LOGIN_ROUTE} />;
  return (
    <Stack sx={{ height: "100%", color: "common.black" }}>
      <AppBar open={open} onToggle={handleToggle} />
      {children}
    </Stack>
  );
};
