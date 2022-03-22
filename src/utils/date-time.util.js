import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { DATETIME_FORMAT } from "@/commons/consts";
dayjs.extend(isBetween);
dayjs.extend(relativeTime);
dayjs.extend(utc);

export class DatetimeUtils {
  static isBetweenTwoDate = (currentDate, firstDate, lastDate) => {
    return dayjs(currentDate).isBetween(firstDate, lastDate);
  };

  static subtractDateTime = (currentDate, number, type) => {
    return dayjs(currentDate).subtract(number, type).format();
  };

  static formatDateTime = (value, format = DATETIME_FORMAT) => {
    if (dayjs(value, DATETIME_FORMAT).isValid()) {
      return value;
    }

    return dayjs(value).format(format);
  };

  static fromNow = (value) => {
    return dayjs.utc(value).fromNow();
  };

  static minutesTotime = (minutes = 0, getTimeString = false) => {
    let h = (minutes / 60) | 0,
      m = minutes % 60 | 0;
    if (getTimeString) {
      const hString = h < 10 ? `0${h}` : h;
      const mString = m < 10 ? `0${m}` : m;
      return `${hString}:${mString}`;
    }
    return {
      h: h,
      m: m
    };
  };
}
