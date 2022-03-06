import { requestPhoneCode } from "./user-profile.service";
import { useQuery } from "react-query";

export const useSendPhoneCode = ({ onSuccess }) => {
  const { isLoading, refetch: refetchPhoneCode } = useQuery(
    ["request-phone-code"],
    requestPhoneCode,
    {
      enabled: false,
      onSuccess
    }
  );
  return { isLoading, refetchPhoneCode };
};
