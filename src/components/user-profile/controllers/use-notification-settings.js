import { useMessage } from "@/hooks/use-message";
import React from "react";
import { useMutation } from "react-query";

import { useInvalidateUserProfiles, useUserProfile } from "../services/use-user-profile";
import { updateNotificationChannel } from "../services/user-profile.service";

export const useNotificationSettings = () => {
  const message = useMessage();
  const [{ phoneModalOpen, updatedData }, setPhoneModalOpen] = React.useState({
    phoneModalOpen: false
  });
  const { data, isLoading, isFetching } = useUserProfile();
  const { bySms, byEmail, byWeb, byWhatsapp, phoneVerified } = data || {};
  const invalidate = useInvalidateUserProfiles();
  const { mutate, isLoading: isUpdating } = useMutation(updateNotificationChannel, {
    onSuccess: () => {
      invalidate();
      setPhoneModalOpen({ phoneModalOpen: false });
      message.success("Your Notificatican prefernce has been saved");
    }
  });
  const getUpdatedData = (e) => {
    const { name, checked } = e.target;
    return {
      bySms: Boolean(bySms && phoneVerified),
      byWeb,
      byEmail,
      byWhatsapp: Boolean(byWhatsapp && phoneVerified),
      [name]: checked
    };
  };

  const update = (e) => {
    if (updatedData) {
      mutate(updatedData);
      return;
    }
    mutate(getUpdatedData(e));
  };

  const checkPhoneVeriyAndUpdate = (e) => {
    const canUpdate = phoneVerified || !e.target.checked;
    if (canUpdate) {
      update(e);
      return;
    }
    setPhoneModalOpen({
      phoneModalOpen: true,
      updatedData: getUpdatedData(e)
    });
  };
  const closePhoneModal = () => {
    setPhoneModalOpen({ phoneModalOpen: false });
  };
  return {
    data,
    bySms,
    byEmail,
    byWeb,
    byWhatsapp,
    phoneVerified,
    isUpdating,
    isFetching,
    isLoading,
    update,
    checkPhoneVeriyAndUpdate,
    phoneModalOpen,
    closePhoneModal
  };
};
