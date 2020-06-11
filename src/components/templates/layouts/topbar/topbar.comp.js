import logoImgNotext from "assets/images/logo-notext.png";
import logoImg from "assets/images/logo.png";
import React from "react";
import style from "./topbar-comp.module.scss";
import { ProfileMenu } from "./user-menu/user-menu.comp";
import { isScreensize } from "utils/general.util";

import styles from "./topbar-comp.module.scss";

export const TopBar = () => {
  return (
    <div className={style.topbar}>
      <div className="mr-auto">
        <img
          style={{ maxHeight: 60 }}
          className="ml-md-0 ml-4"
          src={isScreensize("sm") ? logoImgNotext : logoImg}
          alt="Disitchain logo"
        />
      </div>
      <div className="d-flex align-items-center">
        <i className={`${styles.icon} fa fa-bell ${styles["bell-icon"]}`} />
        <i className={`fas fa-wallet text-primary ${styles["wallet-icon"]} mx-4`} />
        <ProfileMenu />
      </div>
    </div>
  );
};
