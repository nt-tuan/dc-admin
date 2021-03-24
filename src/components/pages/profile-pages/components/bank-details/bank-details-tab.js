import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
// import PropTypes from "prop-types";
// import { Link, useHistory } from "react-router-dom";

//** Components */
import { selectUsers } from "redux/user/user.duck";
import { VerifyPhoneModal, OTPVerifyModal, VerifyPassCode } from "../modals";
import BankDetailForm from "./bank-detail-form";
import BankDetailView from "./bank-detail-view";
import { getCompanyMe, getBankDetails } from "services/bankDetail.service";

const BankDetailsTab = () => {
  const users = useSelector(selectUsers);
  // const dispatch = useDispatch();
  // const history = useHistory();

  const { phoneVerified } = users;
  // const [isEdit, setIsEdit] = useState(phoneVerified);
  const [isOTPRequest, setIsOTPRequest] = useState(false);

  const [isShowModalVerifyPhone, setShowModalVerifyPhone] = useState(false);
  const [isShowModalVerifyPassCode, setShowModalVerifyPassCode] = useState(true);
  const [isShowForm, setIsShowForm] = useState(false);
  const [isShowView, setIsShowView] = useState(true);
  const [companyName, setCompanyName] = useState(null);
  const [bankDetails, setBankDetails] = useState([]);

  //** Fetch Bank details */
  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      try {
        const res = await getBankDetails();
        setBankDetails(res);
      } catch (error) {
        message.error("Get Bank Detail Error");
      }
    });
  }, []);

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      try {
        const res = await getCompanyMe();
        setCompanyName(res?.name);
      } catch (error) {
        message.error("Get Company Name Error");
      }
    });
  }, []);

  //** Handle Edit toggle */
  const toggleEdit = () => {
    //** Check Verify Phone */

    if (!phoneVerified) {
      setShowModalVerifyPhone(!isShowModalVerifyPhone);
    } else {
      //** Show Modal PassCode */
      setIsOTPRequest(true);
    }
  };

  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="d-flex align-items-center mt-2 mb-3">
          <h3 className="text-dark mb-0 mr-2 ">Bank Details</h3>
          <Button
            className="w-10"
            onClick={toggleEdit}
            icon={!isShowForm ? <EditOutlined /> : <CloseOutlined />}
          />
        </div>
        <h6>Bank Accounts linked to you wallet for removing and adding funds.</h6>
        <hr />
      </div>

      {/* Show modal verify form */}
      {isShowModalVerifyPhone && (
        <VerifyPhoneModal
          isShowModalVerifyPhone={isShowModalVerifyPhone}
          setShowModalVerifyPhone={setShowModalVerifyPhone}
        />
      )}

      {/* Show modal Verify code OTP */}
      {isOTPRequest && (
        <OTPVerifyModal
          isOTPRequest={isOTPRequest}
          setIsOTPRequest={setIsOTPRequest}
          setShowModalVerifyPassCode={setShowModalVerifyPassCode}
        />
      )}

      {/* Show Modal verify passcode */}
      {isShowModalVerifyPassCode && (
        <VerifyPassCode
          setShowModalVerifyPassCode={setShowModalVerifyPassCode}
          isShowModalVerifyPassCode={isShowModalVerifyPassCode}
          setIsShowForm={setIsShowForm}
          setIsShowView={(val) => setIsShowView(val)}
        />
      )}

      {/* Show Form Bank Detail */}
      {isShowForm && (
        <div className="col-lg-12 col-md-12 col-sm-12">
          <BankDetailForm
            bankDetails={bankDetails}
            companyName={companyName}
            setIsShowForm={(val) => setIsShowForm(val)}
            setIsShowView={(val) => setIsShowView(val)}
          />
        </div>
      )}

      {/* Show Information view */}
      {isShowView && <BankDetailView />}
    </div>
  );
};

BankDetailsTab.propTypes = {};
BankDetailsTab.defaultProps = {};

export default BankDetailsTab;
