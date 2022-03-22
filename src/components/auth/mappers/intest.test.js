import { parseTfaSetting, parseTfaSettingFromServer } from ".";
import { TfaTypeEnum, MethodEnum, FrequencyTypesEnum } from "../models/enums";

test.each([
  [false, MethodEnum.GA, FrequencyTypesEnum.EVERY_LOGIN, TfaTypeEnum.DISABLED],
  [true, MethodEnum.GA, FrequencyTypesEnum.EVERY_LOGIN, TfaTypeEnum.GA_EVERY_LOGIN]
])("parseTfaSetting should work", (is2FA, method, frequency, expectValue) => {
  expect(parseTfaSetting(is2FA, method, frequency)).toEqual(expectValue);
});

test.each([
  [TfaTypeEnum.DISABLED, { method: undefined, frequency: undefined }],
  [
    TfaTypeEnum.EMAIL_EVERY_LOGIN,
    { method: MethodEnum.EMAIL, frequency: FrequencyTypesEnum.EVERY_LOGIN }
  ],
  ["", { method: undefined, frequency: undefined }]
])("parseTfaSettingFromServer should work", (tfaType, expectValue) => {
  expect(parseTfaSettingFromServer(tfaType)).toEqual(expectValue);
});
