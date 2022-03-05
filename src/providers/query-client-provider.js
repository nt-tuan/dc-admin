import { QueryClientProvider as Provider, QueryClient } from "react-query";

import React from "react";
import { useErrorHandler } from "@/utils/error-handler.util";

export const QueryClientProvider = ({ children }) => {
  const { onError } = useErrorHandler();
  const [queryClient] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          onError
        },
        mutations: {
          onError
        }
      }
    })
  );
  return <Provider client={queryClient}>{children}</Provider>;
};
