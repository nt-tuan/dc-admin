import { renderHook, act } from "@testing-library/react-hooks";
import useSelectableTable, { stableSort, getComparator } from "./use-selectable-table";

test("stableSort should work", () => {
  expect(stableSort([1, 2, 3, 4, 1], (a, b) => a - b)).toEqual([1, 1, 2, 3, 4]);
});

describe("getComparator should work", () => {
  const testCases = [
    {
      name: "asc",
      orderDir: "asc",
      first: { name: "b" },
      second: { name: "a" },
      expectValue: 1
    },
    {
      name: "asc",
      orderDir: "asc",
      first: { name: "a" },
      second: { name: "b" },
      expectValue: -1
    },
    {
      name: "desc",
      orderDir: "desc",
      first: { name: "a" },
      second: { name: "b" },
      expectValue: 1
    },
    {
      name: "desc",
      orderDir: "desc",
      first: { name: "a" },
      second: { name: "a" },
      expectValue: 0
    }
  ];
  for (const testCase of testCases) {
    test(testCase.name, () => {
      const comparor = getComparator(testCase.orderDir as never, "name");
      expect(comparor(testCase.first, testCase.second)).toEqual(testCase.expectValue);
    });
  }
});

test("useSelectableTable should work", async () => {
  const dataSource = [{ code: "a" }, { code: "b" }];
  const { result } = renderHook((props) => useSelectableTable(props), {
    initialProps: { dataSource }
  });
  expect(result.current.orderBy).toEqual("code");
  await act(async () => {
    result.current.changeRowSelection(undefined, "a");
  });
  expect(result.current.isSelected("a")).toEqual(true);
  await act(async () => {
    result.current.changeRowSelection(undefined, "a");
  });
  expect(result.current.isSelected("a")).toEqual(false);

  await act(async () => {
    result.current.toggleAllSelection({ target: { checked: true } });
  });
  expect(result.current.isSelected("b")).toEqual(true);

  await act(async () => {
    result.current.toggleAllSelection({ target: { checked: false } });
  });
  expect(result.current.isSelected("a")).toEqual(false);
});

test("useSelectableTable should work when reload dataSource", async () => {
  const dataSource = [{ code: "a" }, { code: "b" }];
  const { result, rerender } = renderHook((props) => useSelectableTable(props), {
    initialProps: { dataSource }
  });

  await act(async () => {
    result.current.toggleAllSelection({ target: { checked: true } });
  });
  await act(async () => {
    rerender({
      dataSource: [
        {
          code: "c"
        }
      ]
    });
  });
  expect(result.current.isSelected("a")).toEqual(false);
});

test("useSelectableTable.changeSortOrder should work", async () => {
  const dataSource = [];
  const { result } = renderHook((props) => useSelectableTable(props), {
    initialProps: { dataSource }
  });

  await act(async () => {
    result.current.changeSortOrder({}, "code");
  });
  expect(result.current.order).toEqual("desc");

  await act(async () => {
    result.current.changeSortOrder({}, "code");
  });
  expect(result.current.order).toEqual("asc");
});

test("useSelectableTable.pagination should work", async () => {
  const dataSource = [];
  const { result } = renderHook((props) => useSelectableTable(props), {
    initialProps: { dataSource }
  });

  await act(async () => {
    result.current.pagination.handleChangePage({}, 2);
  });
  expect(result.current.pagination.page).toEqual(2);

  await act(async () => {
    result.current.pagination.handleChangeRowsPerPage({ target: { value: "100" } });
  });
  expect(result.current.pagination.rowsPerPage).toEqual(100);
  expect(result.current.pagination.page).toEqual(0);
});
