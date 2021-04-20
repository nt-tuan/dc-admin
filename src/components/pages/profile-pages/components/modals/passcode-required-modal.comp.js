import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { USER_TABS_NAME } from "commons/consts";
import Modal from "antd/lib/modal/Modal";
import { SharedPaths } from "commons/consts/system/routes/shared-paths.const";
import { generatePath } from "react-router-dom/cjs/react-router-dom.min";
const pathname = generatePath(SharedPaths.PROFILE_PAGES, { tabName: USER_TABS_NAME.settings });
export const PasscodeRequiredModal = ({ visible, onCancel }) => {
  return (
    <Modal visible={visible} onCancel={onCancel} footer={null}>
      <div>Please add passcode to your account to request withdrawal</div>
      <div className="d-flex justify-content-center mt-3">
        <Link to={{ pathname }}>
          <Button type="primary">Add Passcode</Button>
        </Link>
      </div>
    </Modal>
  );
};
