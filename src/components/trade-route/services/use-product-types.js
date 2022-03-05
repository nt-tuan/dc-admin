import { RouteService } from "./route.service";
import { useQuery } from "react-query";

export const useProductCategory = () => {
  return useQuery(["product-category"], () => RouteService.getCategories());
};
export const useProductTypes = (categoryId) => {
  return useQuery(["product-type", categoryId], async () => {
    if (!categoryId) return [];
    return RouteService.getTypes(categoryId);
  });
};
