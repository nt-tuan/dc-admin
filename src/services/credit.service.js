import { backendAPI } from "utils/httpAPI.util";

export class CreditService {
  static #ORDER_PREFIX = "/orders";

  static getCreditRequest = async ({ page, size, sort }) => {
    const res = await backendAPI.get(`${this.#ORDER_PREFIX}/marketplace/credit-requests`, {
      page,
      size,
      sort
    });
    return res;
  };

  static getCreditRequestHistory = async ({ page, size, sort }) => {
    const res = await backendAPI.get(`${this.#ORDER_PREFIX}/marketplace/credit-request-history`, {
      page,
      size,
      sort
    });
    return res;
  };

  static getCreditByType = async ({ page, size, sort, type }) => {
    const res = await backendAPI.get(
      `${this.#ORDER_PREFIX}/marketplace/credit-status?type=${type}`,
      {
        page,
        size,
        sort
      }
    );
    return res;
  };

  static manageCredit = async (id, isAccept) => {
    await backendAPI.post(
      `${this.#ORDER_PREFIX}/${id}/update/marketplace-credit?isAccept=${isAccept}`
    );
  };

  static getCreditUser = async ({ page, size, sort }) => {
    const res = await backendAPI.get(`${this.#ORDER_PREFIX}/marketplace/user-credit-statistic`, {
      page,
      size,
      sort
    });
    return res;
  };

  static getPurchaseOrder = async (id) => {
    const res = await backendAPI.get(`${this.#ORDER_PREFIX}/orders/${id}/purchase`);
    return res;
  };
}
