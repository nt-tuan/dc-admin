import { getUserProfile, updateUserProfile } from "./user-profile.service";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useUserProfile = (options) => {
  const { data, isLoading } = useQuery(["me"], getUserProfile, options);
  return { data, isLoading };
};

export const useInvalidateUserProfiles = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(["me"]);
};

export const useUpdateProfile = ({ onSuccess }) => {
  const invalidate = useInvalidateUserProfiles();
  const { mutate, isLoading } = useMutation(updateUserProfile, {
    onSuccess: () => {
      invalidate();
      if (onSuccess) onSuccess();
    }
  });
  return { mutate, isLoading };
};
