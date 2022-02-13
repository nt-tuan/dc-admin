import "./antd.scss";
import "./bootstrap.scss";
import "./bootstrap-grid.min.scss";

import React from "react";

const LAGECY_MODAL_PORTAL_ID = "lagecy-modal-portal";
export const Lagecy = ({ children }) => {
  return (
    <div className="lagecy">
      <div>{children}</div>
      <div id={LAGECY_MODAL_PORTAL_ID}></div>
    </div>
  );
};

export const getLagecyModalContainer = () => document.getElementById(LAGECY_MODAL_PORTAL_ID);
