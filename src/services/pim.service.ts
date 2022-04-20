import { backendAPI } from "@/utils/httpAPI.util";
export interface BaseEntity {
  code: string;
  title: string;
}
export interface AttributeValue {
  code: string;
  title: string;
}
export interface ProductAttribute extends BaseEntity {
  attributeValues: AttributeValue[];
}
export interface ProductBrick extends BaseEntity {
  attributes?: ProductAttribute[];
  classCode: string;
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
export const getDefaultSegments: () => Promise<Segment[]> = () =>
  backendAPI.get("/pim/dc-data/product-classification/segments");

// Product Segment
export interface SegmentResponse {
  segments: Segment[];
}
export const getSegments: () => Promise<SegmentResponse | null> = () =>
  backendAPI.get("/pim/product-classification/segments");
export const getSegment: (code: string) => Promise<Segment | null> = (code) =>
  backendAPI.get(`/pim/product-classification/segments/${code}`);
export const updateSegment: (code: string, segment: Segment) => Promise<Segment> = (
  code,
  segment
) => backendAPI.put(`/pim/product-classification/segments/${code}`, segment);
export const createSegment: (payload: { code: string; title: string }) => Promise<Segment> = (
  payload
) => backendAPI.post(`/pim/product-classification/segments`, payload);

// Product family
export const getProductFamilies: () => Promise<{ families: ProductFamily[] }> = () =>
  backendAPI.get("pim/product-classification/families");
export const getProductFamily: (code: string) => Promise<ProductFamily> = (code) =>
  backendAPI.get(`pim/product-classification/families/${code}`);
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

// Product Class
export const getDCProductClass: (code: string) => Promise<ProductClass> = (code: string) =>
  backendAPI.get(`/pim/dc-data/product-classification/classes/${code}`);
export const getProductClasses: (params?: {
  page?: number;
  size?: number;
}) => Promise<{ classes: ProductClass[] }> = (params) =>
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

export const getProductBricks: () => Promise<{ bricks: ProductBrick[] }> = () =>
  backendAPI.get("/pim/product-classification/bricks");
export const getProductBrick: (code: string) => Promise<ProductBrick> = (code: string) =>
  backendAPI.get(`/pim/product-classification/bricks/${code}`);
export const createProductBrick: (payload: {
  code: string;
  title: string;
  classCode: string;
}) => Promise<ProductBrick> = (payload) =>
  backendAPI.post(`/pim/product-classification/bricks`, payload);
export const updateProductBrick: (payload: {
  code: string;
  title: string;
  classCode: string;
}) => Promise<ProductBrick> = (payload) =>
  backendAPI.put(`/pim/product-classification/bricks/${payload.code}`, payload);

export const getProductAttributes: () => Promise<{ attributes: ProductAttribute[] }> = () =>
  backendAPI.get("/pim/product-classification/attributes");

export const deleteBulkSegments = (codes: string[]) =>
  backendAPI.delete("/pim/product-classification/segments/bulk", undefined, codes);

export const deleteBulkFamilies = (codes: string[]) =>
  backendAPI.delete("/pim/product-classification/families/bulk", undefined, codes);

export const deleteBulkClasses = (codes: string[]) =>
  backendAPI.delete("/pim/product-classification/classes/bulk", undefined, codes);

export const deleteBulkBricks = (codes: string[]) =>
  backendAPI.delete("/pim/product-classification/bricks/bulk", undefined, codes);

export const deleteBulkAttributes = (codes: string[]) =>
  backendAPI.delete("/pim/product-classification/attributes/bulk", undefined, codes);

export const deleteBulkAttributeValues = (codes: string[]) =>
  backendAPI.delete("/pim/product-classification/attributes-values/bulk", undefined, codes);

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
  backendAPI.post("/pim/jobs/import", segments);
