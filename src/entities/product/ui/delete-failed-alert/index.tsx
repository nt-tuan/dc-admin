import { DTCModal } from "@/components/commons";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useModal } from "mui-modal-provider";
import { BulkResponse } from "@/services/pim.service";

interface Props {
  open?: boolean;
  title: string;
  onCancel: () => void;
}
export const useDeleteFailedAlert = ({
  dataSource
}: {
  dataSource: { code: string; title: string }[];
}) => {
  const { showModal: show } = useModal();
  const showModal = (result: BulkResponse) => {
    const failedBricks = dataSource.filter((item) =>
      result.some((resultItem) => resultItem.status !== 204 && resultItem.code === item.code)
    );
    if (failedBricks.length === 0) return;
    const alertModal = show(DeleteFailedAlert, {
      title: failedBricks.map((item) => item.title).join(", "),
      onCancel: () => alertModal?.destroy()
    });
  };
  return { showModal };
};
const DeleteFailedAlert = ({ title, open, onCancel }: Props) => {
  const shortTitle = title?.substring(0, 30) + (title.length >= 30 ? "..." : "");
  return (
    <DTCModal
      size="tiny"
      onClose={onCancel}
      open={open}
      title={<span title={title}>Unable to remove {shortTitle}</span>}
      content={
        <Stack alignItems="center" spacing={2}>
          <Typography variant="body2" textAlign="center">
            This {title} cannot be removed as live Products are associated to it in your
            marketplace.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button size="large" onClick={onCancel} variant="contained">
              Back
            </Button>
          </Stack>
        </Stack>
      }
    />
  );
};

export default DeleteFailedAlert;
