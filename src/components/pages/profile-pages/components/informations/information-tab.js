import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Button, message } from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

//** components */
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { MESSAGES } from "commons/consts";
import { selectUsers } from "redux/user/user.duck";
import { requestPhoneCode, updateProfile } from "services/user-profile.service";
import * as USER_ACTIONS from "redux/user/user.duck";
import InformationEdit from "./form-information-edit";
import InformationView from "./information-view";

const InformationTab = memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();

  const users = useSelector(selectUsers);
  const { phoneVerified } = users;
  const [isEdit, setIsEdit] = useState(true);
  const [isVerified, setIsVerified] = useState(phoneVerified);

  useEffect(() => {
    setIsVerified(phoneVerified);
  }, [phoneVerified]);

  useEffect(() => {
    setIsVerified(location?.state?.isVerified);
  }, [location]);

  //** Handle Edit toggle */
  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  //** Handle send request opt */
  const handleSendRequest = () => {
    asyncErrorHandlerWrapper(async () => {
      try {
        await requestPhoneCode();
        setIsVerified(true);
      } catch (error) {}
    });
  };

  //** Edit Form information */
  const handleEditForm = async (data) => {
    try {
      await updateProfile(data);
      setIsEdit(true);
      message.success({
        content: MESSAGES.UPDATE_SUCCESSFUL
      });
      dispatch({ type: USER_ACTIONS.LOAD_CURRENT_ACCOUNT, payload: false });
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="d-flex align-items-center mt-2 mb-3">
          <h3 className="text-dark mb-0 mr-2 ">Profile Information</h3>
          <Button
            className="w-10"
            onClick={toggleEdit}
            icon={!isEdit ? <CloseOutlined /> : <EditOutlined />}
          />
        </div>
      </div>

      {isEdit ? (
        <InformationView
          users={users}
          isVerified={isVerified}
          handleSendRequest={handleSendRequest}
        />
      ) : (
        <div className="col-lg-12 col-md-12 col-sm-12">
          <InformationEdit users={users} handleEditForm={handleEditForm} />
        </div>
      )}
    </div>
  );
});

InformationTab.propTypes = {
  currentTab: PropTypes.string,
  handleTabClick: PropTypes.func
};

InformationTab.defaultProps = {
  title: null, // define title
  handleTabClick: () => {}
};

export default InformationTab;
