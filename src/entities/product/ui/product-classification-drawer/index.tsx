import PageHeader from "@/components/commons/page-header";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Wizard from "./wizard";
import { Segment } from "@/services/pim.service";

interface Props {
  open: boolean;
  onClose: () => void;
  segments: Segment[];
}
export default function ProductClassificationDrawer({ open, onClose, segments }: Props) {
  const handleSuccess = async () => {
    onClose();
  };
  return (
    <div>
      <Drawer PaperProps={{ sx: { width: "80vw" } }} anchor="right" open={open} onClose={onClose}>
        <Stack height="100%" spacing={3} p={5}>
          <PageHeader
            title={
              segments.length === 0
                ? "Create Product Classification"
                : "Product Classification Wizard"
            }
            onBack={onClose}
          />
          <Box height={0} flexGrow={1} sx={{ overflow: "auto" }}>
            <Wizard onSuccess={handleSuccess} />
          </Box>
        </Stack>
      </Drawer>
    </div>
  );
}
