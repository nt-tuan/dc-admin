import React, { useCallback, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { CircularProgress } from "@mui/material";
import { DTCModal } from "components/commons/dtc-modal/dtc-modal.comp";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Input from "@mui/material/Input";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import { UserService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { useMessage } from "hooks/use-message";

const BADGE_SIZE = 40;
const BadgeCheckbox = ({ badge, onChange, selected }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          value={badge.id}
          checked={selected?.some((item) => item.id === badge.id)}
          onChange={onChange}
        />
      }
      label={
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            component="img"
            src={badge.url}
            alt={badge.name}
            width={BADGE_SIZE}
            height={BADGE_SIZE}
          />
          <Box fontWeight="bold" alignItems="center">
            {badge.name}
          </Box>
        </Stack>
      }
    />
  );
};

const BadgeSelectForm = ({ onClose, username, getUserDetails = UserService.getUserDetails }) => {
  const message = useMessage();
  const [company, setCompany] = useState();
  const [isAssigning, setIsAssigning] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState([]);
  const [totalBadges, setTotalBadges] = useState();

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const badges = await UserService.getAllBadges();
      setTotalBadges(badges);
    });
  }, []);

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const userDetails = await getUserDetails(username);
      setCompany(userDetails.companyInfo);
      setSelected(userDetails.companyInfo.badgeList);
    });
  }, [username, getUserDetails]);

  const listBadgeFiltered = React.useMemo(() => {
    if (!totalBadges) return [];
    return totalBadges.filter((badge) =>
      badge.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, totalBadges]);

  const handleChange = useCallback(
    (e) => {
      const { value, checked } = e.target;
      if (checked) {
        if (selected.length >= 3) {
          message.error("You can not assign more than 3 user-defined badges to a user");
          return;
        }
        const selectedBadge = totalBadges?.find((item) => item.id === value);
        setSelected([selectedBadge, ...selected]);
      } else {
        setSelected(selected.filter((badge) => badge.id !== value));
      }
    },
    [totalBadges, selected, message]
  );

  const handleAssignBadge = useCallback(() => {
    setIsAssigning(true);
    asyncErrorHandlerWrapper(async () => {
      await UserService.assignBadges({
        companyId: company.id,
        badgeIdList: selected.map((item) => item.id)
      });
      setIsAssigning(false);
      onClose();
    });
  }, [company, selected, onClose]);
  if (totalBadges == null || company == null)
    return (
      <Box width="100%" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <FormGroup>
        {listBadgeFiltered
          .filter((badge) => selected?.some((selected) => selected.id === badge.id))
          .map((badge) => (
            <BadgeCheckbox
              key={badge.id}
              badge={badge}
              selected={selected}
              onChange={handleChange}
            />
          ))}
      </FormGroup>
      <Box my={2}>
        <Input
          endAdornment={<SearchIcon />}
          fullWidth
          placeholder="Search for Badges"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Box>
      <FormGroup>
        {listBadgeFiltered
          .filter((badge) => !selected?.some((selected) => selected.id === badge.id))
          .map((badge) => (
            <BadgeCheckbox
              key={badge.id}
              badge={badge}
              selected={selected}
              onChange={handleChange}
            />
          ))}
      </FormGroup>
      <Stack mt={4} direction="row" spacing={1} justifyContent="flex-end">
        <Button variant="contained" color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          onClick={handleAssignBadge}
          disabled={listBadgeFiltered.length === 0}
          loading={isAssigning}
        >
          Assign
        </LoadingButton>
      </Stack>
    </>
  );
};

export const AssignBadgesModal = ({ open, onClose, username, getUserDetails }) => {
  return (
    <DTCModal
      title="Choose and assign badges to your user"
      open={open}
      onClose={onClose}
      content={
        <BadgeSelectForm onClose={onClose} username={username} getUserDetails={getUserDetails} />
      }
      size="large"
    />
  );
};
