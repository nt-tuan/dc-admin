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

  get = (authToken) => async (uri, params) => {
    const authHeader = authToken ? { Authorization: `bearer ${authToken}` } : {};
    try {
      const result = await this.api.get(uri, {
        params: params,
        headers: { ...authHeader }
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  post = (authToken) => async (uri, body, params) => {
    const authHeader = authToken ? { Authorization: `bearer ${authToken}` } : {};
    try {
      const result = await this.api.post(uri, body, {
        params: params,
        headers: { ...authHeader }
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  postFile = (authToken) => async (uri, file, params) => {
    const authHeader = authToken ? { Authorization: `bearer ${authToken}` } : {};
    const formDataTypeHeader = {
      "Content-Type": "multipart/form-data"
    };
    try {
      const result = await this.api.post(uri, file, {
        params: params,
        headers: { ...authHeader, ...formDataTypeHeader }
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  putFile = (authToken) => async (uri, file, params) => {
    const authHeader = authToken ? { Authorization: `bearer ${authToken}` } : {};
    const formDataTypeHeader = {
      "Content-Type": "multipart/form-data"
    };
    try {
      const result = await this.api.put(uri, file, {
        params: params,
        headers: { ...authHeader, ...formDataTypeHeader }
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  put = (authToken) => async (uri, body, params) => {
    const authHeader = authToken ? { Authorization: `bearer ${authToken}` } : {};
    try {
      const result = await this.api.put(uri, body, {
        params: params,
        headers: { ...authHeader }
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  delete = (authToken) => async (uri, params) => {
    const authHeader = authToken ? { Authorization: `bearer ${authToken}` } : {};
    try {
      const result = await this.api.delete(uri, {
        params: params,
        headers: { ...authHeader }
      });
      return result.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  patch = (authToken) => async (uri, body, params) => {
    const authHeader = authToken ? { Authorization: `bearer ${authToken}` } : {};
    try {
      const result = await this.api.patch(uri, body, {
        params: params,
        headers: { ...authHeader }
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
