import { backendAPI } from "utils/httpAPI.util";

export class IntroducerService {
  static #INTRODUCER_PREFIX = "/introducers";

  static getTraderList = async () => {
    const res = await backendAPI.get(`${this.#INTRODUCER_PREFIX}/traders`);
    return res;
  };

  static getTraderListByIntroducer = async (id) => {
    const res = await backendAPI.get(`${this.#INTRODUCER_PREFIX}/traders/${id}`);
    return res;
  };

  static addIntroducer = async (data) => {
    await backendAPI.post(this.#INTRODUCER_PREFIX, data);
  };

  static deleteIntroducer = async (id) => {
    await backendAPI.delete(`${this.#INTRODUCER_PREFIX}/${id}`);
  };

  static getActiveIntroducer = async ({ page, size, sort }) => {
    const res = await backendAPI.get(`${this.#INTRODUCER_PREFIX}/active`, { page, size, sort });
    return res;
  };

  static getInactiveIntroducer = async ({ page, size, sort }) => {
    const res = await backendAPI.get(`${this.#INTRODUCER_PREFIX}/inactive`, { page, size, sort });
    return res;
  };

  static getIntroducerDetails = async (id) => {
    const res = await backendAPI.get(`${this.#INTRODUCER_PREFIX}/${id}`);
    return res;
  };

  static updateIntroducerDetails = async (id, data) => {
    await backendAPI.put(`${this.#INTRODUCER_PREFIX}/${id}`, data);
  };
}
