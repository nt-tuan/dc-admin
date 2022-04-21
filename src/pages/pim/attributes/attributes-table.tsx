/* eslint-disable */
import * as React from "react";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { DataGrid } from "@mui/x-data-grid";
import { attributeTableColumns } from "./attributes.schema";

const AttributesTable = ({ dataSource, ...rest }) => {
  return <DataGrid {...rest} rows={dataSource} columns={attributeTableColumns} />;
};

export default AttributesTable;
