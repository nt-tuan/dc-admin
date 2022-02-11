import React, { useCallback, useEffect, useState } from "react";

import { AssignBadgesModal } from "components/molecules";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { UserBadge } from "components/atoms";
import { UserService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { roundToHalfDecimal } from "utils/general.util";
import { useBooleanState } from "hooks/utilHooks";

export const Reputation = ({ data, companyId, setLoading, getUserDetails, isEditable, user }) => {
  const [isEdit, toggleIsEdit] = useBooleanState(false);
  const [badges, setBadges] = useState([]);

  const getBadges = useCallback(() => {
    asyncErrorHandlerWrapper(async () => {
      const badges = await UserService.getAvailableBadges({ companyId });
      setBadges(badges);
    });
  }, [companyId]);

  useEffect(() => {
    getBadges();
  }, [getBadges]);

  const assignedBadges = user?.companyInfo?.badgeList;

  return (
    <Stack spacing={2}>
      <Stack spacing={1} direction="row" alignItems="center">
        <Typography color="error" variant="h4">
          Reputation
        </Typography>
        {isEditable && (
          <IconButton onClick={() => toggleIsEdit()} title="Add badges">
            <EditIcon />
          </IconButton>
        )}
      </Stack>
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <strong>Reputation: </strong>
          <Rating value={roundToHalfDecimal(data.reputation)} disabled />
        </Stack>
        <Stack direction="column">
          <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={1}>
            <b>Badges: </b>
            {data &&
              data.reputationList
                .sort((a, b) => b.value - a.value)
                .map((badge) => (
                  <UserBadge key={badge.type} type={badge.type} value={badge.value} />
                ))}
            {assignedBadges?.map((badge, idx) => (
              <Box w={40} h={40} title={badge.name}>
                <img height={40} width={40} src={badge.url} alt={badge.name} />
              </Box>
            ))}
          </Stack>
        </Stack>
        {isEdit && (
          <AssignBadgesModal
            assignedBadgesId={assignedBadges}
            badges={badges}
            showForm={isEdit}
            toggleShowForm={toggleIsEdit}
            companyId={companyId}
            getListUsers={getUserDetails}
            setLoading={setLoading}
            username={user.userInfo.username}
            styleTop={20}
          />
        )}
      </Stack>
    </Stack>
  );
};
