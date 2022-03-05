import { AppSideBar } from "./app-side-bar.comp";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ContentLayout } from "./content-layout.comp";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link } from "react-router-dom";
import React from "react";
import { RouteConst } from "@/commons/consts";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getMenuSettingsData } from "./menu-data";

const SettingSideBar = (props) => {
  const { open } = props;
  return (
    <AppSideBar
      {...props}
      header={
        <Stack spacing={1} alignItems={open ? "flex-start" : "center"} mb={2}>
          <Box alignSelf="stretch">
            <Link to={RouteConst.HOME_ROUTE}>
              <Button sx={{ width: "100%" }}>
                <Stack width="100%" px={1} direction="row" spacing={1} justifyContent="start">
                  <KeyboardBackspaceIcon />
                  {open && <Box pl={0.5}>Back</Box>}
                </Stack>
              </Button>
            </Link>
          </Box>

          {open && (
            <Typography px={2} variant="h5">
              Settings
            </Typography>
          )}
        </Stack>
      }
    />
  );
};

export const SettingsLayout = ({ children }) => {
  return (
    <ContentLayout menuData={getMenuSettingsData()} SideBar={SettingSideBar}>
      {children}
    </ContentLayout>
  );
};
