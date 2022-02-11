import Button from "@mui/material/Button";
import { DTCModal } from "components/commons";
import { Link } from "react-router-dom";
import React from "react";
import { SharedPaths } from "commons/consts/system/routes/shared-paths.const";
import Stack from "@mui/material/Stack";
import { USER_TABS_NAME } from "commons/consts";
import { generatePath } from "react-router-dom/cjs/react-router-dom.min";
const pathname = generatePath(SharedPaths.PROFILE_PAGES, { tabName: USER_TABS_NAME.settings });
export const PasscodeRequiredModal = ({ visible, onCancel }) => {
  return (
    <DTCModal
      open={Boolean(visible)}
      title="Please add passcode to your account to request withdrawal"
      onClose={onCancel}
      content={
        <div>
          <Stack justifyContent="center" alignItems="center">
            <Link to={{ pathname }}>
              <Button variant="contained">Add Passcode</Button>
            </Link>
          </Stack>
        </div>
      }
    />
  );
};
