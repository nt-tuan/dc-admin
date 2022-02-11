import { RouteConst, USER_TABS_NAME } from "commons/consts";

import Button from "@mui/material/Button";
import { DTCModal } from "components/commons";
import React from "react";
import Stack from "@mui/material/Stack";
import { useHistory } from "react-router-dom";

export function PhoneUnverifiedModal({ visible, onCancel }) {
  const history = useHistory();
  return (
    <DTCModal
      title="Verify Phone Number"
      open={Boolean(visible)}
      onClose={onCancel}
      content={
        <div>
          <p>Please verify your mobile number to request withdrawal or edit bank details</p>
          <Stack alignItems="center" justifuContent="center">
            <Button
              variant="contained"
              onClick={() => {
                history.push({
                  pathname: `${RouteConst.PROFILE}/${USER_TABS_NAME.profileInfo}`,
                  search: "?isVerified=true"
                });
              }}
            >
              Verify Phone Number
            </Button>
          </Stack>
        </div>
      }
    ></DTCModal>
  );
}
