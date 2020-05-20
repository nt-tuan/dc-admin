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
