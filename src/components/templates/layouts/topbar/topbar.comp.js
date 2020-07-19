import React from "react";
import style from "./topbar-comp.module.scss";
import { ProfileMenu } from "./user-menu/user-menu.comp";
import { isScreensize } from "utils/general.util";

import styles from "./topbar-comp.module.scss";
import { RouteConst } from "commons/consts";
import { Link } from "react-router-dom";

export const TopBar = () => {
  return (
    <div className={style.topbar}>
      <div className="mr-auto">
        <img
          style={{ maxHeight: 60 }}
          className="ml-md-0 ml-4"
          src={`${process.env.PUBLIC_URL}/images/${
            isScreensize("sm") ? "logo-notext.png" : "logo.png"
          }`}
          alt={`${process.env.REACT_APP_COMPANY_NAME} logo`}
        />
      </div>
      <div className="d-flex align-items-center">
        <i className={`${styles.icon} fa fa-bell ${styles["bell-icon"]}`} />
        <Link to={RouteConst.WALLET}>
          <i className={`fas fa-wallet text-primary ${styles["wallet-icon"]} mx-4`} />
        </Link>
        <ProfileMenu />
      </div>
    </div>
  );
};
