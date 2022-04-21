import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const OptionsFormEmpty = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Typography>Sorry, you have not created any options for this attribute.</Typography>
      <Button>Add Option</Button>
    </Box>
  );
};

export default OptionsFormEmpty;
