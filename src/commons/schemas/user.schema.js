const FIELDS = {
  username: "username",
  firstName: "firstName",
  middleName: "middleName",
  lastName: "lastName",
  contractExpiryDate: "expiryDate",
  companyName: "companyName",
  country: "country",
  email: "email",
  phone: "phone",
  traderUserName: "traderUserName",
  traderCompanyName: "traderCompanyName"
};

const LABELS = {
  [FIELDS.username]: "Username",
  [FIELDS.firstName]: "First Name",
  [FIELDS.middleName]: "Middle Name",
  [FIELDS.lastName]: "Last Name",
  [FIELDS.contractExpiryDate]: "Contract Expiry Date",
  [FIELDS.companyName]: "Company Name",
  [FIELDS.country]: "Country",
  [FIELDS.email]: "Email",
  [FIELDS.phone]: "Phone",
  [FIELDS.traderUserName]: "Trader Username",
  [FIELDS.traderCompanyName]: "Trader Company Name"
};

export const USER_SCHEMA = Object.freeze({
  FIELDS,
  LABELS
});
