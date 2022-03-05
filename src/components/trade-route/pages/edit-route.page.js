import { DTCSection, Loader } from "components/commons";

import React from "react";
import { TradeRouteForm } from "@/components/trade-route/components/trade-route-form";
import { useEditTradeRoute } from "@/components/trade-route/services/use-edit-trade-route";
import { useGetSearchParams } from "@/utils/location.util";

const EditRoutePage = () => {
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
          <TradeRouteForm
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
export default EditRoutePage;
