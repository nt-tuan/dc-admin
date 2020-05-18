const specialCharaters = "@#$%^&+=!()?";

export const ATLEAST_1_LOWER_REGEX = "(?=.*[a-z])";
export const ATLEAST_1_UPPER_REGEX = "(?=.*[A-Z])";
export const ATLEAST_1_SPECIAL_REGEX = `(?=.*[${specialCharaters}])`;
export const ATLEAST_1_NUM_REGEX = "(?=.*[0-9])";
export const ONLY_NUMBER_REGEX = "^[0-9]+$";
// export const NO_WHITE_SPACE_STRING = "^\\S*$";
export const ONLY_NORMAL_CHARACTERS_AND_UNDERSCORE_REGEX = "^[a-zA-Z0-9\\_]+$";
export const ONLY_INTERER_GREATER_THAN_ZERO_REGEX = "^[1-9][0-9]*$";
export const NUMBER_WITH_ONLY_2_DECIMAL_POSITIONS = "^\\d+(\\.\\d{1,2})?$";
export const ONLY_NUMBER_GREATER_THAN_ZERO_REGEX =
  "^([0-9]*[1-9][0-9]*(.[0-9]+)?|[0]+.[0-9]*[1-9][0-9]*)$";
export const ONLY_8_TO_32_CHARS_REGEX = "^.{8,32}$";
export const ALL_ATLEAST_COMBINE = `(?=.*[a-z])(?=.*[A-Z])(?=.*[${specialCharaters}])(?=.*[0-9])^.{8,32}$`;
