import { RouteService } from "./route.service";
import { getAllRecordsFromAPI } from "utils/general.util";
import { useQuery } from "react-query";

const getDocuments = async () => {
  const documentTypes = await getAllRecordsFromAPI(RouteService.getDocuments);
  const defaultDocuments = await RouteService.getDefaultDocuments();
  return { documentTypes, defaultDocuments };
};
export const useGetDocuments = () => {
  const { data, isFetched } = useQuery(["documents", "default-documents"], getDocuments);
  return { data, isFetched };
};
