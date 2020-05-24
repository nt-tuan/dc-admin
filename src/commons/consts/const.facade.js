import {
  API_URI,
  ERR_MSG,
  MESSAGES,
  PRIVATE_ROUTES,
  PUBLIC_ROUTES,
  ROUTES,
  API_ERRORS
} from "./system";
import * as GENERAL_CONST from "./general.const";

export class ConstFacade {
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

  static getGeneralConst = () => {
    return GENERAL_CONST;
  };

  static getApiErrors = () => {
    return API_ERRORS;
  };
}
