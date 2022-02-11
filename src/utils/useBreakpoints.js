import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";

export const useBreakpoints = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const isMedium = useMediaQuery(theme.breakpoints.between("md", "xl"));
  const isLarge = useMediaQuery(theme.breakpoints.up("xl"));
  return { isSmall, isMedium, isLarge };
};
