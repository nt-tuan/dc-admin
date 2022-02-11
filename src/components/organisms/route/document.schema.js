import React, { Fragment } from "react";

import Button from "@mui/material/IconButton";
import { DatetimeUtils } from "utils/date-time.util";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import { Tooltip } from "@mui/material";

const FIELDS = {
  createdDate: "createdDate",
  name: "name",
  type: "routeDocumentTypeEnum",
  url: "url",
  countRoutes: "countRoutes"
};

const LABELS = {
  [FIELDS.createdDate]: "Timestamp",
  [FIELDS.name]: "Document Name",
  [FIELDS.type]: "Document Type",
  [FIELDS.url]: "Document Sample",
  [FIELDS.countRoutes]: "Document Linked Routes"
};

// active tab
const getTableSchema = (handleEditClick, handleDeleteClick, isDefaultDocument) => {
  return [
    {
      headerName: LABELS[FIELDS.createdDate],
      field: FIELDS.createdDate,
      valueFormatter: (params) => DatetimeUtils.formatDateTime(params.value),
      width: 150
    },
    {
      headerName: LABELS[FIELDS.name],
      field: FIELDS.name,
      width: 300
    },
    {
      headerName: LABELS[FIELDS.type],
      field: FIELDS.type,
      width: 200
    },
    {
      headerName: LABELS[FIELDS.countRoutes],
      field: FIELDS.countRoutes,
      width: 200
    },
    {
      headerName: "Manage",
      field: "manage",
      sortable: false,
      renderCell: (doc) => (
        <React.Fragment>
          <Stack spacing={1} direction="row">
            <Button disabled={isDefaultDocument(doc)} onClick={() => handleEditClick(doc.id)}>
              <EditIcon />
            </Button>
            <Button
              onClick={() => handleDeleteClick(doc.id)}
              disabled={isDefaultDocument(doc)}
              color="error"
            >
              <DeleteIcon />
            </Button>
            {doc.row.url ? (
              <Tooltip title="Download sample document">
                <Button href={doc.row.url}>
                  <DownloadIcon />
                </Button>
              </Tooltip>
            ) : (
              <Button disabled href={doc.row.url}>
                <DownloadIcon />
              </Button>
            )}
          </Stack>
        </React.Fragment>
      ),
      width: 200
    }
  ];
};

const acceptTypes = {
  PDF: ".pdf",
  XLSX: ".xlsx"
};

const initialFormValue = {
  documentName: "",
  documentType: "",
  sampleFile: {
    name: "",
    originalName: "",
    uid: "",
    url: ""
  }
};

export const DOCUMENT_SCHEMA = Object.freeze({
  FIELDS: FIELDS,
  LABELS: LABELS,
  acceptTypes,
  initialFormValue,
  getTableSchema: getTableSchema
});
