import { ProductEntity } from "../model/types";

export const filterProductEntity = <T extends ProductEntity>(data: T[], filter: string) => {
  return data.filter(
    (item) =>
      item.code.toLowerCase().includes(filter.toLowerCase()) ||
      item.title.toLowerCase().includes(filter.toLowerCase())
  );
};
