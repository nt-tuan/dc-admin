import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { DATETIME_FORMAT } from "commons/consts";
dayjs.extend(isBetween);

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
}
