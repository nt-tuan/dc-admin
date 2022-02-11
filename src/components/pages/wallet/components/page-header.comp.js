import Box from "@mui/material/Box";
export const PageHeader = ({ children }) => (
  <Box
    component="h5"
    sx={{
      marginBottom: (theme) => theme.spacing(1),
      color: (theme) => theme.palette.primary.main
    }}
    className="text-capitalize font-weight-bold"
  >
    {children}
  </Box>
);
