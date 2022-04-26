import {
  BrickFormTabsConsumer,
  BrickFormTabsProvider
} from "@/entities/product/ui/brick-form-tabs";
import { useCreateProductBrick } from "@/entities/product/libs/use-create-entity";
import { ProductBrick } from "@/services/pim.service";
import Layout from "./layout";
import { useHistory } from "react-router-dom";
import { pimRoutePaths } from "@/commons/consts/system/routes/pim-route-paths.const";

const Creation = () => {
  const history = useHistory();
  const { mutate, isLoading } = useCreateProductBrick();
  const submit = (brick: ProductBrick) => {
    const { title, code, classCode, hsCode, attributes } = brick;
    mutate(
      {
        title,
        code,
        classCode,
        hsCode,
        attributeCodes: attributes?.map((attribute) => attribute.code) ?? []
      },
      {
        onSuccess: () => {
          history.push(pimRoutePaths.PRODUCT_BRICK);
        }
      }
    );
  };
  return (
    <BrickFormTabsProvider classCode="" familyCode="" segmentCode="" onSubmit={submit}>
      <Layout title="New Brick" isSaving={isLoading}>
        <BrickFormTabsConsumer />
      </Layout>
    </BrickFormTabsProvider>
  );
};
export default Creation;
