import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export class DatetimeUtils {
  static isBetweenTwoDate = (currentDate, firstDate, lastDate) => {
    return dayjs(currentDate).isBetween(firstDate, lastDate);
  };

  static subtractDateTime = (currentDate, number, type) => {
    return dayjs(currentDate).subtract(number, type).format();
  };
}
