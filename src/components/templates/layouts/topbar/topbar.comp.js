import logoImgNotext from "assets/images/logo-notext.png";
import logoImg from "assets/images/logo.png";
import React from "react";
import style from "./topbar-comp.module.scss";
import { ProfileMenu } from "./user-menu/user-menu.comp";
import { UtilMediator } from "utils";

const { isScreensize } = UtilMediator.getgeneralUtils();

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
        <ProfileMenu />
      </div>
    </div>
  );
};
