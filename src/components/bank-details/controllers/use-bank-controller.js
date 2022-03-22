import React from "react";
import { useUserProfile } from "@/components/user-profile/services/use-user-profile";
import { useBankMutation, useGetBankById } from "../services/use-query-banks";
import { usePhoneVerifier } from "@/components/auth/components/phone-verifier/use-phone-verifier";
import { useMessage } from "@/hooks/use-message";
import { useHistory } from "react-router-dom";
import { getBankDetailPath } from "../utils/path.util";

export const useBankController = ({ id, mutateFn }) => {
  const history = useHistory();
  const message = useMessage();
  const ref = React.useRef();
  const [submitData, setSubmitData] = React.useState();
  const [isVerifingPhone, setIsVerifyingPhone] = React.useState(false);
  const { data, isLoading: isLoadingProfile } = useUserProfile();
  const { mutate, isLoading: isUpdating } = useBankMutation(mutateFn, {
    onSuccess: (values) => {
      const nextId = id ?? values?.id;
      if (nextId) history.push(getBankDetailPath(nextId));
    }
  });
  const verifier = usePhoneVerifier({
    onReady: () => {
      setIsVerifyingPhone(true);
    },
    onError: (error) => {
      message.error(error);
    },
    onSuccess: (values) => {
      setIsVerifyingPhone(false);
      if (submitData) mutate(submitData);
    }
  });

  const { bankData, isLoading: isLoadingBankData } = useGetBankById(id, {
    enabled: id != null
  });
  const cancel = () => {
    setIsVerifyingPhone(false);
  };
  const startUpdateBank = async () => {
    await ref.current.submitForm();
  };

  const updateBank = (values) => {
    setSubmitData(values);
    verifier.startVerify();
  };

  return {
    verifier,
    data,
    isVerifingPhone,
    isLoading: isLoadingProfile || isLoadingBankData,
    ref,
    bankData,
    startUpdateBank,
    updateBank,
    isUpdating,
    cancel
  };
};
