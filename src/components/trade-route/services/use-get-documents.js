import { useQuery } from "react-query";
import { getAllRecordsFromAPI } from "utils/general.util";

import { RouteService } from "./route.service";

const getDocuments = async () => {
  const documentTypes = await getAllRecordsFromAPI(RouteService.getDocuments);
  const defaultDocuments = await RouteService.getDefaultDocuments();
  return { documentTypes, defaultDocuments };
};
export const useGetDocuments = () => {
  const { data, isFetched } = useQuery(["documents", "default-documents"], getDocuments);
  const { documentTypes, defaultDocuments } = data || {};
  return { data, isFetched, documentTypes, defaultDocuments };
};
