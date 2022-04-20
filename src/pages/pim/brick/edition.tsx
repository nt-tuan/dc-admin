import React from "react";
import {
  BrickFormTabsConsumer,
  BrickFormTabsContext,
  BrickFormTabsProvider
} from "@/entities/product/ui/brick-form-tabs";
import { useParams } from "react-router-dom";
import { useGetBrick } from "@/entities/product/libs/use-get-bricks";
import useLoadBrickParent from "@/entities/product/libs/use-load-brick-parent";
import { useUpdateProductBrick } from "@/entities/product/libs/use-create-entity";
import { ProductBrick } from "@/services/pim.service";
import NavigationPrompt from "react-router-navigation-prompt";
import Layout from "./layout";
import LeaveConfirm from "@/entities/product/ui/leave-confirm";

const LeaveConfirmConsumer = () => {
  const { hasChanged, triggerSubmit } = React.useContext(BrickFormTabsContext);

  return (
    <NavigationPrompt when={true}>
      {({ onConfirm }) => {
        if (!hasChanged()) {
          onConfirm();
        }
        return <LeaveConfirm onCancel={onConfirm} onSave={triggerSubmit} />;
      }}
    </NavigationPrompt>
  );
};

const Edition = () => {
  const { mutate, isLoading: isUpdating } = useUpdateProductBrick();
  const params = useParams<{ code?: string }>();
  const code = params.code;
  const { data, isLoading } = useGetBrick(code);
  const { isLoading: isParentLoading, classCode, familyCode, segmentCode } = useLoadBrickParent(
    data?.classCode
  );

  const submit = (brick: ProductBrick) => {
    mutate(brick);
  };

  return (
    <BrickFormTabsProvider onSubmit={submit} brick={data}>
      <Layout
        title={data?.title ?? ""}
        isSaving={isUpdating}
        loading={isLoading || isParentLoading}
      >
        {data && (
          <BrickFormTabsConsumer
            classCode={classCode}
            familyCode={familyCode}
            segmentCode={segmentCode}
          />
        )}
      </Layout>
      <LeaveConfirmConsumer />
    </BrickFormTabsProvider>
  );
};
export default Edition;
