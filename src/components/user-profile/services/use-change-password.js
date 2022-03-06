import { changePassword } from "./user-profile.service";
import { useMessage } from "@/hooks/use-message";
import { useMutation } from "react-query";

export const useChangePassword = () => {
  const message = useMessage();
  const { mutate, isLoading } = useMutation(changePassword, {
    onSuccess: () => {
      message.success("Your password has been changed successfully.");
    }
  });
  return { mutate, isLoading };
};
