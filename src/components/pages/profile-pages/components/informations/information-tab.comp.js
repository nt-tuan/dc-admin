import * as USER_ACTIONS from "redux/user/user.duck";

import { Header, ToggleEditButton } from "components/commons";
import React, { memo, useState } from "react";
import { requestPhoneCode, updateProfile } from "services/user-profile.service";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import InformationEdit from "./information-edit.comp";
import InformationView from "./information-view.comp";
import { MESSAGES } from "commons/consts";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { useSnackbar } from "notistack";

const InformationTab = memo(() => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const user = useSelector(USER_ACTIONS.selectCurrentUser);
  const { phoneVerified } = user;
  const [isView, setIsView] = useState(true);

  //** Handle Edit toggle */
  const toggleEdit = () => {
    setIsView(!isView);
  };

  //** Handle send request opt */
  const handleSendRequest = () => {
    asyncErrorHandlerWrapper(async () => {
      try {
        await requestPhoneCode();
      } catch (error) {}
    });
  };

  //** Edit Form information */
  const handleEditForm = async (data) => {
    try {
      await updateProfile(data);
      setIsView(true);
      enqueueSnackbar(MESSAGES.UPDATE_SUCCESSFUL, {
        variant: "success"
      });
      dispatch({ type: USER_ACTIONS.LOAD_CURRENT_ACCOUNT, payload: false });
    } catch (error) {}
  };

  const { firstName, lastName, middleName, country, phone } = user;

  return (
    <Box>
      <Header
        action={<ToggleEditButton variant="contained" isEdit={!isView} onClick={toggleEdit} />}
      >
        Profile Information
      </Header>
      {isView ? (
        <InformationView
          user={user}
          isVerified={phoneVerified}
          handleSendRequest={handleSendRequest}
        />
      ) : (
        <InformationEdit
          initialValues={{ firstName, lastName, middleName, country, phone }}
          onSubmit={handleEditForm}
        />
      )}
    </Box>
  );
});

export default InformationTab;
