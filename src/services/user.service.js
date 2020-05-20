export class UserService {
  static getCurrentAccount = async () => {
    const accessToken = localStorage.getItem("auth");
    if (accessToken) {
      // const userInfo = await backendAPI.get(accessToken)(API_URI.GET_CURRENT_USER);
      const userInfo = {};
      return { ...userInfo, createDate: undefined };
    }
    return undefined;
  };
}
