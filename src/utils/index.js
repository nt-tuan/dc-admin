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
