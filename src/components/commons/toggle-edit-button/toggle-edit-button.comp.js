import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

export const ToggleEditButton = ({ isEdit, onClick }) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      size="small"
      sx={{ padding: 0.5, minWidth: 0, color: "grey.600", borderColor: "grey.600" }}
    >
      {isEdit ? <CloseIcon /> : <EditIcon />}
    </Button>
  );
};
