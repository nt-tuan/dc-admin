import { useMessage } from "@/hooks/use-message";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteBankDetails, getBankDetails } from "./bank-services";

export const useGetBanks = () => {
  return useQuery(["banks"], getBankDetails);
};
export const useGetBankById = (id) => {
  const { data, ...queryResult } = useGetBanks();
  const bankData = data?.find((item) => item.id === id);
  return { bankData, ...queryResult };
};
const useInvalidateBank = () => {
  const client = useQueryClient();
  return () => client.invalidateQueries(["banks"]);
};
export const useBankMutation = (mutateFn, { onSuccess }) => {
  const message = useMessage();
  const invalidate = useInvalidateBank();
  return useMutation(mutateFn, {
    onSuccess: (values) => {
      invalidate();
      message.success("Update successful");
      if (onSuccess) onSuccess(values);
    }
  });
};

export const useDeleteBank = ({ onSuccess }) => {
  const invalidate = useInvalidateBank();
  return useMutation(deleteBankDetails, {
    onSuccess: async (values) => {
      await invalidate();
      if (onSuccess) {
        onSuccess(values);
      }
    }
  });
};
