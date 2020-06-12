const specialCharaters = "@#$%^&+=!()?";

export class RegexConst {
  ATLEAST_1_LOWER_REGEX = "(?=.*[a-z])";
  ATLEAST_1_UPPER_REGEX = "(?=.*[A-Z])";
  ATLEAST_1_SPECIAL_REGEX = `(?=.*[${specialCharaters}])`;
  ATLEAST_1_NUM_REGEX = "(?=.*[0-9])";
  ONLY_NUMBER_REGEX = "^[0-9]+$";
  // export const NO_WHITE_SPACE_STRING = "^\\S*$";
  ONLY_NORMAL_CHARACTERS_AND_UNDERSCORE_REGEX = "^[a-zA-Z0-9\\_]+$";
  ONLY_INTERER_GREATER_THAN_ZERO_REGEX = "^\\s*(?=.*[1-9])\\d*(?:\\.\\d{0})?\\s*$";
  NUMBER_WITH_ONLY_2_DECIMAL_POSITIONS = "^\\s*(?=.*[1-9])\\d*(?:\\.\\d{1,2})?\\s*$";
  ONLY_8_TO_32_CHARS_REGEX = "^.{8,32}$";
  ALL_ATLEAST_COMBINE = `(?=.*[a-z])(?=.*[A-Z])(?=.*[${specialCharaters}])(?=.*[0-9])^.{8,32}$`;
}
