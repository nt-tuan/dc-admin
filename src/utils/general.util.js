import XLSX from "xlsx";
import { message } from "antd";

export const isScreensize = (size) => {
  let _isTrue = false;
  switch (size) {
    case "xs":
      _isTrue = window.outerWidth < 400 ? true : false;
      break;
    case "sm":
      _isTrue = window.outerWidth < 768 ? true : false;
      break;
    case "md":
      _isTrue = window.outerWidth < 992 ? true : false;
      break;
    case "lg":
      _isTrue = window.outerWidth < 1200 ? true : false;
      break;
    case "xl":
      _isTrue = window.outerWidth >= 1200 ? true : false;
      break;
    default:
      break;
  }
  return _isTrue;
};

export const getPrefixUrl = (pathname) => {
  if (pathname.includes("/") === false) {
    return pathname;
  }
  const firstUrlSegment = pathname.split("/")[1];
  return firstUrlSegment ? "/" + firstUrlSegment : "/";
};

export const removeIdPartFromProductUrl = (str) => {
  if (str) {
    const parts = str.split("--");
    return parts[0];
  }
  return str;
};

export const getIdPartFromProductUrl = (str) => {
  if (str) {
    const parts = str.split("--");
    return parts[1] ? parts[1] : str;
  }
  return str;
};

export const disableLinkClick = (disabled, e) => (disabled ? e.preventDefault() : () => {});

export const roundToHalfDecimal = (value) => {
  // ex: value: 1.4 => 1.5, 1.2 => 1.0

  if (value) {
    return Math.round(value * 2) / 2;
  }

  return 0;
};

export const handleDownloadExcel = (dataExcel, fileName, fileSheet) => {
  if (dataExcel.length) {
    const sheet = XLSX.utils.json_to_sheet(dataExcel, {
      skipHeader: true
    });
    const excelBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(excelBook, sheet, fileSheet);
    XLSX.writeFile(excelBook, `${fileName}.xlsx`, {
      bookType: "xlsx",
      type: "file",
      sheet: fileSheet
    });
  } else {
    message.info("There is no data");
  }
};

export const getAllRecordsFromAPI = async (
  serviceFn,
  options = {
    outerParams: null,
    sortTerm: null,
    sortOrder: null
  }
) => {
  const { outerParams, sortTerm, sortOrder } = options;
  const maxSize = 2000;
  let page = 0;
  const sort = sortTerm && sortOrder ? `${sortTerm},${sortOrder}` : null;

  const res = await serviceFn({
    page: page,
    size: maxSize,
    sort: sort,
    ...outerParams
  });

  let allDataRes = { ...res };

  if (res) {
    const { totalElements } = res;
    if (totalElements > maxSize) {
      let remainElements = totalElements - maxSize;
      while (true) {
        page = page + 1;
        const remainRes = await serviceFn({
          size: remainElements > maxSize ? maxSize : remainElements,
          page,
          sort: sort,
          ...outerParams
        });
        allDataRes = { ...allDataRes, content: [...allDataRes.content, ...remainRes.content] };
        remainElements = remainElements - maxSize;
        if (remainElements <= 0) {
          break;
        }
      }
    }
  }

  return allDataRes.content;
};

export const toCurrency = (value, defaultCurrency = `$ `) => {
  const currency =
    process.env.REACT_APP_DEFAULT_CURRENCY_TYPE === "USD"
      ? defaultCurrency
      : process.env.REACT_APP_DEFAULT_CURRENCY_TYPE;
  return value !== undefined && !isNaN(value) ? currency + Number(value).toLocaleString() : value;
};

export const toNumber = (value) => {
  return value ? value.toString().replace(/[^\d(\.\d)]/g, "") : "";
};

export const areObjectValuesUndefined = (object) => {
  const values = Object.values(object);
  return values.every((v) => v === undefined);
};
