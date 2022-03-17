import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
export const Header = ({ header, actions }) => {
  return (
    <Stack direction="row" justifyContent="space-between" mb={4} alignItems="center">
      <Typography variant="h5">{header}</Typography>
      {actions && <Box>{actions}</Box>}
    </Stack>
  );
};
