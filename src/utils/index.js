import XLSX from "xlsx";
import { message } from "antd";

export * from "./auth.util";
export * from "./sort.util";
export * from "./string.util";

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

const parseDataToExcel = (data, labelIndex, LABELS, FIELDS) => {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }
  const parsedDataArray = [Object.keys(labelIndex).map((prop) => LABELS[FIELDS[prop]])];
  data.forEach((item) => {
    let parsedItem = new Array(5);
    Object.keys(item).forEach((prop) => {
      if (labelIndex[prop] !== undefined) {
        parsedItem[labelIndex[prop]] = item[prop];
      }
    });
    parsedDataArray.push(parsedItem);
  });
  return parsedDataArray;
};

export const handleDownloadExcel = (data, labelIndex, LABELS, FIELDS, fileName) => {
  const parsedData = parseDataToExcel(data, labelIndex, LABELS, FIELDS);
  if (parsedData.length) {
    const sheet = XLSX.utils.json_to_sheet(parsedData, {
      skipHeader: true
    });
    const excelBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(excelBook, sheet, "orders");
    XLSX.writeFile(excelBook, `${fileName}.xlsx`, {
      bookType: "xlsx",
      type: "file",
      sheet: fileName
    });
  } else {
    message.info("There is no data");
  }
};
