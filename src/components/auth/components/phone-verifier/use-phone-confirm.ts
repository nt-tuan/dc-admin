import React from "react";
import { useUserProfile } from "@/components/user-profile/services/use-user-profile";

export const usePhoneConfirm = (
  {
    enabled
  }: {
    enabled: boolean;
  } = { enabled: false }
) => {
  const [phoneConfirmed, setPhoneConfirmed] = React.useState(enabled ? false : true);
  const { data, isLoading } = useUserProfile({ enabled });
  const { phone, phoneVerified } = data || {};
  const confirmPhone = () => setPhoneConfirmed(true);
  return {
    phone,
    phoneVerified,
    isLoading,
    isConfirmed: phoneVerified || phoneConfirmed,
    confirmPhone
  };
};
