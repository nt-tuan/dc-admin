import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export const Property = ({ label, value }) => {
  const title = typeof value === "string" ? value : "";
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box fontWeight="bold">{label}</Box>
      <Box title={title}>{value}</Box>
    </Stack>
  );
};
