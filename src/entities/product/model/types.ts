import type {
  ProductClass,
  Segment,
  ProductBrick,
  ProductFamily,
  ProductAttribute
} from "@/services/pim.service";
export type EntityType = "Segment" | "Family" | "Class" | "Brick" | "Attribute";
export type ProductEntity =
  | Segment
  | ProductFamily
  | ProductClass
  | ProductBrick
  | ProductAttribute;
export interface Dictionary<T> {
  [key: string]: T;
}
export interface TreeNodeValue {
  actualCode: string;
  code: string;
  title: string;
  parentCode?: string;
  type: EntityType;
}
