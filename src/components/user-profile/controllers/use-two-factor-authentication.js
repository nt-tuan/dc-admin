import { FrequencyTypesEnum, MethodEnum } from "../constants/tfa.enum";

import React from "react";
import { parseTfaSettingFromServer } from "../mapper";
import { selectBrowserFingerprint } from "@/redux/settings/settings.duck";
import { update2FASettings } from "../services/user-profile.service";
import { useInvalidateUserProfiles } from "../services/use-user-profile";
import { useMessage } from "@/hooks/use-message";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";

const parseTfaTypes = (data) => {
  const { tfaType } = data;
  const { frequency, method } = parseTfaSettingFromServer(tfaType);
  return {
    frequency: frequency in FrequencyTypesEnum ? frequency : null,
    method: method in MethodEnum ? method : null
  };
};

export const useTwoFactorAuthentication = (data) => {
  const message = useMessage();
  const invalidateProfiles = useInvalidateUserProfiles();
  const BrowserFingerprint = useSelector(selectBrowserFingerprint);
  const { frequency, method } = parseTfaTypes(data);

  const [is2FA, setIs2FA] = React.useState(false);
  const [selectedMethod, setSelectedMethod] = React.useState(method);
  const [selectedFrequency, setSelectedFrequency] = React.useState(frequency);
  const { mutate, isLoading: isSubmitting } = useMutation(update2FASettings, {
    onSuccess: (values) => {
      console.log(values);
      invalidateProfiles();
      message.success("Update Two-Factor Authentication successfully");
    }
  });

  React.useEffect(() => {
    if (data) {
      setIs2FA(data.tfaType !== "TWOFA_DISABLED");
    }
  }, [data]);
  const change2FA = (checked) => {
    if (!checked && data.tfaType !== "TWOFA_DISABLED") {
      mutate({
        tfaType: "TWOFA_DISABLED",
        browserId: BrowserFingerprint
      });
    }
    setIs2FA(checked);
  };
  return {
    is2FA,
    change2FA,
    selectedMethod,
    setSelectedMethod,
    selectedFrequency,
    setSelectedFrequency,
    updateTfaSetting: mutate,
    isUpdatingTfaSetting: isSubmitting
  };
};
