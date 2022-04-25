import React from "react";
import {
  BrickFormTabsConsumer,
  BrickFormTabsContext,
  BrickFormTabsProvider
} from "@/entities/product/ui/brick-form-tabs";
import { useParams } from "react-router-dom";
import { useGetBrick } from "@/entities/product/libs/use-get-entity";
import useLoadBrickParent from "@/entities/product/libs/use-load-brick-parent";
import { useUpdateProductBrick } from "@/entities/product/libs/use-update-entity";
import { ProductBrick } from "@/services/pim.service";
import NavigationPrompt from "react-router-navigation-prompt";
import Layout from "./layout";
import LeaveConfirm from "@/entities/product/ui/leave-confirm";
import { useFormikContext } from "formik";

const LeaveConfirmConsumer = ({ isUpdating }: { isUpdating: boolean }) => {
  const formContext = useFormikContext();
  const { hasAttributesChanged, triggerSubmit } = React.useContext(BrickFormTabsContext);

  return (
    <NavigationPrompt
      when={(currentLocation, nextLocation, _action) => {
        return (
          nextLocation?.pathname !== currentLocation.pathname &&
          formContext?.submitCount != null &&
          formContext.submitCount === 0 &&
          (hasAttributesChanged() || formContext?.dirty)
        );
      }}
    >
      {({ onConfirm, onCancel }) => {
        return (
          <LeaveConfirm
            isUpdating={isUpdating}
            onClose={onCancel}
            onCancel={onConfirm}
            onSave={triggerSubmit}
          />
        );
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
    <BrickFormTabsProvider
      classCode={classCode}
      familyCode={familyCode}
      segmentCode={segmentCode}
      onSubmit={submit}
      brick={data}
      isLoading={isLoading || isParentLoading}
    >
      <Layout
        title={data?.title ?? ""}
        isSaving={isUpdating}
        loading={isLoading || isParentLoading}
      >
        {data && <BrickFormTabsConsumer />}
      </Layout>
      <LeaveConfirmConsumer isUpdating={isUpdating} />
    </BrickFormTabsProvider>
  );
};
export default Edition;
