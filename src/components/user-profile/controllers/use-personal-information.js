import { useUpdateProfile, useUserProfile } from "../services/use-user-profile";

import { useSearchParams } from "@/hooks/use-search-params";

export const usePersonalInformation = () => {
  const { data, isLoading } = useUserProfile();
  const [{ mode }, setParams] = useSearchParams({ defaultValue: {} });
  const isEdit = mode === "edit";

  const toEdit = () => {
    setParams({ mode: "edit" });
  };
  const onSuccess = () => {
    setParams();
  };
  const { mutate, isLoading: isSubmitting } = useUpdateProfile({ onSuccess });

  return {
    isEdit,
    data,
    isLoading,
    isSubmitting,
    toEdit,
    updateProfile: mutate
  };
};
