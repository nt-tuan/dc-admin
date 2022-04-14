import { getSegment, updateSegment } from "@/services/pim.service";
import { useMutation } from "react-query";

const useUpdateSegmentTitle = (code: number) => {
  const updateSegmentTitle = async (title: string) => {
    const segment = await getSegment(code);
    if (segment == null) return;
    return await updateSegment(code, {
      code,
      title
    });
  };
  const { mutate, isLoading } = useMutation(updateSegmentTitle);
  return { mutate, isLoading };
};
export default useUpdateSegmentTitle;
