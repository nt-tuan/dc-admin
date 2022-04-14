import * as React from "react";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

interface Props {
  dataSource: {
    title: string;
    code: number;
  }[];
}
export default function DataTable({ dataSource }: Props) {
  const edit = (code: number) => {};
  const columns = [
    { field: "title", headerName: "Brick Name", width: 70 },
    { field: "code", headerName: "HS Code", width: 130 },
    {
      field: "action",
      headerName: "",
      width: 130,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <IconButton onClick={() => edit(params.row.code)}>
            <EditIcon />
          </IconButton>
        );
      }
    }
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={dataSource}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
