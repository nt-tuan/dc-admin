import { AppSideBar } from "./app-side-bar.comp";
import Box from "@mui/material/Box";
import React from "react";
import Stack from "@mui/material/Stack";
import { useBreakpoints } from "@/utils/use-breakpoints";

export const ContentLayout = ({ children, SideBar = AppSideBar, menuData, ...props }) => {
  const { isSmall } = useBreakpoints();
  const [open, setOpen] = React.useState(!isSmall);
  const handleToggle = () => setOpen((current) => !current);
  React.useEffect(() => {
    if (isSmall) {
      setOpen(false);
    }
  }, [isSmall]);
  return (
    <Stack direction="row" flexGrow={1} overflow="hidden" alignItems="stretch" {...props}>
      <SideBar
        open={open}
        onToggle={handleToggle}
        onExpand={() => setOpen(true)}
        menuData={menuData}
      />
      <Box
        sx={{
          backgroundColor: "common.white",
          flexGrow: 1,
          overflowY: "auto"
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};
