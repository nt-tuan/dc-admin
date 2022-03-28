import { useMutation, useQuery, useQueryClient } from "react-query";

import { parseFormValues } from "../components/personal-information-form/mapper";
import { getUserProfile, updateUserProfile } from "./user-profile.service";

export const useUserProfile = (
  options = {
    enabled: true
  }
) => {
  const { data, isLoading, isFetching } = useQuery(["me"], getUserProfile, {
    enabled: false,
    ...options
  });
  return { data, isLoading, isFetching };
};

export const useInvalidateUserProfiles = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(["me"]);
};

export const useUpdateProfile = ({ onSuccess }) => {
  const invalidate = useInvalidateUserProfiles();
  const { mutate, isLoading } = useMutation(
    (values) => updateUserProfile(parseFormValues(values)),
    {
      onSuccess: () => {
        invalidate();
        if (onSuccess) onSuccess();
      }
    }
  );
  return { mutate, isLoading };
};
