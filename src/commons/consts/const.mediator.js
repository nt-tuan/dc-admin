import { API_URI, ERR_MSG, MESSAGES, PRIVATE_ROUTES, PUBLIC_ROUTES, ROUTES } from "./system";

export class ConstMediator {
  static getAllRoutes = () => {
    return ROUTES;
  };

  static getPublicRoutes = () => {
    return PUBLIC_ROUTES;
  };

  static getPrivateRoutes = () => {
    return PRIVATE_ROUTES;
  };

  static getApiUri = () => {
    return API_URI;
  };

  static getErrorMessages = () => {
    return ERR_MSG;
  };

  static getMessages = () => {
    return MESSAGES;
  };
}
