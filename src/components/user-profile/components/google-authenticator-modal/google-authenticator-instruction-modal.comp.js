import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { DTCModal } from "@/components/commons";
import Divider from "@mui/material/Divider";
import MuiTypography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material";
import { useMessage } from "@/hooks/use-message";

const Typography = styled(MuiTypography)({
  listStyleType: "disc",
  display: "list-item"
});

export const GoogleAuthenticationInstructionModal = ({
  open,
  onClose,
  onNext,
  qrCodeUrl,
  secretKey
}) => {
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
        <Typography variant="inherit" textAlign="center">
          Setup Google Authenticator
        </Typography>
      }
      content={
        <Stack spacing={2} px={2}>
          <Typography variant="body2">
            Get the Google Authenticator app from the Apple App Store / Google Play Store
          </Typography>
          <Typography variant="body2">
            In the <b>App</b>, select <b>Set up account</b>
          </Typography>
          <Typography variant="body2">
            Choose <b>Scan barcode</b>
          </Typography>
          <Stack alignItems="center">
            <img width={100} height={100} src={qrCodeUrl} alt="google qr code" />
          </Stack>
          <Typography variant="body2">
            If you cannot scan the barcode, please copy and paste the key below in{" "}
            <b>Enter a provided key</b>
          </Typography>
          <Divider />
          <Stack direction="row" alignItems="center">
            <Box flexGrow={1} sx={{ overflowX: "scroll" }}>
              <Typography variant="body2" fontWeight="bold">
                {secretKey}
              </Typography>
            </Box>
            <Button onClick={handleCopy}>
              <ContentCopyIcon />
            </Button>
          </Stack>
          <Divider />
          <Typography variant="caption">
            <b>Notice:</b> Please save the <b>QR Code</b> or the <b>Secret Key</b> since they will
            help you setting up the Google Authenticator again in case you lose your Google
            Authenticator account or your device.
          </Typography>
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
