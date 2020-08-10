import { log } from "utils/logger.util";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getAccessToken } from "./auth.util";

export class WSClient {
  static #config = {
    debug: function (str) {
      log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
  };

  static async create() {
    const authToken = await getAccessToken();
    const config = {
      connectHeaders: {
        Authorization: authToken && `Bearer ${authToken}`
      }
    };
    const wsClient = new Client({ ...this.#config, ...config });

    wsClient.webSocketFactory = () => {
      return new SockJS(`${process.env.REACT_APP_API_ENDPOINT}/ws`);
    };

    wsClient.onStompError = (frame) => {
      log("Broker reported error: " + frame.headers["message"]);
      log("Additional details: " + frame.body);
    };

    return wsClient;
  }
}
