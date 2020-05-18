import {
  BID_STATUS,
  ORDER_PROCESS,
  ORDER_STATUS,
  ORDER_STATUS_LABEL,
  ORDER_PROCESS_LABEL
} from "commons/consts";
import domtoimage from "dom-to-image";
import moment from "moment-timezone";

export * from "./auth.util";
export * from "./string.util";
export * from "./sort.util";
export * from "./web-socket.util";

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

export const toCurrency = (value) => {
  return value !== undefined && !isNaN(value) ? "$ " + Number(value).toLocaleString() : value;
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

const optionsDownload = (elm, scale) => {
  return {
    bgcolor: "#ffffff",
    height: elm.offsetHeight * scale,
    width: elm.offsetWidth * scale,
    style: {
      transform: "scale(" + scale + ")",
      transformOrigin: "top left",
      width: elm.offsetWidth + "px",
      height: elm.offsetHeight + "px"
    }
  };
};

export const getElementImage = (elm) => {
  const scale = 2;
  return domtoimage.toPng(elm, optionsDownload(elm, scale));
};

export const downloadElementImage = (elm, name) => {
  return getElementImage(elm).then((url) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = url;
    link.click();
    link.remove();
    return new Promise((resolve) => resolve());
  });
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

export const downloadPdfFromUrl = (url, name) => {
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
