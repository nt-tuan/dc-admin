import { backendAPI } from "utils/httpAPI.util";
import { ApiPathConsts } from "commons/consts";

export class CompanyService {
  static getBankDetails = async () => {
    const result = await backendAPI.get(ApiPathConsts.BANK_DETAILS);
    return result;
  };
}
