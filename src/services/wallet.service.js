import { backendAPI } from "utils/httpAPI.util";
import { ApiUriConsts } from "commons/consts/system";

export class WalletService {
  static getWalletDashboard = async () => {
    const result = await backendAPI.get(ApiUriConsts.GET_WALLET_DASHBOARD);
    return result;
  };

  static getWalletTransactionDetails = async () => {
    const result = await backendAPI.get(ApiUriConsts.GET_WALLET_TRANSACTION_DETAILS);
    return result;
  };
}
