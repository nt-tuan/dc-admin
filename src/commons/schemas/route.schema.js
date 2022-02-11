import { Chip, Tooltip } from "@mui/material";

import Button from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HoverTax from "components/organisms/route/forms/tax-rules/tax-hover.list.comp";
import React from "react";
import Stack from "@mui/material/Stack";

const FIELDS = {
  timestamp: "createdDate",
  categoryName: "categoryName",
  typeName: "typeName",
  to: "toCountry",
  from: "fromCountry",
  hasTaxes: "hasTaxes"
};

const LABELS = {
  [FIELDS.timestamp]: "Timestamp",
  [FIELDS.categoryName]: "Product Category",
  [FIELDS.typeName]: "Product Type",
  [FIELDS.to]: "To",
  [FIELDS.from]: "From",
  [FIELDS.hasTaxes]: "Tax Applied"
};

// active tab
const routeTableSchema = (onEditClick, onDeleteClick) => {
  return [
    {
      headerName: LABELS[FIELDS.timestamp],
      field: FIELDS.timestamp,
      width: 150
    },
    {
      headerName: LABELS[FIELDS.categoryName],
      width: 200,
      field: FIELDS.categoryName
    },
    {
      headerName: LABELS[FIELDS.typeName],
      width: 200,
      field: FIELDS.typeName
    },
    {
      headerName: LABELS[FIELDS.from],
      width: 200,
      field: FIELDS.from
    },
    {
      headerName: LABELS[FIELDS.to],
      field: FIELDS.to,
      width: 150
    },
    {
      headerName: LABELS[FIELDS.hasTaxes],
      field: FIELDS.hasTaxes,
      width: 150,
      align: "center",
      renderCell: ({ row }) => {
        const { hasTaxes, taxDetailResponseList } = row;
        return (
          <>
            {hasTaxes === "Yes" ? (
              <Tooltip
                color="#ffffff"
                title={<HoverTax data={taxDetailResponseList} />}
                placement="top"
              >
                <Chip color="success" label={hasTaxes} />
              </Tooltip>
            ) : (
              <Chip color="error" label={hasTaxes} />
            )}
          </>
        );
      }
    },
    {
      headerName: "Manage",
      field: "Manage",
      width: 200,
      renderCell: (record) => (
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={() => onEditClick(record.id)}>
            <EditIcon />
          </Button>
          <Button variant="contained" color="error" onClick={() => onDeleteClick(record.id)}>
            <DeleteIcon />
          </Button>
        </Stack>
      )
    }
  ];
};

export const ROUTE_SCHEMA = Object.freeze({
  FIELDS: FIELDS,
  LABELS: LABELS,
  getTableSchema: routeTableSchema
});
