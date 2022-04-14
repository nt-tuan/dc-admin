import { pimRoutePaths } from "@/commons/consts/system/routes/pim-route-paths.const";
import { Loader } from "@/components/commons";
import { useGetDCSegments } from "@/entities/product/libs/use-get-segments";
import { ProductClassificationImporter } from "@/entities/product/ui/product-classification";
import PageContentLayout from "../page-layout";

const Creation = () => {
  const { data: segments, isLoading } = useGetDCSegments();
  if (isLoading) return <Loader />;
  return (
    <PageContentLayout
      title="Create Product Classification"
      parentPage={pimRoutePaths.PRODUCT_CLASSFICATION}
    >
      <ProductClassificationImporter segments={segments ?? []} />
    </PageContentLayout>
  );
};
export default Creation;
