const emptyBankDetails = {
  accountName: "",
  name: "",
  bankIdType: "",
  swiftCode: "",
  accountNumber: "",
  iban: "",
  sortCode: "",
  abaNumber: "",
  address: "",
  city: "",
  state: "",
  country: null,
  postalCode: "",
  currency: null,
  recipientAddress: "",
  recipientCity: "",
  recipientState: "",
  recipientCountry: null,
  recipientPostalCode: ""
};
export const getInitialValues = (values) => {
  return { ...emptyBankDetails, ...values };
};
