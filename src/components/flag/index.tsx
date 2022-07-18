import { useFlag } from "@/providers/flag-provider";
import React from "react";

interface Props {
  children: React.ReactNode;
  name: string;
}
const Flag = ({ children, name }: Props) => {
  const isEnabled = useFlag(name);
  if (!isEnabled) return null;
  return children;
};

export default Flag;
