import { backendAPI, jobAPI } from "@/utils/httpAPI.util";
// #region types
export interface BaseEntity {
  code: string;
  title: string;
}
export interface AttributeValue {
  code: string;
  title: string;
  attributeCode: string;
}
export interface ProductAttribute extends BaseEntity {
  attributeValues?: AttributeValue[];
}

export interface ProductBrick extends BaseEntity {
  attributes?: ProductAttribute[];
  classCode: string;
  hsCode: string;
  attributeCodes?: string[];
}
export interface ProductClass extends BaseEntity {
  bricks?: ProductBrick[];
  familyCode: string;
}
export interface ProductFamily extends BaseEntity {
  classes?: ProductClass[];
  segmentCode: string;
}
export interface Segment extends BaseEntity {
  families?: ProductFamily[];
}

export interface PaginationParams {
  page: number;
  size: number;
}
const defaultPagination: PaginationParams = {
  page: 0,
  size: 100000
};
export type BulkResponse = {
  code: string;
  status: number;
  description: string;
}[];
// #endregion

// #region DC API
export const getDCSegments: () => Promise<Segment[]> = () =>
  backendAPI.get("/pim/dc-data/product-classification/segments");
export const getDCProductClass: (code: string) => Promise<ProductClass> = (code: string) =>
  backendAPI.get(`/pim/dc-data/product-classification/classes/${code}`);
export interface ImportSegment {
  code: string;
  title: string;
  families?: {
    code: string;
    title: string;
    classes?: {
      code: string;
      title: string;
      bricks: {
        code: string;
        title: string;
        attributes: {
          code: string;
          title: string;
        }[];
      }[];
    }[];
  }[];
}
export const importPimData = (segments: ImportSegment[]) =>
  jobAPI.post("/pim/jobs/import", segments);

// #endregion

// #region Product Segment
export const getSegments: (params?: {
  page: number;
  size: number;
}) => Promise<{ segments: Segment[] } | null> = (params = defaultPagination) =>
  backendAPI.get("/pim/product-classification/segments", params);
export const getSegment: (code: string) => Promise<Segment | null> = (code) =>
  backendAPI.get(`/pim/product-classification/segments/${code}`);
export const updateSegment: (segment: Segment) => Promise<Segment> = (segment) =>
  backendAPI.put(`/pim/product-classification/segments/${segment.code}`, segment);
export const createSegment: (payload: { code: string; title: string }) => Promise<Segment> = (
  payload
) => backendAPI.post(`/pim/product-classification/segments`, payload);
export const deleteBulkSegments: (code: string[]) => Promise<BulkResponse> = (codes: string[]) =>
  backendAPI.delete("/pim/product-classification/segments/bulk", undefined, codes);
// #endregion

// #region Product Family API
export const getProductFamilies: (
  params?: PaginationParams
) => Promise<{ families: ProductFamily[] }> = (params = defaultPagination) =>
  backendAPI.get("/pim/product-classification/families", params);
export const getProductFamily: (code: string) => Promise<ProductFamily> = (code) =>
  backendAPI.get(`/pim/product-classification/families/${code}`);
export const updateProductFamily: (payload: {
  code: string;
  segmentCode: string;
  title: string;
}) => Promise<ProductFamily | undefined> = (payload) =>
  backendAPI.put(`/pim/product-classification/families/${payload.code}`, payload);
export const createProductFamily: (payload: {
  code: string;
  title: string;
  segmentCode: string;
}) => Promise<ProductFamily> = (payload) =>
  backendAPI.post(`/pim/product-classification/families`, payload);
export const deleteBulkFamilies: (code: string[]) => Promise<BulkResponse> = (codes: string[]) =>
  backendAPI.delete("/pim/product-classification/families/bulk", undefined, codes);
// #endregion

// #region Product Class API
export const getProductClasses: (
  params?: PaginationParams
) => Promise<{ classes: ProductClass[] }> = (params = defaultPagination) =>
  backendAPI.get("/pim/product-classification/classes", params);
export const getProductClass: (code: string) => Promise<ProductClass> = (code: string) =>
  backendAPI.get(`/pim/product-classification/classes/${code}`);
export const updateProductClass: (payload: {
  code: string;
  title: string;
  familyCode: string;
}) => Promise<ProductClass> = (payload) =>
  backendAPI.put(`/pim/product-classification/classes/${payload.code}`, payload);
export const createProductClass: (payload: {
  code: string;
  title: string;
  familyCode: string;
}) => Promise<ProductClass> = (payload) =>
  backendAPI.post(`/pim/product-classification/classes`, payload);
export const deleteBulkClasses: (codes: string[]) => Promise<BulkResponse> = (codes: string[]) =>
  backendAPI.delete("/pim/product-classification/classes/bulk", undefined, codes);
// #endregion

// #region Product Brick API
export const getProductBricks: (
  params?: PaginationParams
) => Promise<{ bricks: ProductBrick[] }> = (params = defaultPagination) =>
  backendAPI.get("/pim/product-classification/bricks", params);
export const getProductBrick: (code: string) => Promise<ProductBrick> = (code: string) =>
  backendAPI.get(`/pim/product-classification/bricks/${code}`);
export const createProductBrick: (payload: {
  code: string;
  title: string;
  classCode: string;
  hsCode: string;
  attributeCodes: string[];
}) => Promise<ProductBrick> = (payload) =>
  backendAPI.post(`/pim/product-classification/bricks`, payload);
export const updateProductBrick: (payload: {
  code: string;
  title: string;
  classCode: string;
  hsCode: string;
  attributeCodes: string[];
}) => Promise<ProductBrick> = (payload) =>
  backendAPI.put(`/pim/product-classification/bricks/${payload.code}`, payload);
export const deleteBulkBricks: (codes: string[]) => Promise<BulkResponse> = (codes: string[]) =>
  backendAPI.delete("/pim/product-classification/bricks/bulk", undefined, codes);
// #endregion

// #region Product Attribute API
export const getProductAttributes: (
  params?: PaginationParams
) => Promise<{ attributes: ProductAttribute[] }> = (params = defaultPagination) =>
  backendAPI.get("/pim/product-classification/attributes", params);
export const getProductAttribute: (code: string) => Promise<ProductAttribute> = (code) =>
  backendAPI.get(`/pim/product-classification/attributes/${code}`);
export const createProductAttribute: (attribute: ProductAttribute) => Promise<void> = (attribute) =>
  backendAPI.post(`/pim/product-classification/attributes`, attribute);
export const updateProductAttribute: (attribute: ProductAttribute) => Promise<void> = (attribute) =>
  backendAPI.put(`/pim/product-classification/attributes/${attribute.code}`, attribute);
export const deleteBulkAttributes: (codes: string[]) => Promise<BulkResponse> = (codes: string[]) =>
  backendAPI.delete("/pim/product-classification/attributes/bulk", undefined, codes);
export const deleteBulkAttributeValues = (codes: string[]) =>
  backendAPI.delete("/pim/product-classification/attributeValues/bulk", undefined, codes);
// #endregion

// #region Product Attribute API
export const createBulkProductAttributes: (values: AttributeValue[]) => Promise<BulkResponse> = (
  values
) => backendAPI.post(`pim/product-classification/attributeValues/bulk`, values);
export const deleteBulkProductAttributes: (codes: string) => Promise<BulkResponse> = (codes) =>
  backendAPI.delete(`pim/product-classification/attributeValues/bulk`, undefined, codes);
// #region
