import { TfaTypeEnum } from "../models/enums";

type NullableString = string | undefined | null;
export const parseTfaSetting = (
  is2FA: boolean,
  method: NullableString,
  frequency: NullableString
) => {
  if (!is2FA) {
    return TfaTypeEnum.DISABLED;
  }
  return TfaTypeEnum[`${method}_${frequency}`];
};
export const parseTfaSettingFromServer = (tfaType: string | undefined | null) => {
  const entries = Object.entries(TfaTypeEnum);
  const matchedValue = entries.find(([_, value]) => value === tfaType);

  if (!matchedValue) return {};
  const [method, ...frequencyWords] = matchedValue[0].split("_");
  const frequency = frequencyWords?.join("_");
  if (frequency && method) return { frequency, method };
  return {};
};
