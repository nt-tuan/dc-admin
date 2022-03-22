import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { DTCModal } from "@/components/commons";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";
import { useMessage } from "@/hooks/use-message";

const ListItem = styled(Typography)({
  listStyleType: "disc",
  display: "list-item"
});

interface Props {
  open?: boolean;
  onClose: () => void;
  onNext: () => void;
  qrCodeUrl: string;
  secretKey: string;
}
export const GASetupModal = ({ open, onClose, onNext, qrCodeUrl, secretKey }: Props) => {
  const message = useMessage();
  const handleCopy = () => {
    navigator.clipboard.writeText(secretKey);
    message.success("Copied!");
  };
  return (
    <DTCModal
      open={open}
      onClose={onClose}
      size="small"
      title={
        <Typography fontSize="16px" lineHeight="24px" variant="inherit" textAlign="center">
          Setup Google Authenticator
        </Typography>
      }
      content={
        <Stack spacing={2} px={2}>
          <ListItem variant="body2">
            Get the Google Authenticator app from the Apple App Store / Google Play Store
          </ListItem>
          <ListItem variant="body2">
            In the <b>App</b>, select <b>Set up account</b>
          </ListItem>
          <ListItem variant="body2">
            Choose <b>Scan barcode</b>
          </ListItem>
          <Stack alignItems="center">
            <img width={100} height={100} src={qrCodeUrl} alt="google qr code" />
          </Stack>
          <ListItem variant="body2">
            If you cannot scan the barcode, please copy and paste the key below in{" "}
            <b>Enter a provided key</b>
          </ListItem>
          <Divider />
          <Stack direction="row" alignItems="center">
            <Box flexGrow={1} sx={{ overflowX: "scroll" }}>
              <ListItem variant="body2" fontWeight="bold">
                {secretKey}
              </ListItem>
            </Box>
            <Button onClick={handleCopy}>
              <ContentCopyIcon />
            </Button>
          </Stack>
          <Divider />
          <ListItem variant="caption">
            <b>Notice:</b> Please save the <b>QR Code</b> or the <b>Secret Key</b> since they will
            help you setting up the Google Authenticator again in case you lose your Google
            Authenticator account or your device.
          </ListItem>
          <Stack direction="row" justifyContent="space-around" spacing={2}>
            <Button variant="contained" color="inherit" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={onNext}>
              Next
            </Button>
          </Stack>
        </Stack>
      }
    />
  );
};
