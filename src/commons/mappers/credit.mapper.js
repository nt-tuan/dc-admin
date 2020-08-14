import { DatetimeUtils } from "utils/date-time.util";
import dayjs from "dayjs";
import { DATETIME_FORMAT } from "commons/consts";

const { formatDateTime } = DatetimeUtils;

export const parseDataCredit = (data) => {
  const parsedData = data.map((credit) => ({
    ...credit,
    createdDate: formatDateTime(credit.createdDate),
    paymentOverdue: credit.paymentOverdue ? "Yes" : "No",
    productName: credit.productName ? credit.productName : "Combo",
    paymentDueDate: credit.paymentDueDate
      ? dayjs(credit.paymentDueDate).format(DATETIME_FORMAT)
      : ""
  }));
  return parsedData;
};
