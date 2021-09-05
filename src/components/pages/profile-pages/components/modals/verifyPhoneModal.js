import React from "react";
import { Modal, Button } from "antd";
import { RouteConst, USER_TABS_NAME } from "commons/consts";
import { useHistory } from "react-router-dom";

function VerifyPhoneModal({ isShowModalVerifyPhone, setShowModalVerifyPhone }) {
  const history = useHistory();
  return (
    <Modal
      title="Verify Phone Number"
      visible={isShowModalVerifyPhone}
      footer={false}
      onCancel={() => setShowModalVerifyPhone(false)}
    >
      <p>Please verify your mobile number to request withdrawal or edit bank details</p>
      <div className="row align-items-center justify-content-center">
        <div className="col-lg-12 col-md-12 col-sm-12 text-center">
          <Button
            type="primary"
            onClick={() => {
              history.push({
                pathname: `${RouteConst.PROFILE}/${USER_TABS_NAME.profileInfo}`,
                state: { isVerified: true }
              });
            }}
          >
            Verify Phone Number
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default VerifyPhoneModal;
