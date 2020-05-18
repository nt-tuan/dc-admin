import moment from "moment-timezone";
import { DATETIME_FORMAT } from "commons/consts";

//Takes into account Unicode and non-English alphabets
export const sortAlphabetically = (stringA, stringB) =>
  stringA.localeCompare(stringB, "en", { sensitivity: "base" });

export const sortDateTime = (firstDate, lastDate) =>
  moment(firstDate, DATETIME_FORMAT).valueOf() - moment(lastDate, DATETIME_FORMAT).valueOf();
