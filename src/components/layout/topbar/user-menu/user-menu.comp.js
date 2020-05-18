import { Avatar, Dropdown, Menu } from "antd";
import classNames from "classnames";
import { ROUTES, USER_TABS_NAME } from "commons/consts";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import * as USER_DUCK from "redux/user/user.duck";
import { disableLinkClick, getPrefixUrl } from "utils";
import styles from "./style.module.scss";

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
  const location = useLocation();
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
    const prefixUrl = getPrefixUrl(location.pathname);
    switch (prefixUrl) {
      case ROUTES.BUYER_PREFIX:
        return buildMenu({
          viewName: "Buyer",
          menuItems: [
            MENU_ITEMS("/buyer").profile,
            MENU_ITEMS(getPrefixUrl(location.pathname)).sublist,
            MENU_ITEMS(getPrefixUrl(location.pathname)).seller,
            MENU_ITEMS(getPrefixUrl(location.pathname)).userManagement,
            MENU_ITEMS(getPrefixUrl(location.pathname)).auditLog
          ]
        });
      case ROUTES.SELLER_PREFIX:
        return buildMenu({
          viewName: "Seller",
          menuItems: [
            MENU_ITEMS("/seller").profile,
            MENU_ITEMS(getPrefixUrl(location.pathname)).buyer,
            MENU_ITEMS(getPrefixUrl(location.pathname)).userManagement,
            MENU_ITEMS(getPrefixUrl(location.pathname)).auditLog
          ]
        });
      case ROUTES.ADMIN_PREFIX:
        return buildMenu({
          viewName: "Admin",
          menuItems: [
            MENU_ITEMS("/seller").profile,
            MENU_ITEMS(getPrefixUrl(location.pathname)).seller,
            MENU_ITEMS(getPrefixUrl(location.pathname)).userManagement,
            MENU_ITEMS(getPrefixUrl(location.pathname)).auditLog
          ]
        });
      default:
        break;
    }
  };

  return (
    <Dropdown overlay={getMenu()} trigger={["click"]}>
      {/* // onVisibleChange={addCount}> */}
      <div className={styles.dropdown}>
        {/* <Badge count={count}> */}
        <Avatar
          className={styles.avatar}
          shape="square"
          size="large"
          icon={<i className="fe fe-user" />}
        />
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

const authoNames = {
  UserManagementMenuItem: "UserManagementMenuItem",
  UserProfileTopMenuKey: "UserProfileTopMenu",
  UserSubListTopMenuKey: "UserSubListTopMenu",
  AuditLogMenuItem: "AuditLogMenuItem"
};

const MENU_ITEMS = (prefixUrl) => ({
  profile: {
    title: "My Profile",
    url: `${prefixUrl}${ROUTES.PROFILE}/${USER_TABS_NAME.profileInfo}`,
    iconClassesNames: ["fe fe-user"],
    authorizeName: authoNames.UserProfileTopMenuKey,
    disabledOnly: true
  },
  seller: {
    title: "Seller",
    url: ROUTES.SELLER_DASHBOARD_ROUTE,
    iconClassesNames: ["fe fe-corner-up-right"]
  },
  buyer: {
    title: "Buyer",
    url: ROUTES.BUYER_DASHBOARD_ROUTE,
    iconClassesNames: ["fe fe-corner-up-right"]
  },
  sublist: {
    title: "Product Subscriptions",
    url: ROUTES.BUYER_SUB_LIST,
    iconClassesNames: ["fe fe-shopping-cart"],
    authorizeName: authoNames.UserSubListTopMenuKey
  },
  roleManagement: {
    title: "Role Management",
    url: ROUTES.ADMIN_USER_MANAGEMENT_ROUTE,
    iconClassesNames: ["fe fe-unlock"]
  },
  userManagement: {
    title: "User Management",
    url: ROUTES.ADMIN_USER_MANAGEMENT_ROUTE,
    iconClassesNames: ["fe fe-users"],
    authorizeName: authoNames.UserManagementMenuItem
  },
  auditLog: {
    title: "Audit Log",
    url: ROUTES.ADMIN_AUDIT_LOG_ROUTE,
    iconClassesNames: ["fe fe-list"],
    authorizeName: authoNames.AuditLogMenuItem
  }
});
