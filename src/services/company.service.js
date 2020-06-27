import { backendAPI } from "utils/httpAPI.util";
import { ApiUriConsts } from "commons/consts";

export class CompanyService {
  static getBankDetails = async () => {
    const result = await backendAPI.get(ApiUriConsts.BANK_DETAILS);
    return result;
  };
}
