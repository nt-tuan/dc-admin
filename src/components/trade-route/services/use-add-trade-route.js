import { parseDefaultDocuments, parseTradeRouteForm } from "@/components/trade-route/mapper";

import React from "react";
import { RouteService } from "./route.service";
import { useGetDocuments } from "@/components/trade-route/services/use-get-documents";
import { useMessage } from "@/hooks/use-message";
import { useMutation } from "react-query";

export const useAddTradeRoute = (isDefault, { onSuccess }) => {
  const { data, isFetched } = useGetDocuments();
  const { documentTypes, defaultDocuments } = data || {};
  const message = useMessage();
  const handleSuccess = () => {
    message.success("Created Successfully");
    if (onSuccess) onSuccess();
  };

  const { mutate, isLoading: isSubmitting } = useMutation(RouteService.create, {
    onSuccess: handleSuccess
  });

  const initialValues = React.useMemo(
    (is) => {
      if (!isFetched) return;
      const routeDocumentTypeRequests = parseDefaultDocuments(defaultDocuments);
      return {
        categoryId: "",
        typeId: "",
        fromCountry: "",
        toCountry: "",
        isDefault,
        routeDocumentTypeRequests
      };
    },
    [defaultDocuments, isFetched, isDefault]
  );

  const handleSubmit = (values) => {
    const composedValues = parseTradeRouteForm(values);
    mutate(composedValues);
  };
  return { documentTypes, defaultDocuments, initialValues, handleSubmit, isFetched, isSubmitting };
};
