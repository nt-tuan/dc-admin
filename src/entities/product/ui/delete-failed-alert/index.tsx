import { DTCModal } from "@/components/commons";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface Props {
  open?: boolean;
  brickTitle?: string;
  onCancel: () => void;
}
const DeleteFailedAlert = ({ brickTitle, open, onCancel }: Props) => {
  return (
    <DTCModal
      size="tiny"
      onClose={onCancel}
      open={open}
      title={`Unable to remove ${brickTitle}`}
      content={
        <Stack alignItems="center" spacing={2}>
          <Typography variant="body2" textAlign="center">
            This {brickTitle} cannot be removed as live Products are associated to it in your
            marketplace.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button onClick={onCancel} variant="contained">
              Back
            </Button>
          </Stack>
        </Stack>
      }
    />
  );
};

export default DeleteFailedAlert;
