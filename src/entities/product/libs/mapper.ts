import { ProductAttribute } from "@/services/pim.service";

export const getHSCodeFromBrick = (brick: { hsCode?: string }) => {
  if (brick?.hsCode == null) return "No HS Codes";
  return brick.hsCode;
};
export const getAttributeType = (_: ProductAttribute) => "dropdown";
