import { createBankDetails, deleteBankDetails, getBankDetails } from "./bankDetail.service";

export const saveStep3 = async ({ bankDetails, deletedIds }) => {
  if (!bankDetails.length) {
    return;
  }
  let promises = [];
  promises.push(createBankDetails(bankDetails));
  deletedIds.forEach((id) => promises.push(deleteBankDetails(id)));
  await Promise.all(promises);
};

export const getStep3 = () => {
  return getBankDetails();
};
