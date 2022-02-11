import { DataGrid } from "@mui/x-data-grid";
import React from "react";

export const DTCTable = ({ dataSource, columns, ...rest }) => {
  return <DataGrid {...rest} rows={dataSource} columns={columns} />;
};
