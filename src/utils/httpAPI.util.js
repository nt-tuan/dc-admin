import axios from "axios";
import { axiosErrorHandler } from "./error-handler.util";

class HttpApi {
  constructor(config) {
    // config sample
    // see axios doc for more info
    // {
    //   baseURL: process.env.REACT_APP_API_ENDPOINT,
    //   timeout: 5000,
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // }
    this.api = axios.create(config);
  }

  setAuthHeader = (authToken) => {
    this.api.defaults.headers.common["Authorization"] = `bearer ${authToken}`;
  };

  removeAuthHeader = () => {
    delete this.api.defaults.headers.common["Authorization"];
  };

  get = async (uri, params) => {
    try {
      const result = await this.api.get(uri, {
        params: params
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  post = async (uri, body, params) => {
    try {
      const result = await this.api.post(uri, body, {
        params: params
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  postFile = async (uri, file, params) => {
    try {
      const result = await this.api.post(uri, file, {
        params: params,
        headers: { "Content-Type": "multipart/form-data" }
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  putFile = async (uri, file, params) => {
    try {
      const result = await this.api.put(uri, file, {
        params: params,
        headers: { "Content-Type": "multipart/form-data" }
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  put = async (uri, body, params) => {
    try {
      const result = await this.api.put(uri, body, {
        params: params
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  delete = async (uri, params) => {
    try {
      const result = await this.api.delete(uri, {
        params: params
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  patch = async (uri, body, params) => {
    try {
      const result = await this.api.patch(uri, body, {
        params: params
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };
}

export const backendAPI = new HttpApi({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 25000,
  headers: {
    "Content-Type": "application/json"
  }
});
