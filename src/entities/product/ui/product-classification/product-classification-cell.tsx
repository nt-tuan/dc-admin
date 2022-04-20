import React from "react";
import TableCell from "./table-cell";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { EntityType } from "../../model/types";
import FolderIcon from "./folder-icon";
import FolderOpenIcon from "./folder-open-icon";

interface Props {
  type: EntityType;
  title: string;
  level: number;
  onClick: () => void;
  expanded: boolean;
  isLoading: boolean;
}
const ProductClassificationCell = ({ type, title, expanded, isLoading, level, onClick }: Props) => {
  const getButtonIcon = () => {
    if (type === "Attribute") return null;
    if (isLoading) return <CircularProgress size={24} />;
    if (expanded) return <FolderOpenIcon />;
    return <FolderIcon />;
  };
  return (
    <TableCell component="th" scope="row">
      <Link
        onClick={onClick}
        underline="none"
        color="inherit"
        sx={{
          ":hover": {
            cursor: "pointer"
          }
        }}
      >
        <Stack direction="row" alignItems="center" paddingLeft={level} spacing={1}>
          <span>{getButtonIcon()}</span>
          <Typography variant="body2">
            {type} {title}
          </Typography>
        </Stack>
      </Link>
    </TableCell>
  );
};

export default ProductClassificationCell;
