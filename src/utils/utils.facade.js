import * as authUtils from "./auth.util";
import * as datetimeUtils from "./date-time.util";
import * as errorHandlerUtil from "./error-handler.util";
import * as generalUtils from "./general.util";
import * as httpApiUtils from "./httpAPI.util";
import * as logUtils from "./logger.util";
import * as monkeyPatchUtils from "./monkey-patch.util";
import * as sagaUtils from "./saga.util";
import * as sortUtils from "./sort.util";
import * as stringUtils from "./string.util";

/**
 *  Utilities facade class,
 *  Use this class to get utility functions
 */
export class UtilFacade {
  static getAuthUtils = () => authUtils;
  static getDateTimeUtils = () => datetimeUtils;
  static getErrorHandlerUtils = () => errorHandlerUtil;
  static getGeneralUtils = () => generalUtils;
  static getHttpApiUtils = () => httpApiUtils;
  static getLogUtils = () => logUtils;
  static getMonkeyPatcherUtils = () => monkeyPatchUtils;
  static getSagaUtils = () => sagaUtils;
  static getSortUtils = () => sortUtils;
  static getStringUtils = () => stringUtils;
}
