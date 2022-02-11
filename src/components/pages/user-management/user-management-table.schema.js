import Box from "@mui/material/Box";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { RouteConst } from "commons/consts";
import Stack from "@mui/material/Stack";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { UserBadge } from "components";

const FIELDS = {
  id: "id",
  companyName: "companyName",
  ownerName: "ownerName",
  username: "username",
  email: "email",
  country: "country",
  contact: "contact",
  reputation: "reputation",
  badges: "badges",
  userStatus: "userStatus",
  approved: "approved"
};

const LABELS = {
  [FIELDS.companyName]: "Company",
  [FIELDS.ownerName]: "Owner",
  [FIELDS.username]: "Username",
  [FIELDS.email]: "Email",
  [FIELDS.country]: "Country",
  [FIELDS.contact]: "Contact",
  [FIELDS.reputation]: "Scores",
  [FIELDS.badges]: "Badges",
  [FIELDS.userStatus]: "Status",
  // [FIELDS.enableMarketplaceCredit]: "Marketplace credit",
  // [FIELDS.enableProductCreation]: "Product Creation",
  [FIELDS.approved]: "Approved"
};

const USER_MGT_STATUS = {
  LIVE_SELLER: "LIVE_SELLER",
  SELLING_SELLER: "SELLING_SELLER",
  INACTIVE_SELLER: "INACTIVE_SELLER",
  SUSPENDED: "SUSPENDED",
  LIVE_BUYER: "LIVE_BUYER",
  BUYING_BUYER: "BUYING_BUYER",
  INACTIVE_BUYER: "INACTIVE_BUYER"
};

const USER_MGT_STATUS_LABELS = {
  [USER_MGT_STATUS.LIVE_SELLER]: "Live Seller",
  [USER_MGT_STATUS.SELLING_SELLER]: "Selling Seller",
  [USER_MGT_STATUS.INACTIVE_SELLER]: "Inactive Seller",
  [USER_MGT_STATUS.SUSPENDED]: "Suspended",
  [USER_MGT_STATUS.LIVE_BUYER]: "Live Buyer",
  [USER_MGT_STATUS.BUYING_BUYER]: "Buying Buyer",
  [USER_MGT_STATUS.INACTIVE_BUYER]: "Inactive Buyer"
};

const BADGE_TYPES = {
  STATUS_BADGE: "STATUS_BADGE",
  NUMBER_BADGE: "NUMBER_BADGE",
  VALUE_BADGE: "VALUE_BADGE",
  DISTRIBUTOR: "DISTRIBUTOR",
  MANUFACTURE: "MANUFACTURE",
  VERIFIED: "VERIFIED"
};

const BADGE_LABELS = {
  [BADGE_TYPES.STATUS_BADGE]: "Status Badge",
  [BADGE_TYPES.NUMBER_BADGE]: "Number Badge",
  [BADGE_TYPES.VALUE_BADGE]: "Value Badge",
  [BADGE_TYPES.DISTRIBUTOR]: "Distributor",
  [BADGE_TYPES.MANUFACTURE]: "Manufacturer",
  [BADGE_TYPES.VERIFIED]: "User Verified Badge"
};

export const USER_MANAGEMENT_SCHEMA = Object.freeze({
  FIELDS: FIELDS,
  LABELS: LABELS,
  STATUS: USER_MGT_STATUS,
  STATUS_LABELS: USER_MGT_STATUS_LABELS,
  BADGE_TYPES: BADGE_TYPES,
  BADGE_LABELS: BADGE_LABELS
});
export const getUserTableColumns = (actions) => [
  {
    headerName: LABELS[FIELDS.companyName],
    field: FIELDS.companyName,
    width: 200
  },
  {
    headerName: LABELS[FIELDS.ownerName],
    field: FIELDS.ownerName,
    width: 200
  },
  {
    headerName: LABELS[FIELDS.username],
    field: FIELDS.username,
    width: 200
  },
  {
    headerName: LABELS[FIELDS.email],
    field: FIELDS.email,
    width: 200
  },
  {
    headerName: LABELS[FIELDS.country],
    field: FIELDS.country,
    width: 200
  },
  {
    headerName: LABELS[FIELDS.contact],
    field: FIELDS.contact,
    width: 200
  },

  {
    headerName: LABELS[FIELDS.reputation],
    field: FIELDS.reputation,
    width: 100
  },
  {
    headerName: LABELS[FIELDS.badges],
    field: FIELDS.badges,
    width: 300,
    renderCell: (params) => {
      const badges = params.value;
      const badgeDTOList = params?.row?.badgeDTOList ?? [];
      return (
        <Stack direction="row" spacing={1}>
          {badges &&
            badges
              .sort((a, b) => b.value - a.value)
              .map((badge, index) => (
                <UserBadge key={badge.type} type={badge.type} value={badge.value} />
              ))}
          {badgeDTOList.map((badge, index) => {
            return (
              <Box key={`badgeDTOList-${index}`} style={{ width: 40, height: 40 }}>
                <img height={40} width={40} src={badge.url} alt={badge.name} />
              </Box>
            );
          })}
        </Stack>
      );
    }
  },
  {
    headerName: LABELS[FIELDS.userStatus],
    field: FIELDS.userStatus,
    width: 100
  },
  {
    headerName: "Manage",
    field: "manage",
    width: 150,
    renderCell: (params) => {
      const { id, suspended, username } = params.row;
      const onUnlock = (id) => {
        if (actions?.onUnlock == null) return;
        actions.onUnlock(id);
      };
      const onLock = (id) => {
        if (actions?.onLock == null) return;
        actions.onLock(id);
      };
      const onViewAssignBadges = (id) => {
        if (actions?.onViewAssignBadges == null) return;
        actions.onViewAssignBadges(params.row);
      };
      return (
        <>
          {suspended === true ? (
            <IconButton onClick={() => onUnlock(id)}>
              <PlayCircleIcon />
            </IconButton>
          ) : (
            <IconButton color="error" onClick={() => onLock(id)}>
              <PauseCircleIcon />
            </IconButton>
          )}
          <IconButton onClick={() => onViewAssignBadges(id)}>
            <EmojiEventsIcon />
          </IconButton>
          <Link to={`${RouteConst.USER_DETAILS}?username=${username}&companyId=${id}`}>
            <IconButton>
              <SubdirectoryArrowRightIcon />
            </IconButton>
          </Link>
        </>
      );
    }
  }
];
