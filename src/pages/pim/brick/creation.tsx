import {
  BrickFormTabsConsumer,
  BrickFormTabsProvider
} from "@/entities/product/ui/brick-form-tabs";
import { useCreateProductBrick } from "@/entities/product/libs/use-create-entity";
import { ProductBrick } from "@/services/pim.service";
import Layout from "./layout";

const Creation = () => {
  const { mutate, isLoading } = useCreateProductBrick();
  const submit = (brick: ProductBrick) => {
    mutate(brick);
  };
  return (
    <BrickFormTabsProvider onSubmit={submit}>
      <Layout title="New Brick" isSaving={isLoading}>
        <BrickFormTabsConsumer classCode="" familyCode="" segmentCode="" />
      </Layout>
    </BrickFormTabsProvider>
  );
};
export default Creation;
