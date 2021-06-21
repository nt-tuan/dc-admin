import { ReactComponent as ManuFactorBadge } from "assets/icons/badges/distributor.svg";
import { ReactComponent as DistributorBadge } from "assets/icons/badges/manufactor.svg";
import { ReactComponent as Transaction1Badge } from "assets/icons/badges/transaction-1.svg";
import { ReactComponent as Transaction2Badge } from "assets/icons/badges/transaction-2.svg";
import { ReactComponent as Transaction3Badge } from "assets/icons/badges/transaction-3.svg";
import { ReactComponent as Transaction4Badge } from "assets/icons/badges/transaction-4.svg";
import { ReactComponent as Transaction5Badge } from "assets/icons/badges/transaction-5.svg";
import { ReactComponent as TransactionSizeBadge1 } from "assets/icons/badges/transaction-size-1.svg";
import { ReactComponent as TransactionSizeBadge2 } from "assets/icons/badges/transaction-size-2.svg";
import { ReactComponent as TransactionSizeBadge3 } from "assets/icons/badges/transaction-size-3.svg";
import { ReactComponent as TransactionSizeBadge4 } from "assets/icons/badges/transaction-size-4.svg";
import { ReactComponent as TransactionSizeBadge5 } from "assets/icons/badges/transaction-size-5.svg";
import UserVerifiedBadge from "assets/icons/badges/user-verified-badge.png";
import { BADGE_TYPES } from "commons/consts";
import React from "react";
import { toCurrency } from "utils";
import { getBadgeNumbers, getBadgeValues } from "utils/config.util";

const CUSTOM_BADGES = {
  VERIFIED: {
    text: "User Verified Badge",
    component: () => (
      <img height={40} width={40} src={UserVerifiedBadge} alt="User Verified Badge" />
    )
  }
};

const [
  numberBadgeNone,
  numberBadgeLevel1,
  numberBadgeLevel2,
  numberBadgeLevel3,
  numberBadgeLevel4,
  numberBadgeLevel5
] = getBadgeNumbers();
const [
  valueBadgeNone,
  valueBadgelevel1,
  valueBadgelevel2,
  valueBadgelevel3,
  valueBadgelevel4,
  valueBadgelevel5
] = getBadgeValues();

export const UserBadge = ({ type, value }) => {
  const [tooltipText, Badge] = getBadge(type, value);
  return Badge ? (
    <span className="pr-1 pl-1 d-block" style={{ width: 40 }}>
      <div title={tooltipText} style={{ width: 40, height: 40 }}>
        <Badge />
      </div>
    </span>
  ) : null;
};

const getBadge = (type, value) => {
  if (Object.keys(CUSTOM_BADGES).includes(type)) {
    return [CUSTOM_BADGES[type].text, CUSTOM_BADGES[type].component];
  }
  switch (type) {
    case BADGE_TYPES.MANUFACTURE: {
      return ["Manufactor Badge", ManuFactorBadge];
    }
    case BADGE_TYPES.DISTRIBUTOR: {
      return ["Distributor Badge", DistributorBadge];
    }
    case BADGE_TYPES.VALUE_BADGE: {
      if (value <= Number(valueBadgeNone)) {
        return [];
      }
      if (Number(valueBadgeNone) < value && value <= Number(valueBadgelevel1)) {
        return [
          `Largest Transaction: ${toCurrency(valueBadgeNone)} - ${toCurrency(valueBadgelevel1)}`,
          Transaction1Badge
        ];
      }
      if (Number(valueBadgelevel1) < value && value <= Number(valueBadgelevel2)) {
        return [
          `Largest Transaction: ${toCurrency(valueBadgelevel1)} - ${toCurrency(valueBadgelevel2)}`,
          Transaction2Badge
        ];
      }
      if (Number(valueBadgelevel2) < value && value <= Number(valueBadgelevel3)) {
        return [
          `Largest Transaction: ${toCurrency(valueBadgelevel2)} - ${toCurrency(valueBadgelevel3)}`,
          Transaction3Badge
        ];
      }
      if (Number(valueBadgelevel3) < value && value <= Number(valueBadgelevel4)) {
        return [
          `Largest Transaction: ${toCurrency(valueBadgelevel3)} - ${toCurrency(valueBadgelevel4)}`,
          Transaction4Badge
        ];
      }
      if (value > Number(valueBadgelevel5)) {
        return [`Largest Transaction: > ${toCurrency(valueBadgelevel5)}`, Transaction5Badge];
      }
      break;
    }
    case BADGE_TYPES.NUMBER_BADGE: {
      if (value <= Number(numberBadgeNone)) {
        return [];
      }
      if (value <= Number(numberBadgeLevel1)) {
        return [
          `Number of Transactions: ${Number(numberBadgeNone) + 1} - ${numberBadgeLevel1}`,
          TransactionSizeBadge1
        ];
      }
      if (value <= Number(numberBadgeLevel2)) {
        return [
          `Number of Transactions: ${Number(numberBadgeLevel1) + 1} - ${numberBadgeLevel2}`,
          TransactionSizeBadge2
        ];
      }
      if (value <= Number(numberBadgeLevel3)) {
        return [
          `Number of Transactions: ${Number(numberBadgeLevel2) + 1} - ${numberBadgeLevel3}`,
          TransactionSizeBadge3
        ];
      }
      if (value <= Number(numberBadgeLevel4)) {
        return [
          `Number of Transactions: ${Number(numberBadgeLevel3) + 1} - ${numberBadgeLevel4}`,
          TransactionSizeBadge4
        ];
      }
      if (value > Number(numberBadgeLevel5)) {
        return [`Number of Transactions: > ${numberBadgeLevel5}`, TransactionSizeBadge5];
      }
      break;
    }
    default:
      return [];
  }
};
