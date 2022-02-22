import { AppSideBar } from "./app-side-bar.comp";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import { useBreakpoints } from "@/utils/use-breakpoints";

export const ContentLayout = ({ children, SideBar = AppSideBar, menuData }) => {
  const { isSmall } = useBreakpoints();
  const [open, setOpen] = React.useState(!isSmall);
  const handleToggle = () => setOpen((current) => !current);
  React.useEffect(() => {
    if (isSmall) {
      setOpen(false);
    }
  }, [isSmall]);
  return (
    <Stack direction="row" flexGrow={1} overflow="hidden">
      <SideBar
        open={open}
        onToggle={handleToggle}
        onExpand={() => setOpen(true)}
        menuData={menuData}
      />
      <Box
        component="main"
        sx={{
          backgroundColor: "common.white",
          flexGrow: 1,
          overflowY: "auto"
        }}
      >
        <Toolbar />
        <Container maxWidth={false} sx={{ pt: 4, pb: 4, minHeight: "calc(100vh - 120px)" }}>
          <Box>{children}</Box>
        </Container>
      </Box>
    </Stack>
  );
};
