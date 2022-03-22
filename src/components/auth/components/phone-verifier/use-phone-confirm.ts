import React from "react";
import { useUserProfile } from "@/components/user-profile/services/use-user-profile";

export const usePhoneConfirm = () => {
  const [phoneConfirmed, setPhoneConfirmed] = React.useState(false);
  const { data, isLoading } = useUserProfile();
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
