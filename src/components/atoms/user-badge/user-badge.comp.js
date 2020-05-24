import { ReactComponent as ManuFactorBadge } from "assets/icons/distributor.svg";
import { ReactComponent as DistributorBadge } from "assets/icons/manufactor.svg";
import { ReactComponent as Transaction1Badge } from "assets/icons/new_badges/transaction-1.svg";
import { ReactComponent as Transaction2Badge } from "assets/icons/new_badges/transaction-2.svg";
import { ReactComponent as Transaction3Badge } from "assets/icons/new_badges/transaction-3.svg";
import { ReactComponent as Transaction4Badge } from "assets/icons/new_badges/transaction-4.svg";
import { ReactComponent as Transaction5Badge } from "assets/icons/new_badges/transaction-5.svg";
import { ReactComponent as TransactionSizeBadge1 } from "assets/icons/new_badges/transaction-size-1.svg";
import { ReactComponent as TransactionSizeBadge2 } from "assets/icons/new_badges/transaction-size-2.svg";
import { ReactComponent as TransactionSizeBadge3 } from "assets/icons/new_badges/transaction-size-3.svg";
import { ReactComponent as TransactionSizeBadge4 } from "assets/icons/new_badges/transaction-size-4.svg";
import { ReactComponent as TransactionSizeBadge5 } from "assets/icons/new_badges/transaction-size-5.svg";
import React from "react";
import { ConstMediator } from "commons/consts";
const { BADGE_TYPES } = ConstMediator.getGeneralConst();

export const UserBadge = ({ type, value }) => {
  const [tooltipText, Badge] = getBadge(type, value);
  return Badge ? (
    <span className="pr-1 pl-1 d-block" style={{ width: 40 }}>
      <div title={tooltipText}>
        <Badge />
      </div>
    </span>
  ) : null;
};

const getBadge = (type, value) => {
  switch (type) {
    case BADGE_TYPES.STATUS_BADGE: {
      if (value === 0) {
        return [];
      }
      if (value === 1) {
        return ["Manufactor Badge", ManuFactorBadge];
      }
      if (value === 2) {
        return ["Distributor Badge", DistributorBadge];
      }
      break;
    }
    case BADGE_TYPES.VALUE_BADGE: {
      if (value <= 50000) {
        return [];
      }
      if (50000 < value && value <= 100000) {
        return ["Largest Transaction: 50,000 $ - 100,000 $", Transaction1Badge];
      }
      if (100000 < value && value <= 150000) {
        return ["Largest Transaction: 100,000 $ - 150,000 $", Transaction2Badge];
      }
      if (150000 < value && value <= 250000) {
        return ["Largest Transaction: 150,000 $ - 250,000 $", Transaction3Badge];
      }
      if (250000 < value && value <= 500000) {
        return ["Largest Transaction: 250,000 $ - 500,000 $", Transaction4Badge];
      }
      if (value > 500000) {
        return ["Largest Transaction: > 500,000 $", Transaction5Badge];
      }
      break;
    }
    case BADGE_TYPES.NUMBER_BADGE: {
      if (value <= 9) {
        return [];
      }
      if (value <= 99) {
        return ["Number of Transactions: 10 - 99", TransactionSizeBadge1];
      }
      if (value <= 999) {
        return ["Number of Transactions: 100 - 999", TransactionSizeBadge2];
      }
      if (value <= 9999) {
        return ["Number of Transactions: 1000 - 9999", TransactionSizeBadge3];
      }
      if (value <= 99999) {
        return ["Number of Transactions: 10000 - 99999", TransactionSizeBadge4];
      }
      if (value > 99999) {
        return ["Number of Transactions: > 99999", TransactionSizeBadge5];
      }
      break;
    }
    default:
      return [];
  }
};
