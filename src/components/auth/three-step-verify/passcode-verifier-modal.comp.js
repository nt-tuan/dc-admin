import { Form, Formik } from "formik";
import {
  PASSCODE_INVALID,
  RouteConst,
  THREE_STEPS_SECURITY_STATUS,
  USER_TABS_NAME
} from "commons/consts";

import Button from "@mui/material/Button";
import { DTCModal } from "components/commons";
import { Link } from "react-router-dom";
import PassCodeItemForm from "../passcode/passcode-item-form";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import moment from "moment";
import { validatePasscode } from "services/user-profile.service";
import { useMessage } from "@/hooks/use-message";

const getPositionList = () => {
  let positionList = [];
  while (positionList.length < 3) {
    let position = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
    if (!positionList.includes(position)) positionList.push(position);
  }
  positionList.sort((a, b) => a - b);
  return positionList;
};

export function PasscodeVerifierModal({ visible, onCancel, onVerified }) {
  const [requiredPositions, setRequiredPositions] = React.useState(getPositionList());
  const message = useMessage();
  const popError = (content) => message.error(content);
  const handleError = (response) => {
    switch (response.status) {
      case THREE_STEPS_SECURITY_STATUS.INVALID:
        popError(PASSCODE_INVALID);
        break;
      case THREE_STEPS_SECURITY_STATUS.OTP_LOCKED:
        popError(
          `Your account will be locked ${moment
            .utc(response.updatedDate)
            .add(1, "h")
            .fromNow()} due to wrong OTP code 3 times`
        );
        break;
      case THREE_STEPS_SECURITY_STATUS.OTP_EXPIRED:
        popError("OTP expired");
        break;
      case THREE_STEPS_SECURITY_STATUS.PASSCODE_LOCKED:
        popError(
          `Your account will be locked ${moment
            .utc(response.updatedDate)
            .add(1, "d")
            .fromNow()} due to wrong passcode 3 times`
        );
        break;
      default:
        popError("Server error");
        break;
    }
  };

  const handle3StepsProcessResponse = (response) => {
    if (response.status === THREE_STEPS_SECURITY_STATUS.SUCCESS) {
      message.success("Verify successful");
      onVerified();
      return;
    }
    handleError(response);
  };

  const handleSubmit = (values) => {
    const array = requiredPositions.map((position) => ({
      position,
      value: values.passCode[position].toString()
    }));
    if (array.length > 0) {
      const data = {
        characterPasscodeList: array
      };
      asyncErrorHandlerWrapper(async () => {
        try {
          const response = await validatePasscode(data);
          handle3StepsProcessResponse(response);
        } catch (error) {
          if (error.message === "400") {
            message.error(PASSCODE_INVALID);
            return;
          }
          throw error;
        }
      });
    }
  };

  const handleCancel = () => {
    setRequiredPositions(getPositionList());
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <DTCModal
      open={Boolean(visible)}
      title="Enter your verification code"
      onClose={handleCancel}
      content={
        <Stack spacing={1}>
          <Typography>
            Please enter the characters {requiredPositions.map((item) => item + 1).join(", ")} from
            your passcode
          </Typography>
          <Formik
            onSubmit={handleSubmit}
            initialValues={{
              passCode: Array(6).fill("")
            }}
          >
            <Form>
              <Stack spacing={1}>
                <PassCodeItemForm name="passCode" characters={requiredPositions} />
                <Link to={`${RouteConst.PROFILE}/${USER_TABS_NAME.settings}`}>
                  Forgot passcode?
                </Link>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Stack>
            </Form>
          </Formik>
        </Stack>
      }
    />
  );
}
