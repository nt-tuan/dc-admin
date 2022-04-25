import * as React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { getBrickEditionPath } from "@/commons/consts/system/routes/pim-route-paths.const";
import {
  Checkbox,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  Table,
  TableBody,
  TableRow,
  TableSortLabel,
  Box
} from "@mui/material";
import Button from "@mui/lab/LoadingButton";
import { visuallyHidden } from "@mui/utils";
import { useDeleteBricks } from "../../libs/use-update-entity";
import DeleteConfirm from "../delete-confirm";
import DeleteFailedAlert from "../delete-failed-alert";
import { ProductBrick } from "@/services/pim.service";

interface Props {
  dataSource: ProductBrick[];
  filter: string;
}
function descendingComparator<T>(a: T, b: T, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return 1;
  });
  return stabilizedThis.map((el) => el[0]);
}

function getComparator<T>(order: "asc" | "desc", orderBy: string) {
  return order === "desc"
    ? (a: T, b: T) => descendingComparator(a, b, orderBy)
    : (a: T, b: T) => -descendingComparator(a, b, orderBy);
}

export default function DataTable({ dataSource, filter }: Props) {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState<boolean>(false);
  const [deleteFailedBrick, setDeleteFailedBrick] = React.useState<string>();
  const { mutate, isLoading } = useDeleteBricks();
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const filteredDataSource = React.useMemo(() => {
    return dataSource.filter(
      (item) =>
        item.code.toLowerCase().includes(filter.toLowerCase()) ||
        item.title.toLowerCase().includes(filter.toLowerCase())
    );
  }, [dataSource, filter]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const isSelected = (code: string) => selected.indexOf(code) !== -1;
  const handleClick = (event: unknown, code: string) => {
    const selectedIndex = selected.indexOf(code);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, code);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredDataSource.map((n) => n.code);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const openDeleteFailAlert = (brickTitle: string) => {
    setDeleteFailedBrick(brickTitle);
  };
  const closeDeleteFailAlert = () => {
    setDeleteFailedBrick(undefined);
  };

  const deleteBricks = () => {
    mutate(selected, {
      onSuccess: closeDeleteConfirm,
      onError: (error: Error) => openDeleteFailAlert(error.message)
    });
  };

  const openDeleteConfirm = () => {
    setDeleteConfirmOpen(true);
  };
  const closeDeleteConfirm = () => {
    setDeleteConfirmOpen(false);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead sx={{ backgroundColor: "grey.100" }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={selected.length > 0 && selected.length < filteredDataSource.length}
                  checked={
                    filteredDataSource.length > 0 && selected.length === filteredDataSource.length
                  }
                  onChange={handleSelectAllClick}
                  inputProps={{
                    "aria-label": "select all desserts"
                  }}
                />
              </TableCell>
              <TableCell padding="none">
                {selected.length > 0 ? (
                  <Button variant="contained" onClick={openDeleteConfirm} loading={isLoading}>
                    Bulk Delete
                  </Button>
                ) : (
                  <TableSortLabel
                    active={orderBy === "title"}
                    direction={orderBy === "title" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "title")}
                  >
                    Brick Name
                    {orderBy === "title" ? (
                      <Box component="span" sx={visuallyHidden as any}>
                        {order === "desc" ? "sorted descending" : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                )}
              </TableCell>
              <TableCell>HS Code</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(filteredDataSource, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.code);
                const labelId = `brick-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.code)}
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
                    <TableCell align="left" component="th" id={labelId} scope="row" padding="none">
                      {row.title}
                    </TableCell>
                    <TableCell align="left">{row.hsCode}</TableCell>
                    <TableCell align="right">
                      <Link to={getBrickEditionPath(row.code)}>
                        <IconButton color="primary">
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredDataSource.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <DeleteConfirm
        isLoading={isLoading}
        open={deleteConfirmOpen}
        onCancel={closeDeleteConfirm}
        onDelete={deleteBricks}
      />
      <DeleteFailedAlert
        brickTitle={deleteFailedBrick}
        open={deleteFailedBrick != null}
        onCancel={closeDeleteFailAlert}
      />
    </div>
  );
}
