import { backendAPI } from "utils/httpAPI.util";

export const getNotificationList = (page = 0, size = 5) => {
  return backendAPI.get("/me/notifications", {
    page,
    size,
    sort: "createdDate,desc"
  });
};

export const setNotificationsRead = async () => {
  await backendAPI.put("/me/notifications/read");
};
