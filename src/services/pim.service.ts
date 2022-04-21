import { backendAPI } from "@/utils/httpAPI.util";
export interface BaseEntity {
  code: number;
  title: string;
}
export interface AttributeValue {
  code: number;
  title: string;
}
export interface ProductAttribute extends BaseEntity {
  attributeValues: AttributeValue[];
}
export interface ProductBrick extends BaseEntity {
  attributes?: ProductAttribute[];
  classCode: number;
  attributeCodes?: number[];
}
export interface ProductClass extends BaseEntity {
  bricks?: ProductBrick[];
  familyCode: number;
}
export interface ProductFamily extends BaseEntity {
  classes?: ProductClass[];
  segmentCode: number;
}

export interface Segment extends BaseEntity {
  families?: ProductFamily[];
}
export const getDefaultSegments: () => Promise<Segment[]> = () =>
  backendAPI.get("/pim/dc-data/product-classification/segments");

export interface SegmentResponse {
  segments: Segment[];
}
export const getSegments: () => Promise<SegmentResponse | null> = () =>
  backendAPI.get("/pim/product-classification/segments");
export const getSegment: (code: number) => Promise<Segment | null> = (code) =>
  backendAPI.get(`/pim/product-classification/segments/${code}`);
export const updateSegment: (code: number, segment: Segment) => Promise<Segment> = (
  code,
  segment
) => backendAPI.put(`/pim/product-classification/segments/${code}`, segment);
export const getProductFamilies: () => Promise<{ families: ProductFamily[] }> = () =>
  backendAPI.get("pim/product-classification/families");
export const getDCProductClass: (code: number) => Promise<ProductClass> = (code: number) =>
  backendAPI.get(`/pim/dc-data/product-classification/classes/${code}`);
export const getProductClasses: () => Promise<{ classes: ProductClass[] }> = () =>
  backendAPI.get("pim/product-classification/classes");
export const getProductBricks: () => Promise<{ bricks: ProductBrick[] }> = () =>
  backendAPI.get("pim/product-classification/bricks");

export const deleteBulkSegments = (codes: number[]) =>
  backendAPI.delete("/pim/product-classification/segments/bulk", undefined, codes);

export const deleteBulkFamilies = (codes: number[]) =>
  backendAPI.delete("/pim/product-classification/families/bulk", undefined, codes);

export const deleteBulkClasses = (codes: number[]) =>
  backendAPI.delete("/pim/product-classification/classes/bulk", undefined, codes);

export const deleteBulkBricks = (codes: number[]) =>
  backendAPI.delete("/pim/product-classification/bricks/bulk", undefined, codes);

export const deleteBulkAttributes = (codes: number[]) =>
  backendAPI.delete("/pim/product-classification/attributes/bulk", undefined, codes);

export const deleteBulkAttributeValues = (codes: number[]) =>
  backendAPI.delete("/pim/product-classification/attributes-values/bulk", undefined, codes);

export interface ImportSegment {
  code: number;
  title: string;
  families?: {
    code: number;
    title: string;
    classes?: {
      code: number;
      title: string;
      bricks: {
        code: number;
        title: string;
        attributes: {
          code: number;
          title: string;
        }[];
      }[];
    }[];
  }[];
}
export const importPimData = (segments: ImportSegment[]) =>
  backendAPI.post("/pim/jobs/import", segments);

export interface Attributes extends AttributeValue {
  attributeValue: AttributeValue[];
}
export interface AttributesResponse {
  _links: {
    self: string;
    first: string;
    prev: string;
    next: string;
    last: string;
  };
  attributes: Attributes[];
}

interface AnAttributesResponse {
  code: string;
  title: string;
  attributeValue: AttributeValue[];
}

export const getAttributes: (values) => Promise<AttributesResponse | null> = () =>
  backendAPI.post("/pim/product-classification/attributes", values);

export const getAttributeByCode: () => Promise<AnAttributesResponse | null> = (
  attributeCode: string
) => backendAPI.get(`/pim/product-classification/attributes/${attributeCode}`);

export const createAttribute: () => Promise<AnAttributesResponse | null> = (values: any) =>
  backendAPI.post("/pim/product-classification/attributes", values);

export const updateAttribute: () => Promise<AnAttributesResponse | null> = (
  attributeCode: string,
  values: any
) => backendAPI.put(`/pim/product-classification/attributes${attributeCode}`, values);

export const deleteAttribute: () => Promise<AnAttributesResponse | null> = (
  attributeCode: string
) => backendAPI.delete(`/pim/product-classification/attributes${attributeCode}`);

export const deleteBulkAttribute: () => Promise<AnAttributesResponse | null> = (values: string[]) =>
  backendAPI.delete("/pim/product-classification/attributes/bulk", values);
