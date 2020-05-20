import { useState } from "react";

export const useBooleanState = (defaultValue) => {
  const [theBool, setTheBool] = useState(defaultValue || false);
  const toggleState = () => setTheBool(!theBool);
  return [theBool, toggleState];
};
