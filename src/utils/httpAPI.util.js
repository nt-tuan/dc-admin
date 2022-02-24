import axios from "axios";
import { getAPIEndPoint, getMarketplaceEndPoint } from "./config.util";
import { axiosErrorHandler } from "./error-handler.util";

class HttpApi {
  constructor(config) {
    this.api = axios.create(config);
  }

  setAuthHeader = (authToken) => {
    this.api.defaults.headers.common["Authorization"] = `bearer ${authToken}`;
  };

  removeAuthHeader = () => {
    delete this.api.defaults.headers.common["Authorization"];
  };

  get = async (path, params) => {
    try {
      const result = await this.api.get(path, {
        params: params
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  post = async (path, body, params) => {
    try {
      const result = await this.api.post(path, body, {
        params: params
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  postFile = async (path, file, params) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const result = await this.api.post(path, formData, {
        params: params,
        headers: { "Content-Type": "multipart/form-data" }
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  putFile = async (path, file, params) => {
    try {
      const result = await this.api.put(path, file, {
        params: params,
        headers: { "Content-Type": "multipart/form-data" }
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  put = async (path, body, params) => {
    try {
      const result = await this.api.put(path, body, {
        params: params
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  delete = async (path, params) => {
    try {
      const result = await this.api.delete(path, {
        params: params
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  patch = async (path, body, params) => {
    try {
      const result = await this.api.patch(path, body, {
        params: params
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };
}

export const backendAPI = new HttpApi({
  baseURL: getAPIEndPoint(),
  timeout: 25000,
  headers: {
    "Content-Type": "application/json"
  }
});
export const marketPlaceAPI = new HttpApi({
  baseURL: getMarketplaceEndPoint(),
  timeout: 25000,
  headers: {
    "Content-Type": "application/json"
  }
});
