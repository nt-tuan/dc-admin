import { backendAPI } from "utils/httpAPI.util";
import { ApiPathConsts } from "commons/consts/system";

export class TradeRuleService {
  static getTradeRule = async (id) => {
    const result = await backendAPI.get(ApiPathConsts.TRADE_RULE_PREFIX, { id });
    return result;
  };
}
