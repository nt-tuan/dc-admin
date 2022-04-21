import { useGetFamily } from "./use-get-families";
import { useGetProductClass } from "./use-get-product-class";

const useLoadBrickParent = (classCode?: string) => {
  const classQuery = useGetProductClass(classCode);
  const familyQuery = useGetFamily(classQuery.data?.familyCode);

  const isLoading = classQuery.isLoading || familyQuery.isLoading;
  return {
    isLoading,
    classCode: classCode ?? "",
    familyCode: familyQuery.data?.code ?? "",
    segmentCode: familyQuery.data?.segmentCode ?? ""
  };
};
export default useLoadBrickParent;
