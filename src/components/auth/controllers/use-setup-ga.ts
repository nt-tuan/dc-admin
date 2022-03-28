import { useQuery } from "react-query";
import { getGoogleAuthenticator } from "../services/auth.service";

interface Options {
  enabled?: boolean;
}
export const useSetupGA = (options?: Options) => {
  return useQuery(["tfa", "ga"], getGoogleAuthenticator, options);
};
