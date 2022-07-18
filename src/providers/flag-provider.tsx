import { getFlags } from "@/utils/config.util";
import React from "react";

interface IContext {
  flags: Set<string>;
}
const FlagContext = React.createContext<IContext>({ flags: new Set() });

const FlagProvider = ({ children }: { children: React.ReactNode }) => {
  const flags = new Set(getFlags() as string[]);
  return <FlagContext.Provider value={{ flags }}>{children}</FlagContext.Provider>;
};

export const useFlag = (flag: string) => {
  const { flags } = React.useContext(FlagContext);
  return flags.has(flag);
};

export default FlagProvider;
