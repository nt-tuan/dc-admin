import Box from "@mui/material/Box";

export const MainContainer = ({ children }) => {
  return (
    <Box p={3} height="100%">
      {children}
    </Box>
  );
};
