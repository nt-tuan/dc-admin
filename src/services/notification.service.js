import { backendAPI } from "utils/httpAPI.util";
import { getAccessToken } from "utils";

export const getNotificationList = async (page = 0, size = 5) => {
  const accessToken = await getAccessToken();
  const result = await backendAPI.get(accessToken)("/me/notifications", {
    page,
    size,
    sort: "createdDate,desc"
  });
  return result;
};
