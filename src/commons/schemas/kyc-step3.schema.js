const BANK_DETAILS = {
  accountName: "accountName",
  name: "name",
  bankIdType: "bankIdType",
  swiftCode: "swiftCode",
  accountNumber: "accountNumber",
  iban: "iban",
  sortCode: "sortCode",
  abaNumber: "abaNumber",
  address: "address",
  city: "city",
  state: "state",
  country: "country",
  postalCode: "postalCode",
  currency: "currency",
  recipientAddress: "recipientAddress",
  recipientCity: "recipientCity",
  recipientState: "recipientState",
  recipientCountry: "recipientCountry",
  recipientPostalCode: "recipientPostalCode"
};

const KYC3_LABEL = {
  [BANK_DETAILS.accountName]: "Beneficiary Name",
  [BANK_DETAILS.name]: "Beneficiary Bank",
  [BANK_DETAILS.bankIdType]: "Bank ID Type",
  [BANK_DETAILS.swiftCode]: "SWIFT Code",
  [BANK_DETAILS.accountNumber]: "Beneficiary Bank Account Number",
  [BANK_DETAILS.iban]: "IBAN",
  [BANK_DETAILS.sortCode]: "Sort Code",
  [BANK_DETAILS.abaNumber]: "ABA Number",
  [BANK_DETAILS.address]: "Bank Address",
  [BANK_DETAILS.city]: "Bank City",
  [BANK_DETAILS.state]: "Bank State/Province",
  [BANK_DETAILS.country]: "Bank Country",
  [BANK_DETAILS.postalCode]: "Bank Postal/Zip Code/P.O.Box",
  [BANK_DETAILS.currency]: "Bank Currency",
  [BANK_DETAILS.recipientAddress]: "Beneficiary Address",
  [BANK_DETAILS.recipientCity]: "Beneficiary City",
  [BANK_DETAILS.recipientState]: "Beneficiary State/Province",
  [BANK_DETAILS.recipientCountry]: "Beneficiary Country",
  [BANK_DETAILS.recipientPostalCode]: "Beneficiary Postal/Zip Code/P.O.Box"
};

export const KYC3_SCHEMA = {
  BANK_DETAILS,
  KYC3_LABEL
};
