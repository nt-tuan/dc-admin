import { useGetSegments } from "@/entities/product/libs/use-get-segments";
import { EmptySegements } from "@/entities/product/ui/empty-segments";

const ProductClassification = () => {
  const { data } = useGetSegments();
  console.log(data);
  return <EmptySegements />;
};
export default ProductClassification;
