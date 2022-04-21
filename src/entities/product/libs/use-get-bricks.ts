import { getProductBrick, getProductBricks } from "@/services/pim.service";
import { useQuery, useQueryClient } from "react-query";

const useGetBricks = () => {
  return useQuery("bricks", getProductBricks);
};
export const useGetBrick = (code?: string) => {
  return useQuery(["brick", code], () => getProductBrick(code ?? ""), { enabled: code != null });
};
export const useInvalidateBrick = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries("bricks");
};
export default useGetBricks;
