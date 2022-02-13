import { AppBar } from "./app-bar.comp";
import { AppFooter } from "./app-footer.comp";
import { AppSideBar } from "./app-side-bar.comp";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import { useBreakpoints } from "utils/use-breakpoints";

export const AuthLayout = ({ children }) => {
  const { isSmall } = useBreakpoints();
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    setOpen(!isSmall);
  }, [isSmall]);
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100%" }} alignItems="stretch">
      <CssBaseline />
      <AppBar open={open} onToggle={handleToggle} />
      <AppSideBar open={open} onToggle={handleToggle} onExpand={() => setOpen(true)} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => theme.palette.grey[100],
          flexGrow: 1,
          overflow: "auto"
        }}
      >
        <Toolbar />
        <Container
          flexGrow={1}
          maxWidth={false}
          sx={{ pt: 4, pb: 4, minHeight: "calc(100vh - 120px)" }}
        >
          <Box>{children}</Box>
        </Container>
        <AppFooter />
      </Box>
    </Box>
  );
};
