import React from "react";
import { Button, Tooltip, Chip } from "@mui/material";
import HoverTax from "components/organisms/route/forms/tax-rules/tax-hover.list.comp";
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
        <div className="d-flex justify-content-end mr-2">
          <Button
            variant="contained"
            className="dtc-min-width-50 mr-2"
            onClick={() => onEditClick(record.id)}
          >
            <i className="fe fe-edit" style={{ verticalAlign: "middle" }}></i>
          </Button>
          <Button
            variant="contained"
            className="dtc-min-width-50 mr-2"
            onClick={() => onDeleteClick(record.id)}
            sx={{ background: "#fb434a !important", "&*hover": { opacity: "0.7" } }}
          >
            <i className="fe fe-trash" style={{ verticalAlign: "middle" }}></i>
          </Button>
        </div>
      )
    }
  ];
};

export const ROUTE_SCHEMA = Object.freeze({
  FIELDS: FIELDS,
  LABELS: LABELS,
  getTableSchema: routeTableSchema
});
