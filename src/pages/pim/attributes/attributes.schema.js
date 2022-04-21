import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { pimRoutePaths } from "@/commons/consts/system/routes/pim-route-paths.const";

const FIELDS = {
  label: "title",
  attributeType: "AttributeType",
  edit: "code"
};

const LABELS = {
  [FIELDS.label]: "Label",
  [FIELDS.attributeType]: "Attributes Type"
};

export const attributeTableColumns = [
  {
    headerName: LABELS[FIELDS.label],
    field: FIELDS.label,
    width: 400
  },
  {
    headerName: LABELS[FIELDS.attributeType],
    field: FIELDS.attributeType,
    width: 400,
    renderCell: () => <span>Dropdown</span> // TODO
  },
  {
    headerName: "",
    field: "code",
    width: 100,
    align: "right",
    renderCell: ({ formattedValue: code }) => (
      <Link to={pimRoutePaths.PRODUCT_ATTRIBUTES_CREATION}>
        <IconButton color="primary">
          <EditIcon />
        </IconButton>
      </Link>
    )
  }
];
