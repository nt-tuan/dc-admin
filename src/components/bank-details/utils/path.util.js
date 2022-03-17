import { generatePath } from "react-router-dom";

import { BankPathEnum } from "../bank-path.enum";

export const getBankDetailPath = (id) => {
  return generatePath(BankPathEnum.BANK_DETAIL, { id });
};
export const getBankEditPath = (id) => {
  return generatePath(BankPathEnum.BANK_EDIT, { id });
};
