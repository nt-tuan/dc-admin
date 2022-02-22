import React, { memo } from "react";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import { LOAD_CURRENT_ACCOUNT } from "redux/user/user.duck";
import Stack from "@mui/material/Stack";
import { WRONG_VERIFICATION_CODE } from "commons/consts";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { useDispatch } from "react-redux";
import { verifyPhoneCode } from "services/user-profile.service";
import { useMessage } from "@/hooks/use-message";

export const PhoneVerifyForm = memo(({ onClose }) => {
  const dispatch = useDispatch();
  const message = useMessage();
  const [serverError, setServerError] = React.useState();
  const [code, setCode] = React.useState("");

  //** Handle verify form */
  const handleVerifyPhone = () => {
    if (!code) return;
    asyncErrorHandlerWrapper(async () => {
      try {
        const res = await verifyPhoneCode(code.trim());
        dispatch({ type: LOAD_CURRENT_ACCOUNT, payload: false });
        if (res) {
          message.success("Verify successful");
        }
        onClose();
      } catch (e) {
        setServerError(WRONG_VERIFICATION_CODE);
      }
    });
  };

  return (
    <Stack direction="column" spacing={1}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Input value={code} onChange={(event) => setCode(event.target.value)} />
        <IconButton onClick={handleVerifyPhone} color="primary" aria-label="Confirm">
          <CheckIcon />
        </IconButton>
        <IconButton onClick={onClose} aria-label="Close">
          <CloseIcon />
        </IconButton>
      </Stack>
      {serverError && <FormHelperText error>{serverError}</FormHelperText>}
    </Stack>
  );
});
