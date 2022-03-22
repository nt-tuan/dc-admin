import { backendAPI } from "@/utils/httpAPI.util";
import { ApiPathConsts } from "@/commons/consts/system";

export class FinancialService {
  static getWalletDashboard = () => {
    return backendAPI.get(ApiPathConsts.GET_WALLET_DASHBOARD);
  };

  static getWalletTransactionDetails = ({ sort }) => {
    return backendAPI.get(ApiPathConsts.GET_WALLET_TRANSACTION_DETAILS, {
      sort
    });
  };

  static getAccountSummary = ({ page, size, sort }) => {
    return backendAPI.get(ApiPathConsts.GET_ACCOUNT_SUMMARY, { page, size, sort });
  };

  static getWithdrawals = ({ page, size, sort, status }) => {
    return backendAPI.get(ApiPathConsts.GET_WITHDRAWAL, { page, size, sort, status });
  };

  static postRequestWithdrawal = async (data) => {
    await backendAPI.post(ApiPathConsts.WALLET_WITHDRAWAL, data);
  };
}
