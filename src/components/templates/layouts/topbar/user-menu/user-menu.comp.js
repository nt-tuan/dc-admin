import { Avatar, Dropdown, Menu } from "antd";
import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as USER_DUCK from "redux/user/user.duck";
import styles from "./style.module.scss";
import { disableLinkClick } from "utils/general.util";
import { RouteConst, USER_TABS_NAME } from "commons/consts";

const AuthorizedMenuItem = ({ canView, data = {} }) => {
  const { title, iconClassesNames, url } = data;
  return canView ? (
    <UserMenuItem title={title} iconClassesNames={iconClassesNames} url={url} />
  ) : (
    <UserMenuItem
      title={title}
      iconClassesNames={iconClassesNames}
      url={url}
      disabled={canView === false}
    />
  );
};

const _ProfileMenu = () => {
  const dispatch = useDispatch();
  const username = useSelector(USER_DUCK.selectUsername);

  const logout = () => {
    dispatch({
      type: USER_DUCK.LOGOUT
    });
  };

  const buildMenu = ({ viewName, menuItems }) => {
    return (
      <Menu className={`p-3 dtc-br-10`} selectable={false}>
        <div className="pl-1">
          <div className="text-uppercase">{username || "Anonymous"}</div>
          <div className="text-capitalize">{viewName}</div>
        </div>
        <Menu.Divider className="my-3" />
        {menuItems.map(({ title, iconClassesNames, url, authorizeName, disabledOnly }) => {
          if (authorizeName !== undefined) {
            return (
              <Menu.Item key={title} className={`pl-1 pr-1`} title={title}>
                <AuthorizedMenuItem
                  canView={true}
                  data={{ title, iconClassesNames, url }}
                  disabledOnly={disabledOnly}
                />
              </Menu.Item>
            );
          }
          return (
            <Menu.Item key={title} title={title} className="pl-1 pr-1">
              <UserMenuItem title={title} iconClassesNames={iconClassesNames} url={url} />
            </Menu.Item>
          );
        })}
        <Menu.Item className="pl-1 pr-1">
          <span
            className={classNames(
              "d-flex align-items-center text-decoration-none",
              styles["menu-item"]
            )}
            onClick={logout}
          >
            <i className={classNames(styles.menuIcon, "fe fe-log-out")} />
            <span>Log Out</span>
          </span>
        </Menu.Item>
      </Menu>
    );
  };

  const getMenu = () => {
    return buildMenu({
      viewName: "User",
      menuItems: [
        {
          title: "My Profile",
          url: `profile/${USER_TABS_NAME.profileInfo}`,
          iconClassesNames: ["fe fe-user"],
          disabledOnly: true
        },
        {
          title: "User Management",
          url: RouteConst.ADMIN_USER_MANAGEMENT,
          iconClassesNames: ["fe fe-users"],
          disabledOnly: true
        }
      ]
    });
  };

  return (
    <Dropdown overlay={getMenu()} trigger={["click"]}>
      {/* // onVisibleChange={addCount}> */}
      <div className={styles.dropdown}>
        {/* <Badge count={count}> */}
        <Avatar className={styles.avatar} shape="square" icon={<i className="fe fe-user" />} />
        {/* </Badge> */}
      </div>
    </Dropdown>
  );
};

export const ProfileMenu = React.memo(_ProfileMenu);

const UserMenuItem = React.memo(({ title, iconClassesNames, url, disabled = false }) => {
  return (
    <Link
      className={classNames("d-flex align-items-center text-decoration-none", styles["menu-item"])}
      to={url}
      onClick={(e) => disableLinkClick(disabled, e)}
      style={{ cursor: disabled ? "not-allowed" : "pointer" }}
    >
      <i className={classNames(styles.menuIcon, [...iconClassesNames])} />
      <span>{title}</span>
    </Link>
  );
});
