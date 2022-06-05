import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const OptionsFormEmpty = ({ onSetLayoutReady }: { onSetLayoutReady: () => void }) => {
  return (
    <Stack justifyContent="center" alignItems="center" direction="column" spacing={2}>
      <Typography>Sorry, you have not created any options for this attribute.</Typography>
      <Button variant="contained" onClick={onSetLayoutReady}>
        Add Option
      </Button>
    </Stack>
  );
};

export default OptionsFormEmpty;
