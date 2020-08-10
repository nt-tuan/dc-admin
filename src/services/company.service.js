import { backendAPI } from "utils/httpAPI.util";
import { ApiPathConsts } from "commons/consts";

export class CompanyService {
  static getBankDetails = async () => {
    const result = await backendAPI.get(ApiPathConsts.BANK_DETAILS);
    return result;
  };

  static getCountries = async () => {
    const result = await backendAPI.get("/companies/addresses/countries");
    return result;
  };
}
