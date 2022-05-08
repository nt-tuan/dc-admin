import * as React from "react";
import {
  Checkbox,
  TableContainer,
  TableHead,
  TablePagination,
  Table,
  TableBody,
  TableRow,
  TableSortLabel,
  Box,
  TableCellProps
} from "@mui/material";
import MuiTableCell from "@mui/material/TableCell";
import Button from "@mui/lab/LoadingButton";
import { visuallyHidden } from "@mui/utils";
import useSelectableTable, { getComparator, stableSort } from "../../libs/use-selectable-table";
import { styled } from "@mui/material/styles";

const TableCell = styled(MuiTableCell)({
  height: 52
});
interface ColumnDef<T> {
  props?: TableCellProps;
  header?: React.ReactNode;
  renderCell?: (row: T) => React.ReactNode;
  isLabel?: boolean;
  dataIndex?: keyof T;
  key: string;
}
interface Props<T> {
  dataSource: T[];
  columns: ColumnDef<T>[];
  onDelete: (codes: string[]) => void;
  onRowClick: (row: T) => void;
  isDeleting?: boolean;
}

const getContent = <T extends unknown>(column: ColumnDef<T>, row: T) => {
  if (column.dataIndex) return row[column.dataIndex];
  if (column.renderCell) return column.renderCell(row);
  return null;
};

export default function SelectableEntityTable<T extends { code: string }>({
  dataSource,
  columns,
  onDelete,
  isDeleting,
  onRowClick
}: Props<T>) {
  const {
    selected,
    isSelected,
    order,
    orderBy,
    pagination,
    toggleAllSelection,
    changeSortOrder
  } = useSelectableTable({
    dataSource
  });

  const { page, rowsPerPage, handleChangeRowsPerPage, handleChangePage } = pagination;

  return (
    <div style={{ height: 400, width: "100%" }}>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={selected.length > 0 && selected.length < dataSource.length}
                  checked={dataSource.length > 0 && selected.length === dataSource.length}
                  onChange={toggleAllSelection}
                  inputProps={{
                    "aria-label": "select all desserts"
                  }}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column.key} padding="none">
                  {selected.length > 0 && column.isLabel ? (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => onDelete(selected)}
                      loading={isDeleting}
                    >
                      Bulk Delete
                    </Button>
                  ) : (
                    <TableSortLabel
                      active={orderBy === "title"}
                      direction={orderBy === "title" ? order : "asc"}
                      onClick={(event) => changeSortOrder(event, "title")}
                    >
                      {column.header}
                      {column.header && orderBy === "title" ? (
                        <Box component="span" sx={visuallyHidden as any}>
                          {order === "desc" ? "sorted descending" : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(dataSource, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.code);
                const labelId = `brick-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={() => onRowClick(row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.code}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId
                        }}
                      />
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell
                        align="left"
                        key={column.key}
                        id={column.isLabel ? labelId : undefined}
                        scope="row"
                        padding="none"
                        {...column.props}
                      >
                        {getContent(column, row)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={dataSource.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
