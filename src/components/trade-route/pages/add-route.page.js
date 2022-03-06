import { DTCSection, Loader } from "components/commons";

import Box from "@mui/material/Box";
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
        {!isFetched && (
          <Box height={200}>
            <Loader />
          </Box>
        )}
      </DTCSection.Content>
    </DTCSection>
  );
};

export default AddRoutePage;
