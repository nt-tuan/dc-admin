import { DTCSection, Loader } from "components/commons";

import { DefaultRouteForm } from "@/components/trade-route/components/default-route-form";
import React from "react";
import { useEditTradeRoute } from "@/components/trade-route/services/use-edit-trade-route";
import { useGetSearchParams } from "@/utils/location.util";

const EditDefaultRoutePage = () => {
  const id = useGetSearchParams("id");
  const {
    handleSubmit,
    documentTypes,
    defaultDocuments,
    initialValues,
    isFetched,
    isSubmitting
  } = useEditTradeRoute(id, false);

  return (
    <DTCSection>
      <DTCSection.Content>
        {isFetched && (
          <DefaultRouteForm
            onSubmit={handleSubmit}
            documentTypes={documentTypes}
            defaultDocuments={defaultDocuments}
            initialValues={initialValues}
            isSubmitting={isSubmitting}
          />
        )}
        {!isFetched && <Loader />}
      </DTCSection.Content>
    </DTCSection>
  );
};

export default EditDefaultRoutePage;
