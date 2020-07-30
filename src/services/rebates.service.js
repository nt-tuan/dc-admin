import { backendAPI } from "utils/httpAPI.util";
import { ApiPathConsts } from "commons/consts";

export class RebatesService {
  static getCompanies = async () => {
    const result = await backendAPI.get(ApiPathConsts.GET_BUYER_COMPANY);
    return result;
  };

  static getBrands = async (id) => {
    const result = await backendAPI.get(ApiPathConsts.GET_BRANDS.replace(":id", id));
    return result;
  };

  static getRebates = async (params) => {
    const result = await backendAPI.get(ApiPathConsts.REBATES, params);
    return result;
  };

  static getRebatesDetails = async (id) => {
    const result = await backendAPI.get(`${ApiPathConsts.REBATES}/${id}`);
    return result;
  };

  static createRebates = async (data) => {
    await backendAPI.post(ApiPathConsts.REBATES, data);
  };

  static editRebates = async (id, data) => {
    await backendAPI.put(`${ApiPathConsts.REBATES}/${id}`, data);
  };

  static deleteRebates = async (id) => {
    await backendAPI.delete(`${ApiPathConsts.REBATES}/${id}`);
  };
}
