import { backendAPI } from "utils/httpAPI.util";

export const getNotificationList = async (page = 0, size = 5) => {
  const result = await backendAPI.get("/me/notifications", {
    page,
    size,
    sort: "createdDate,desc"
  });
  return result;
};
