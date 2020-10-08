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

  static getNewCompanyList = async ({ page, size, sort }) => {
    const result = await backendAPI.get(ApiPathConsts.GET_NEW_COMPANY_LIST, { page, size, sort });
    return result;
  };

  static approveNewCompany = async ({ companyId }) => {
    const result = await backendAPI.put(
      ApiPathConsts.APPROVE_NEW_COMPANY.replace(":companyId", companyId)
    );
    return result;
  };

  static updateProductCreationPermission = async (companyId, isEnable) => {
    const result = await backendAPI.put(
      `${ApiPathConsts.UPDATE_PRODUCT_CREATION_PERMISSION.replace(
        ":companyId",
        companyId
      )}${isEnable}`
    );
    return result;
  };
}
