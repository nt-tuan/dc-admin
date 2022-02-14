import { getCompanyName, getDefaultCurrency } from "./config.util";

import { MARKETPLACE_NAME } from "commons/consts";
import XLSX from "xlsx";
import numeral from "numeral";

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

export const toCurrency = (value, defaultCurrency = "USD") => {
  const currency = getDefaultCurrency() === "USD" ? defaultCurrency : getDefaultCurrency();

  return value !== undefined && !isNaN(value)
    ? currency + " " + numeral(value).format("0,0.00")
    : value;
};

export const convertToUtc = (date) => {
  return new Date(date).toISOString();
};

export const percentage = (value, total, numberFixed) => {
  return ((value / total) * 100).toFixed(numberFixed);
};

export const convertStringToMinutes = (datetime) => {
  const res = datetime.split(":");
  const hourToMinute = res[0] * 60;
  const minute = parseInt(res[1]) + hourToMinute;
  return minute;
};

export const disableLinkClick = (disabled, e) => (disabled ? e.preventDefault() : () => {});

export const objectBasedOnConst = (schema, values) =>
  Object.values(schema).reduce((prev, next, index) => {
    const initObject = () => {
      const newObject = {};
      if (values[prev] !== undefined) {
        newObject[prev] = values[prev];
      }
      if (values[next] !== undefined) {
        newObject[next] = values[next];
      }
      return newObject; //set prev to object with its value
    };
    if (index === 1) {
      return initObject();
    }
    if (values[next] !== undefined) {
      prev[next] = values[next];
    }
    return prev;
  });

export const downloadPdfFromBase64 = (url, name) => {
  const link = document.createElement("a");
  link.download = `${name}.pdf`;
  link.href = url;
  link.click();
  link.remove();
};

export const downloadFromUrl = (url, name) => {
  fetch(url).then(function (fileValue) {
    return fileValue.blob().then((value) => {
      var a = document.createElement("a");
      a.href = URL.createObjectURL(value);
      a.setAttribute("download", name);
      a.click();
    });
  });
};

export const parsePhoneNumber = (phone) => {
  if (phone === undefined) {
    return [];
  }
  if (!phone.includes("+")) {
    return [undefined, phone];
  }
  const phoneArray = phone.split(" ");
  const phonePrefix = phoneArray[0].substring(1);
  const phoneNumber = phoneArray[1];
  return [phonePrefix, phoneNumber];
};

export const setFileInLocalStorage = async (key, value) => {
  var reader = new FileReader();
  reader.onloadend = () => {
    localStorage.setItem(`${key}_CONTENT`, reader.result);
    localStorage.setItem(`${key}_NAME`, value.name);
  };
  await reader.readAsDataURL(value);
};

export const getFileInLocalStorage = async (key) => {
  const base64Str = localStorage.getItem(`${key}_CONTENT`);
  const fileName = localStorage.getItem(`${key}_NAME`);
  if (base64Str) {
    var arr = base64Str.split(","),
      mime = arr[0].match(/:(.*?);/)[1];
    return fetch(base64Str)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], fileName, {
          type: mime
        });
        return file;
      });
  }
  return undefined;
};

export const clearFileInLocalStorage = (key) => {
  localStorage.removeItem(`${key}_NAME`);
  localStorage.removeItem(`${key}_CONTENT`);
};

export const roundToHalfDecimal = (value) => {
  // ex: value: 1.4 => 1.5, 1.2 => 1.0
  if (value) {
    return Math.round(value * 2) / 2;
  }
  return 0;
};

export const roundToDecimalByNumber = (value, numberDecimal) => {
  // ex: value: 1.456; numberDecimal: 1 => 1.4
  if (value) {
    return value.toFixed(numberDecimal);
  }
  return 0;
};

export const areObjectValuesUndefined = (object) => {
  const values = Object.values(object);
  return values.every((v) => v === undefined);
};

export const convertMbToBytes = (mb) => {
  return mb * 1024 * 1024;
};

export const getFileExtension = (filename) => {
  return filename.split(".").pop();
};

export const validateSizeFile = (currentSize, conditionSize) => {
  if (currentSize && currentSize > conditionSize) {
    return "Your file exceeds the maximum upload size for this page (5mb)";
  }
  return "";
};

export const validateExtFile = (currentExt, conditionExt) => {
  if (currentExt && conditionExt.toLowerCase() !== currentExt.toLowerCase()) {
    return "The file format is not supported";
  }
  return "";
};

export const handleDownloadExcel = (data, filename, fileSheet) => {
  if (data.length) {
    const sheet = XLSX.utils.json_to_sheet(data, {
      skipHeader: true
    });
    const excelBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(excelBook, sheet, fileSheet);
    XLSX.writeFile(excelBook, filename, {
      bookType: "xlsx",
      type: "file",
      sheet: fileSheet
    });
  } else {
    // message.info("There is no data");
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

  const res = await serviceFn({
    page: page,
    size: maxSize,
    sort: `${sortTerm},${sortOrder}`,
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
          sort: `${sortTerm},${sortOrder}`,
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

export const toNumber = (value) => {
  return value ? value.toString().replace(/[^\d(\.\d)]/g, "") : "";
};

export const parseProductsFromOrderDetails = (order) => {
  const { productOrderResponses = [] } = order;
  const products = productOrderResponses.map((product) => ({
    id: product.productId,
    url: product.images[0].url,
    name: product.productName,
    quantity: product.quantity,
    totalPrice: product.quantity * product.unitPrice,
    unitPrice: product.unitPrice,
    warranty: product.warranty,
    phoneOperator: product.phoneOperator,
    productCategory: product.productCategory
  }));
  return products;
};

const filterMenuData = (data, exceptionArr) => {
  return data.filter((item) => {
    if (item.children) {
      item.children = item.children.filter((item) => !exceptionArr.includes(item.title));
    }
    return !exceptionArr.includes(item.title);
  });
};

export const getMenuData = (data, isCoopType = false) => {
  const EightCornersException = ["Product Creation"];
  const ExtravaganzaException = ["Traders"];
  const DefaultException = ["Traders", "Product Creation"];
  let menuData = data;
  switch (getCompanyName()) {
    case MARKETPLACE_NAME["8Corners"]: {
      menuData = filterMenuData(menuData, EightCornersException);
      if (!isCoopType) {
        menuData = menuData.filter((item) => !["Traders"].includes(item.title));
      }
      return menuData;
    }

    case MARKETPLACE_NAME.Extravaganza: {
      menuData = filterMenuData(menuData, ExtravaganzaException);
      return menuData;
    }

    default: {
      menuData = filterMenuData(menuData, DefaultException);
      return menuData;
    }
  }
};

export * from "./auth.util";
export * from "./form.util";
export * from "./string.util";
export * from "./sort.util";
export * from "./web-socket.util";
