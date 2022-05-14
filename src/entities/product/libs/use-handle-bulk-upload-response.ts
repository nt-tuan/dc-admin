import { useMessage } from "@/hooks/use-message";
import { BulkResponse } from "@/services/pim.service";

const useHandleBulkUploadResponse = () => {
  const message = useMessage();
  return (bulkResponses: BulkResponse) => {
    let hasError = false;
    for (const response of bulkResponses) {
      if (response.status === 400) {
        message.error(response.description);
        hasError = true;
      }
    }
    if (!hasError) {
      message.success("Update successfully.");
    }
  };
};

export default useHandleBulkUploadResponse;
