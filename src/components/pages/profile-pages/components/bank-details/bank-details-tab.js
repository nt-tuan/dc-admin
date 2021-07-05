import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { selectUsers } from "redux/user/user.duck";
import BankDetailView from "./bank-detail-view";
import { getBankDetails, getCompanyInfo } from "services/bankDetail.service";
import { PhoneUnverifiedModal } from "components/pages/profile-pages/components/modals/phone-unverified-modal.comp";
import { PasscodeRequiredModal } from "../modals/passcode-required-modal.comp";
import { PhoneVerifierModal } from "../modals/phone-verifier.comp";
import { PasscodeVerifierModal } from "../modals/passcode-verifier-modal.comp";
import { BankDetailForm } from "./bank-detail-form";

const STATUS = {
  VIEW: "VIEW",
  PASSCODE_NOT_EXISTED: "PASSCODE_NOT_EXISTED",
  PHONE_NOT_VERIFIED: "PHONE_NOT_VERIFIED",
  VERIFYING_PHONE: "VERIFYING_PHONE",
  VERIFYING_PASSCODE: "VERIFYING_PASSCODE",
  EDITING: "EDITING"
};

const BankDetailsTab = () => {
  const users = useSelector(selectUsers);
  const [companyName, setCompanyName] = React.useState();
  const [isOTPVerified, setOTPVerified] = useState(false);
  const [isPasscodeVerified, setPasscodeVerified] = useState(false);
  const [isShowView, setIsShowView] = useState(true);
  const [bankDetails, setBankDetails] = useState();
  React.useEffect(() => {
    getCompanyInfo().then((company) => setCompanyName(company.name));
  }, []);

  const status = React.useMemo(() => {
    if (isShowView) return STATUS.VIEW;
    if (!users.phoneVerified) {
      return STATUS.PHONE_NOT_VERIFIED;
    }
    if (!users.existedPasscode) {
      return STATUS.PASSCODE_NOT_EXISTED;
    }
    if (!isOTPVerified) {
      return STATUS.VERIFYING_PHONE;
    }
    if (!isPasscodeVerified) {
      return STATUS.VERIFYING_PASSCODE;
    }
    return STATUS.EDITING;
  }, [isShowView, users, isOTPVerified, isPasscodeVerified]);

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

  //** Handle Edit toggle */
  const toggleEdit = () => {
    setIsShowView((state) => !state);
  };

  const switchToView = React.useCallback(() => {
    setIsShowView(true);
    setOTPVerified(false);
    setPasscodeVerified(false);
  }, []);

  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="d-flex align-items-center mt-2 mb-3">
          <h3 className="text-dark mb-0 mr-2 ">Bank Details</h3>
          <Button
            className="w-10"
            onClick={toggleEdit}
            icon={isShowView ? <EditOutlined /> : <CloseOutlined />}
          />
        </div>
        <h6>Bank Accounts linked to you wallet for removing and adding funds.</h6>
        <hr />
      </div>

      <PhoneUnverifiedModal visible={status === STATUS.PHONE_NOT_VERIFIED} onClose={switchToView} />
      <PasscodeRequiredModal
        visible={status === STATUS.PASSCODE_NOT_EXISTED}
        onCancel={switchToView}
      />
      <PhoneVerifierModal
        visible={status === STATUS.VERIFYING_PHONE}
        onCancel={switchToView}
        onVerified={() => setOTPVerified(true)}
      />
      <PasscodeVerifierModal
        visible={status === STATUS.VERIFYING_PASSCODE}
        onCancel={switchToView}
        onVerified={() => setPasscodeVerified(true)}
      />

      {status === STATUS.EDITING && (
        <div className="col-lg-12 col-md-12 col-sm-12">
          <BankDetailForm
            bankDetails={bankDetails}
            companyName={companyName}
            onUpdated={switchToView}
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
