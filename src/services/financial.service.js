import { backendAPI } from "utils/httpAPI.util";
import { ApiUriConsts } from "commons/consts/system";

export class FinancialService {
  static getWalletDashboard = async () => {
    const result = await backendAPI.get(ApiUriConsts.GET_WALLET_DASHBOARD);
    return result;
  };

  static getWalletTransactionDetails = async ({ page, size, sort }) => {
    const result = await backendAPI.get(ApiUriConsts.GET_WALLET_TRANSACTION_DETAILS, {
      page,
      size,
      sort
    });
    return result;
  };

  static getAccountSummary = async ({ page, size, sort }) => {
    const result = await backendAPI.get(ApiUriConsts.GET_ACCOUNT_SUMMARY, { page, size, sort });
    return result;
  };

  static getWithdrawals = async ({ page, size, sort, status }) => {
    const result = await backendAPI.get(ApiUriConsts.GET_WITHDRAWAL, { page, size, sort, status });
    return result;
  };

  static postRequestWithdrawal = async (data) => {
    await backendAPI.post(ApiUriConsts.WALLET_WITHDRAWAL, data);
  };
}
