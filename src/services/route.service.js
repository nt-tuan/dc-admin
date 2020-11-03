import { backendAPI } from "utils/httpAPI.util";

export class RouteService {
  static #BASE_URL = "/routes";

  static get = async (id) => {
    const result = await backendAPI.get(`${this.#BASE_URL}/${id}`);
    return result;
  };

  static getAll = async (params) => {
    const result = await backendAPI.get(this.#BASE_URL, params);
    return result;
  };

  static getDefault = async ({ categoryId, typeId }) => {
    const result = await backendAPI.get(
      `${this.#BASE_URL}/categories/${categoryId}/types/${typeId}`
    );
    return result;
  };

  static edit = async (id, values) => {
    await backendAPI.put(`${this.#BASE_URL}/${id}`, values);
  };

  static create = async (values) => {
    await backendAPI.post(this.#BASE_URL, values);
  };

  static delete = async (id) => {
    await backendAPI.delete(`${this.#BASE_URL}/${id}`);
  };

  static getCategories = async () => {
    const result = await backendAPI.get(`${this.#BASE_URL}/categories`);
    return result;
  };

  static getTypes = async (categoryId) => {
    const result = await backendAPI.get(`${this.#BASE_URL}/categories/${categoryId}`);
    return result;
  };

  static getDocuments = async (params) => {
    const { page, size, sort } = params.params ? params.params : params;
    const result = await backendAPI.get(`${this.#BASE_URL}/documents`, { page, size, sort });
    return result;
  };

  static uploadDocument = async (file) => {
    const result = await backendAPI.postFile(`${this.#BASE_URL}/documents/aws`, file);
    return result;
  };

  static deleteDocumentFile = async (fileName) => {
    await backendAPI.delete(`${this.#BASE_URL}/documents/aws/${fileName}`);
  };

  static deleteDocument = async (id) => {
    await backendAPI.delete(`${this.#BASE_URL}/documents/${id}`);
  };

  static createDocument = async (values) => {
    const result = await backendAPI.post(`${this.#BASE_URL}/documents`, values);
    return result;
  };

  static editDocument = async (id, values) => {
    const result = await backendAPI.put(`${this.#BASE_URL}/documents/${id}`, values);
    return result;
  };

  static getDefaultDocuments = async () => {
    const result = await backendAPI.get(`${this.#BASE_URL}/documents/default`);
    return result;
  };
}
