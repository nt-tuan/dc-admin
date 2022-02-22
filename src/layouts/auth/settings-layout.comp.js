import React from "react";
import { getMenuSettingsData } from "./menu-data";
import { ContentLayout } from "./content-layout.comp";
import { AppSideBar } from "./app-side-bar.comp";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { RouteConst } from "@/commons/consts";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const SettingSideBar = (props) => {
  const { open } = props;
  return (
    <AppSideBar
      {...props}
      header={
        <Stack spacing={1} alignItems={open ? "flex-start" : "center"}>
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
            <Typography px={2} variant="h3">
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
