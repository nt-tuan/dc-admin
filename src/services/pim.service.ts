import { backendAPI } from "@/utils/httpAPI.util";

export interface ProductAttribute {
  code: number;
  title: string;
}
export interface ProductBrick {
  code: number;
  title: string;
  attributes: ProductAttribute[];
  classCode: number;
  attributeCodes: number[];
}
export interface ProductClass {
  code: number;
  title: string;
  bricks: ProductBrick[];
  familyCode: number;
}
export interface ProductFamily {
  code: number;
  title: string;
  classes: ProductClass[];
  segmentCode: number;
}

export interface Segment {
  title: string;
  code: number;
  families: ProductFamily[];
}
export const getDefaultSegments: () => Promise<Segment[]> = () =>
  backendAPI.get("/pim/dc-data/product-classification/segments");

export interface SegmentResponse {
  segments: Segment[];
}
export const getSegments: () => Promise<SegmentResponse | null> = () =>
  backendAPI.get("/pim/product-classification/segments");

export const getProductClass: (code: number) => Promise<ProductClass> = (code: number) =>
  backendAPI.get(`/pim/dc-data/product-classification/classes/${code}`);
