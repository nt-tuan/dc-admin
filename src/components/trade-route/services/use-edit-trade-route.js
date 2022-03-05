import {
  parseTradeRouteForm,
  parseTradeRouteResponseToFormValues
} from "@/components/trade-route/mapper";

import React from "react";
import { RouteConst } from "@/commons/consts";
import { RouteService } from "./route.service";
import { useGetDocuments } from "@/components/trade-route/services/use-get-documents";
import { useGetTradeRoute } from "@/components/trade-route/services/use-get-trade-route";
import { useHistory } from "react-router-dom";
import { useMessage } from "@/hooks/use-message";
import { useMutation } from "react-query";

export const useEditTradeRoute = (id, isDefault) => {
  const { data: routeData, isFetched: isTradeRouteFetched } = useGetTradeRoute(id);
  const { data: documentData, isFetched: isDocumentsFetched } = useGetDocuments();
  const message = useMessage();
  const history = useHistory();
  const onSuccess = () => {
    message.success("Edit Successfully");
    history.push(RouteConst.TRADE_ROUTES);
  };
  const { mutate, isLoading: isSubmitting } = useMutation(
    (values) => RouteService.edit(id, values),
    { onSuccess }
  );
  const handleSubmit = (values) => {
    mutate(parseTradeRouteForm(values, defaultDocuments));
  };
  const { documentTypes, defaultDocuments } = documentData || {};
  const initialValues = React.useMemo(() => {
    if (!routeData) return {};
    return parseTradeRouteResponseToFormValues({ ...routeData, isDefault }, defaultDocuments);
  }, [routeData, defaultDocuments, isDefault]);
  return {
    routeData,
    documentTypes,
    defaultDocuments,
    initialValues,
    isFetched: isTradeRouteFetched && isDocumentsFetched,
    handleSubmit,
    isSubmitting
  };
};
