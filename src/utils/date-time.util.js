import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export const isBetweenTwoDate = (currentDate, firstDate, lastDate) => {
  return dayjs(currentDate).isBetween(firstDate, lastDate);
};

export const subtractDateTime = (currentDate, number, type) => {
  return dayjs(currentDate).subtract(number, type).format();
};
