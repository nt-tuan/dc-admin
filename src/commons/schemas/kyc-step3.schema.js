const BANK_DETAILS = {
  accountHolder: "accountHolder",
  bankName: "name",
  accountNumber: "accountNumber",
  iban: "iban",
  nationality: "nationality",
  swiftCode: "swiftCode"
};

const KYC3_LABEL = {
  [BANK_DETAILS.accountHolder]: "Account holder",
  [BANK_DETAILS.bankName]: "Bank name",
  [BANK_DETAILS.accountNumber]: "Account No.",
  [BANK_DETAILS.iban]: "IBAN",
  [BANK_DETAILS.nationality]: "Nationality",
  [BANK_DETAILS.swiftCode]: "Swift Code"
};

export const KYC3_SCHEMA = {
  BANK_DETAILS,
  KYC3_LABEL
};
