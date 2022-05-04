import React from "react";

interface useSelectableTableProps<T> {
  dataSource: T[];
}
const useSelectableTable = <T extends { code: string }>({
  dataSource
}: useSelectableTableProps<T>) => {
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const isSelected = (code: string) => selected.indexOf(code) !== -1;
  const changeRowSelection = (event: unknown, code: string) => {
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
  const toggleAllSelection = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataSource.map((n) => n.code);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const changeSortOrder = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  React.useEffect(() => {
    setSelected((current) => {
      return current.filter((currentItem) =>
        dataSource.some((sourceItem) => sourceItem.code === currentItem)
      );
    });
  }, [dataSource]);

  return {
    order,
    orderBy,
    selected,
    pagination: { page, rowsPerPage, handleChangeRowsPerPage, handleChangePage },
    isSelected,
    changeRowSelection,
    toggleAllSelection,
    changeSortOrder
  };
};
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
export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
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

export function getComparator<T>(order: "asc" | "desc", orderBy: string) {
  return order === "desc"
    ? (a: T, b: T) => descendingComparator(a, b, orderBy)
    : (a: T, b: T) => -descendingComparator(a, b, orderBy);
}
export default useSelectableTable;
