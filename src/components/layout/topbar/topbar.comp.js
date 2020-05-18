import logoImgNotext from "assets/images/logo-notext.png";
import logoImg from "assets/images/logo.png";
import React from "react";
import { isScreensize, getPrefixUrl } from "utils";
// import Search from "./Search";
// import IssuesHistory from "./IssuesHistory";
// import Status from "./Status";
// import LanguageSwitcher from "./LanguageSwitcher";
import style from "./topbar-comp.module.scss";
import { ProfileMenu } from "./user-menu/user-menu.comp";
import { Link, useLocation } from "react-router-dom";

export const TopBar = () => {
  const location = useLocation();
  const prefixUrl = getPrefixUrl(location.pathname);

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
        <div className="mr-4">{/* <Actions /> */}</div>
        <div className="mr-4">
          <Link to={`${prefixUrl}/wallet`}>
            <i className="fas fa-2x fa-wallet text-primary" />
          </Link>
        </div>
        <div>
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
};
