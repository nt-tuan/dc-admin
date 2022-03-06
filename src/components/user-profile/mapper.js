const TWO_FACTOR_AUTH_TYPES = Object.freeze({
  DISABLED: "TWOFA_DISABLED",
  PER_30_DAYS: "PER_30_DAYS",
  EVERY_LOGIN: "EVERY_LOGIN",
  WHATSAPP_PER_30_DAYS: "TWOFA_WHATSAPP_EVERY_30_DAYS",
  WHATSAPP_EVERY_LOGIN: "TWOFA_WHATSAPP_EVERY_LOGIN",
  EMAIL_PER_30_DAYS: "TWOFA_EMAIL_EVERY_30_DAYS",
  EMAIL_EVERY_LOGIN: "TWOFA_EMAIL_EVERY_LOGIN",
  SMS_PER_30_DAYS: "TWOFA_SMS_EVERY_30_DAYS",
  SMS_EVERY_LOGIN: "TWOFA_SMS_EVERY_LOGIN",
  GA_PER_30_DAYS: "TWOFA_GA_EVERY_30_DAYS",
  GA_EVERY_LOGIN: "TWOFA_GA_EVERY_LOGIN"
});

export const parseTfaSetting = (is2FA, method, frequency) => {
  if (!is2FA) {
    return TWO_FACTOR_AUTH_TYPES.DISABLED;
  }
  return TWO_FACTOR_AUTH_TYPES[`${method}_${frequency}`];
};
export const parseTfaSettingFromServer = (tfaType) => {
  const entries = Object.entries(TWO_FACTOR_AUTH_TYPES);
  const matchedValue = entries.find(([_, value]) => value === tfaType);

  if (!matchedValue) return {};
  const [method, ...frequencyWords] = matchedValue[0].split("_");
  const frequency = frequencyWords?.join("_");
  return { frequency, method };
};
