import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { BankPathEnum } from "../bank-path.enum";
import { Link } from "react-router-dom";

export const BankEmpty = () => {
  return (
    <Box p={3}>
      <Typography variant="h5">Banking</Typography>
      <Box pt={5}>
        <Stack alignItems="center" spacing={3}>
          <Typography variant="body2">You have not saved any bank accounts</Typography>
          <Link to={BankPathEnum.NEW_BANK}>
            <Button variant="contained">Add bank account</Button>
          </Link>
        </Stack>
      </Box>
    </Box>
  );
};
