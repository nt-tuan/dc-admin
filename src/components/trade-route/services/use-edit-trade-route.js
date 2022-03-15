import {
  parseTradeRouteForm,
  parseTradeRouteResponseToFormValues
} from "@/components/trade-route/mapper";

import React from "react";
import { useGetDocuments } from "@/components/trade-route/services/use-get-documents";
import { useGetTradeRoute } from "@/components/trade-route/services/use-get-trade-route";
import { useMutateTradeRoute } from "./use-get-trade-route-list";

export const useEditTradeRoute = (id, isDefault) => {
  const { data: routeData, isFetched: isTradeRouteFetched } = useGetTradeRoute(id);
  const { data: documentData, isFetched: isDocumentsFetched } = useGetDocuments();

  const { mutate, isLoading: isSubmitting } = useMutateTradeRoute(id, isDefault);
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
