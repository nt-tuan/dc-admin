/* eslint-disable */
import * as React from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import MuiTableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import { useProductClassificationContext } from "./provider";
import TableCell from "./table-cell";
import TableRow from "./table-row";

const ProductClassificationTableHead = () => {
  const { changeCheckbox } = useProductClassificationContext();
  return (
    <TableHead>
      <MuiTableRow sx={{ backgroundColor: "grey.100" }}>
        <TableCell colSpan={12}>
          <Stack direction="row" alignItems="center">
            <Checkbox onChange={(e) => changeCheckbox(undefined, e.target.checked)} />
            <Typography variant="body2">Select all</Typography>
          </Stack>
        </TableCell>
      </MuiTableRow>
    </TableHead>
  );
};
const ProductClassificationTable = () => {
  const { getNodes } = useProductClassificationContext();
  const nodes = React.useMemo(() => {
    return getNodes();
  }, [getNodes]);
  return (
    <Box height="100%" overflow="auto">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <ProductClassificationTableHead />
        <TableBody>
          {nodes.map((node) => (
            <TableRow key={node.code} data={node} level={0} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ProductClassificationTable;
