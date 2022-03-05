import { DTCSection, Loader } from "components/commons";

import React from "react";
import { RouteConst } from "commons/consts";
import { TradeRouteForm } from "@/components/trade-route/components/trade-route-form";
import { useAddTradeRoute } from "../services/use-add-trade-route";
import { useHistory } from "react-router-dom";

const AddRoutePage = () => {
  const history = useHistory();
  const {
    documentTypes,
    defaultDocuments,
    handleSubmit,
    initialValues,
    isFetched
  } = useAddTradeRoute(false, {
    onSuccess: () => {
      history.push(RouteConst.TRADE_ROUTES);
    }
  });
  return (
    <DTCSection>
      <DTCSection.Content>
        {isFetched && (
          <TradeRouteForm
            onSubmit={handleSubmit}
            documentTypes={documentTypes}
            defaultDocuments={defaultDocuments}
            initialValues={initialValues}
          />
        )}
        {!isFetched && <Loader />}
      </DTCSection.Content>
    </DTCSection>
  );
};

export default AddRoutePage;
