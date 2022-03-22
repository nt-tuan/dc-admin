import { FrequencyTypesEnum, MethodEnum } from "../../user-profile/constants/tfa.enum";

import React from "react";
import { parseTfaSetting, parseTfaSettingFromServer } from "../mappers";
import { selectBrowserFingerprint } from "@/redux/settings/settings.duck";
import { update2FASettings } from "../../user-profile/services/user-profile.service";
import { useInvalidateUserProfiles } from "../../user-profile/services/use-user-profile";
import { useMessage } from "@/hooks/use-message";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { TfaTypeEnum } from "../models/enums";

const parseTfaTypes = (data) => {
  const { tfaType } = data;
  const { frequency, method } = parseTfaSettingFromServer(tfaType);
  return {
    frequency: frequency in FrequencyTypesEnum ? frequency : null,
    method: method in MethodEnum ? method : null
  };
};

export const useTFASettings = (data) => {
  const message = useMessage();
  const invalidateProfiles = useInvalidateUserProfiles();
  const BrowserFingerprint = useSelector(selectBrowserFingerprint);
  const { frequency, method } = parseTfaTypes(data);

  const [is2FA, setIs2FA] = React.useState(false);
  const [isOpenUpdatingTfa, setIsOpenUpdatingTfa] = React.useState(false);
  const [selectedMethod, setSelectedMethod] = React.useState(method);
  const [selectedFrequency, setSelectedFrequency] = React.useState(frequency);
  const { mutate, isLoading: isSubmitting } = useMutation(update2FASettings, {
    onSuccess: () => {
      invalidateProfiles();
      message.success("Update Two-Factor Authentication successfully");
    }
  });

  React.useEffect(() => {
    if (data) {
      setIs2FA(data.tfaType !== TfaTypeEnum.DISABLED);
      const currentTfa = parseTfaTypes(data);
      setSelectedMethod(currentTfa.method);
      setSelectedFrequency(currentTfa.frequency);
      setIsOpenUpdatingTfa(false);
    }
  }, [data]);
  const change2FA = (checked) => {
    if (!checked && data.tfaType !== TfaTypeEnum.DISABLED) {
      mutate({
        tfaType: TfaTypeEnum.DISABLED,
        browserId: BrowserFingerprint
      });
    }
    setIs2FA(checked);
  };
  const handleFrequencyChange = (newFrequency) => {
    if (!newFrequency) {
      return;
    }
    setSelectedFrequency(newFrequency);
  };
  const handleMethodChange = (newMethod) => {
    if (!newMethod) {
      return;
    }
    setSelectedMethod(newMethod);
  };
  const openMethodSelect = () => {
    setIsOpenUpdatingTfa(true);
  };
  const stopUpdatingTfa = () => {
    setIsOpenUpdatingTfa(false);
    invalidateProfiles();
  };
  const currentTfaType = parseTfaSetting(is2FA, selectedMethod, selectedFrequency);

  return {
    is2FA,
    change2FA,
    isOpenUpdatingTfa: isOpenUpdatingTfa || data?.tfaType === TfaTypeEnum.DISABLED,
    selectedMethod,
    selectedFrequency,
    handleMethodChange,
    handleFrequencyChange,
    updateTfaSetting: mutate,
    isUpdatingTfaSetting: isSubmitting,
    openMethodSelect,
    stopUpdatingTfa,
    currentTfaType
  };
};
