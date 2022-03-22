import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
export const queryWrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
