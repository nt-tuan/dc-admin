import { backendAPI } from "utils/httpAPI.util";

export class IntroducerService {
  static #INTRODUCER_PREFIX = "/introducers";

  static getTraderList = async () => {
    const res = await backendAPI.get(`${this.#INTRODUCER_PREFIX}/traders`);
    return res;
  };

  static addIntroducer = async (data) => {
    await backendAPI.post(this.#INTRODUCER_PREFIX, data);
  };
}
