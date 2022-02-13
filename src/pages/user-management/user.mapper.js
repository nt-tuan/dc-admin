import { DatetimeUtils } from "utils/date-time.util";
import { USER_MANAGEMENT_SCHEMA } from "./user-management-table.schema";

const { STATUS_LABELS } = USER_MANAGEMENT_SCHEMA;
const { formatDateTime } = DatetimeUtils;

const parseDataToGridView = (data) => {
  let newData = [...data];
  if (newData && Array.isArray(newData)) {
    newData = newData.map((user) => {
      const { createdDate, userStatus } = user;
      return {
        ...user,
        createdDate: createdDate ? formatDateTime(createdDate) : "",
        userStatus: STATUS_LABELS[userStatus] ? STATUS_LABELS[userStatus] : userStatus
      };
    });
  }

  return newData;
};

export const userMapper = {
  parseDataToGridView: parseDataToGridView
};
