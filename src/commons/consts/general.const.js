export const BADGE_TYPES = Object.freeze({
  STATUS_BADGE: "STATUS_BADGE",
  NUMBER_BADGE: "NUMBER_BADGE",
  VALUE_BADGE: "VALUE_BADGE"
});

export const BADGE_LEVELS = Object.freeze({
  [BADGE_TYPES.STATUS_BADGE]: {
    0: "Distributor",
    1: "Manufactor"
  },

  [BADGE_TYPES.NUMBER_BADGE]: {
    0: "blue",
    1: "bronze",
    2: "silver",
    3: "gold",
    4: "platinum"
  },
  [BADGE_TYPES.VALUE_BADGE]: {
    0: "blue",
    1: "bronze",
    2: "silver",
    3: "gold",
    4: "platinum"
  }
});

export const DATE_FORMAT = "YYYY-MM-DD";
export const DATETIME_FORMAT = "YYYY-MM-DD HH:mm A";

export const TIME_FIELDS = Object.freeze({
  week: "7",
  month: "30",
  year: "365"
});

export const TIME_LABELS = Object.freeze({
  [TIME_FIELDS.week]: "Week",
  [TIME_FIELDS.month]: "Month",
  [TIME_FIELDS.year]: "Year"
});
