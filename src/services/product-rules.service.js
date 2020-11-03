import { backendAPI } from "utils/httpAPI.util";
import { ApiPathConsts } from "commons/consts/system";

export class ProductRuleService {
  static getProductTradeRules = async (params) => {
    const result = await backendAPI.get(ApiPathConsts.GET_PRODUCT_TRADE_RULES, params);
    return result;
  };
  static getProductTradeRuleDetail = async (productId) => {
    const result = await backendAPI.get(
      ApiPathConsts.GET_PRODUCT_TRADE_RULE_DETAIL.replace(":id", productId)
    );
    return result;
  };

  static updateProductTradeRulesStatus = async (productId, action) => {
    const result = await backendAPI.put(
      ApiPathConsts.PUT_PRODUCT_TRADE_RULE_DETAIL.replace(":id", productId),
      null,
      { action }
    );
    return result;
  };
  static createProductTradeRules = async (productId, values) => {
    const result = await backendAPI.post(
      ApiPathConsts.POST_PRODUCT_TRADE_RULE_DETAIL.replace(":id", productId),
      { productRuleRequestList: values }
    );
    return result;
  };
}
