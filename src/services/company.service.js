import { backendAPI } from "utils/httpAPI.util";
import { ApiPathConsts } from "commons/consts";

export class CompanyService {
  static getBankDetails = () => {
    return backendAPI.get(ApiPathConsts.BANK_DETAILS);
  };

  static getCountries = () => {
    return backendAPI.get("/companies/addresses/countries");
  };

  static getNewCompanyList = ({ page, size, sort }) => {
    return backendAPI.get(ApiPathConsts.GET_NEW_COMPANY_LIST, { page, size, sort });
  };

  static approveNewCompany = ({ companyId }) => {
    return backendAPI.put(ApiPathConsts.APPROVE_NEW_COMPANY.replace(":companyId", companyId));
  };

  static updateProductCreationPermission = (companyId, isEnable) => {
    return backendAPI.put(
      `${ApiPathConsts.UPDATE_PRODUCT_CREATION_PERMISSION.replace(
        ":companyId",
        companyId
      )}${isEnable}`
    );
  };
  static sendEmailConfirmBank = async () => {
    await backendAPI.get(`${ApiPathConsts.COMPANY_SEND_VERIFICATION_CODE}`);
    return true;
  };
  static verifyBankConfirmCode = async (code) => {
    await backendAPI.post(`${ApiPathConsts.COMPANY_SEND_VERIFICATION_CODE}?code=${code}`);
    return true;
  };
}
