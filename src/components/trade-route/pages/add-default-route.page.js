import { DTCSection, Loader } from "components/commons";

import { DefaultRouteForm } from "@/components/trade-route/components/default-route-form";
import React from "react";
import { RouteConst } from "@/commons/consts";
import { useAddTradeRoute } from "@/components/trade-route/services/use-add-trade-route";
import { useHistory } from "react-router-dom";

const AddDefaultRoutePage = () => {
  const history = useHistory();
  const {
    documentTypes,
    defaultDocuments,
    handleSubmit,
    initialValues,
    isFetched,
    isSubmitting
  } = useAddTradeRoute(true, {
    onSuccess: () => {
      history.push(`${RouteConst.TRADE_ROUTES}?tab=DEFAULT_ROUTE`);
    }
  });
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
            submitButtonText="Create Default Trade Routes"
          />
        )}
        {!isFetched && <Loader />}
      </DTCSection.Content>
    </DTCSection>
  );
};

export default AddDefaultRoutePage;
