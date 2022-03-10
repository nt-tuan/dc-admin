export class RegexConst {
  static ATLEAST_1_LOWER_REGEX = "(?=.*[a-z])";
  static ATLEAST_1_UPPER_REGEX = "(?=.*[A-Z])";
  static ATLEAST_1_SPECIAL_REGEX = /(?=.*[\!"\#\$%&'\(\)\*\+,\-\.\/\:;\<\=\>\?@\[\\\]\^_`\{\|\}~])/;
  static ATLEAST_1_NUM_REGEX = "(?=.*[0-9])";
  static ONLY_NUMBER_REGEX = "^[0-9]+$";
  static NO_WHITE_SPACE_STRING = "^\\S*$";
  static ONLY_NORMAL_CHARACTERS_AND_UNDERSCORE_REGEX = "^[a-zA-Z0-9\\_]+$";
  static ONLY_INTERER_GREATER_THAN_ZERO_REGEX = "^\\s*(?=.*[1-9])\\d*(?:\\.\\d{0})?\\s*$";
  static NUMBER_WITH_ONLY_2_DECIMAL_POSITIONS = "^\\s*(?=.*[1-9])\\d*(?:\\.\\d{1,2})?\\s*$";
  static ONLY_8_TO_32_CHARS_REGEX = "^.{8,32}$";
}
