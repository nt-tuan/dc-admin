import { backendAPI } from "@/utils/httpAPI.util";

export class RouteService {
  static #BASE_URL = "/admin/routes";

  static get = (id) => {
    return backendAPI.get(`${this.#BASE_URL}/${id}`);
  };

  static getAll = (params) => {
    return backendAPI.get(this.#BASE_URL, params);
  };

  static getDefault = ({ categoryId, typeId }) => {
    return backendAPI.get(`${this.#BASE_URL}/categories/${categoryId}/types/${typeId}`);
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

  static getCategories = () => {
    return backendAPI.get(`products/category`);
  };

  static getTypes = (categoryId) => {
    return backendAPI.get(`products/category/${categoryId}`);
  };

  static getDocuments = (params) => {
    const { page, size, sort } = params.params ? params.params : params;
    return backendAPI.get(`${this.#BASE_URL}/documents`, { page, size, sort });
  };

  static uploadDocument = (file) => {
    return backendAPI.postFile(`${this.#BASE_URL}/documents/aws`, file);
  };

  static deleteDocumentFile = async (fileName) => {
    await backendAPI.delete(`${this.#BASE_URL}/documents/aws/${fileName}`);
  };

  static deleteDocument = async (id) => {
    await backendAPI.delete(`${this.#BASE_URL}/documents/${id}`);
  };

  static createDocument = (values) => {
    return backendAPI.post(`${this.#BASE_URL}/documents`, values);
  };

  static editDocument = (id, values) => {
    return backendAPI.put(`${this.#BASE_URL}/documents/${id}`, values);
  };

  static getDefaultDocuments = () => {
    return backendAPI.get(`${this.#BASE_URL}/documents/default`);
  };
}
