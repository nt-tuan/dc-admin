import { REQUIRED_ERR } from "@/commons/consts";
import * as yup from "yup";
import { BANK_TYPE_ENUM } from "../../bank-type.enum";
import { BANK_LABELS } from "../../bank.schema";

export const isAbaRequired = (bankIdType) => {
  return [BANK_TYPE_ENUM.ACH, BANK_TYPE_ENUM.CHIPS].includes(bankIdType);
};
export const isSortCodeRequired = (bankIdType) => bankIdType === BANK_TYPE_ENUM.SWIFT;

export const validationSchema = yup.object({
  accountName: yup.string().required(REQUIRED_ERR(BANK_LABELS.accountName)),
  name: yup.string().required(REQUIRED_ERR(BANK_LABELS.name)),
  bankIdType: yup.string().required(REQUIRED_ERR(BANK_LABELS.bankIdType)).nullable(),
  swiftCode: yup.string().required(REQUIRED_ERR(BANK_LABELS.swiftCode)),
  accountNumber: yup.string().required(REQUIRED_ERR(BANK_LABELS.accountNumber)),
  iban: yup.string().required(REQUIRED_ERR(BANK_LABELS.iban)),
  sortCode: yup
    .string()
    .nullable()
    .when("bankIdType", {
      is: isSortCodeRequired,
      then: yup.string().required(REQUIRED_ERR(BANK_LABELS.sortCode))
    }),
  abaNumber: yup
    .string()
    .nullable()
    .when("bankIdType", {
      is: isAbaRequired,
      then: yup.string().required(REQUIRED_ERR(BANK_LABELS.abaNumber))
    }),
  address: yup.string().required(REQUIRED_ERR(BANK_LABELS.address)),
  city: yup.string().required(REQUIRED_ERR(BANK_LABELS.city)),
  state: yup.string().required(REQUIRED_ERR(BANK_LABELS.state)),
  country: yup.string().required(REQUIRED_ERR(BANK_LABELS.country)).nullable(),
  postalCode: yup.string().required(REQUIRED_ERR(BANK_LABELS.postalCode)),
  currency: yup.string().required(REQUIRED_ERR(BANK_LABELS.currency)).nullable(),
  recipientAddress: yup.string().required(REQUIRED_ERR(BANK_LABELS.recipientAddress)),
  recipientCity: yup.string().required(REQUIRED_ERR(BANK_LABELS.recipientCity)),
  recipientState: yup.string().required(REQUIRED_ERR(BANK_LABELS.recipientState)),
  recipientCountry: yup.string().required(REQUIRED_ERR(BANK_LABELS.recipientCountry)).nullable(),
  recipientPostalCode: yup.string().required(REQUIRED_ERR(BANK_LABELS.recipientPostalCode))
});
