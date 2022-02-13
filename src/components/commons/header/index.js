import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const Header = ({ children, subtitle, action, variant = "h3" }) => {
  return (
    <Box mb={2}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant={variant}>{children}</Typography>
        <Box>{action}</Box>
      </Stack>
      {subtitle && <Typography variant="h6">{subtitle}</Typography>}
    </Box>
  );
};
