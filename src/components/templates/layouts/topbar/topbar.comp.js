import React from "react";
import style from "./topbar-comp.module.scss";
import { ProfileMenu } from "./user-menu/user-menu.comp";
import { isScreensize } from "utils/general.util";

import styles from "./topbar-comp.module.scss";
import { RouteConst } from "commons/consts";
import { Link } from "react-router-dom";
import { NotificationPopup } from "components";
import { getAssetURL, getCompanyName } from "utils/config.util";

export const TopBar = () => {
  return (
    <div className={style.topbar}>
      <div className="mr-auto">
        <img
          style={{ maxHeight: 60 }}
          className="ml-md-0 ml-4"
          src={getAssetURL(`/images/${isScreensize("sm") ? "logo-notext.png" : "logo.png"}`)}
          alt={`${getCompanyName()} logo`}
        />
      </div>
      <div className="d-flex align-items-center">
        <NotificationPopup />
        <Link to={RouteConst.WALLET}>
          <i className={`fas fa-wallet text-primary ${styles["wallet-icon"]} mx-4`} />
        </Link>
        <ProfileMenu />
      </div>
    </div>
  );
};
