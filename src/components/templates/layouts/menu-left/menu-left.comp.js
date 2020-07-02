import { Avatar, Layout } from "antd";
import classNames from "classnames";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { selectMenuData } from "redux/menu/reducers";
import * as SETTING_DUCK from "redux/settings/settings.duck";
import { selectCurrentUser } from "redux/user/user.duck";
import { getPrefixUrl } from "utils/general.util";
import Scrollbars from "react-custom-scrollbars";
import styles from "./menu-left-comp.module.scss";

const { Sider } = Layout;
const { selectSetting } = SETTING_DUCK;

const getRoleIcon = (role) => {
  switch (role) {
    case "seller":
      return <i className="fas fa-store-alt" />;
    case "buyer":
      return <i className="fe fe-shopping-bag" />;
    case "admin":
      return <i className="fas fa-user-shield" />;
    default:
      return <i className="fas fa-user" />;
  }
};

export const MenuLeft = () => {
  const [activeSubmenu, setActiveSubmenu] = useState("");
  const [activeItem] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const settings = useSelector(selectSetting);
  const user = useSelector(selectCurrentUser);
  const menuData = useSelector(selectMenuData);

  const urlPrefix = getPrefixUrl(location.pathname);
  const role = urlPrefix.replace("/", "");

  const toggleMenu = () => {
    const { isMenuCollapsed } = settings;
    dispatch({
      type: SETTING_DUCK.CHANGE_SETTING,
      payload: {
        setting: "isMenuCollapsed",
        value: !isMenuCollapsed
      }
    });
  };

  const toggleMobileMenu = () => {
    const { isMobileMenuOpen } = settings;
    dispatch({
      type: SETTING_DUCK.CHANGE_SETTING,
      payload: {
        setting: "isMobileMenuOpen",
        value: !isMobileMenuOpen
      }
    });
  };

  const handleSubmenuClick = (key) => {
    const { isMenuCollapsed } = settings;
    if (isMenuCollapsed) {
      toggleMenu();
    }
    setActiveSubmenu(activeSubmenu === key ? "" : key);
  };

  const generateMenuItems = () => {
    const menuItem = (item) => {
      const { key, title, icon, url } = item;
      if (item.category) {
        return (
          <li className={styles.air__menuLeft__category} key={key}>
            <span>{title}</span>
          </li>
        );
      }
      return (
        <li
          className={classNames(styles.air__menuLeft__item, {
            [styles.air__menuLeft__item__active]: activeItem === key
          })}
          key={key}
        >
          {item.url && (
            <NavLink
              title={title}
              exact
              to={url}
              className={styles.air__menuLeft__link}
              activeClassName={styles.air__menuLeft__item__active}
            >
              {icon && <i className={`${icon} ${styles.air__menuLeft__icon} font-size-18 mr-1`} />}
              <span className="font-size-14">{title}</span>
            </NavLink>
          )}
          {!item.url && (
            <span className={styles.air__menuLeft__link}>
              {icon && <i className={`${icon} ${styles.air__menuLeft__icon} font-size-18 mr-1`} />}
              <span>{title}</span>
            </span>
          )}
        </li>
      );
    };

    const submenuItem = (item) => {
      return (
        <li
          className={classNames(styles.air__menuLeft__item, styles.air__menuLeft__submenu, {
            [styles.air__menuLeft__submenu__active]: activeSubmenu === item.key
          })}
          key={item.key}
        >
          <span className={styles.air__menuLeft__link} onClick={() => handleSubmenuClick(item.key)}>
            <i className={`${item.icon} ${styles.air__menuLeft__icon} font-size-18 mr-1`} />
            <span>{item.title}</span>
          </span>
          <ul className={styles.air__menuLeft__list}>
            {item.children.map((sub) => {
              if (sub.children) {
                return submenuItem(sub);
              }
              return menuItem(sub);
            })}
          </ul>
        </li>
      );
    };
    return menuData.map((item) => {
      return item.children ? submenuItem(item) : menuItem(item);
    });
  };

  const renderUserSection = () => {
    return (
      <Link
        title="User Profile"
        to="/"
        className={classNames(styles.air__menuLeft__user)}
        style={{ cursor: "pointer" }}
      >
        <div className={classNames(styles.air__menuLeft__user__avatar)}>
          <Avatar shape="square" className="text-primary" size="large" icon={getRoleIcon(role)} />
        </div>
        <div>
          {/* <div className={styles.air__menuLeft__user__name}>{user.username}</div> */}
          <div className={styles.air__menuLeft__user__name}>User</div>
          <div className={styles.air__menuLeft__user__role}>{user.role}</div>
        </div>
      </Link>
    );
  };

  return (
    <Sider width="auto">
      <div
        className={classNames(styles.air__menuLeft, {
          [styles.air__menuLeft__mobileToggled]: settings.isMobileMenuOpen,
          [styles.air__menuLeft__toggled]: settings.isMenuCollapsed,
          [styles.air__menuLeft__unfixed]: settings.isMenuUnfixed,
          [styles.air__menuLeft__shadow]: settings.isMenuShadow,
          [styles.air__menuLeft__flyout]: settings.menuType === "flyout",
          [styles.air__menuLeft__compact]: settings.menuType === "compact",
          [styles.air__menuLeft__blue]: settings.menuColor === "blue",
          [styles.air__menuLeft__green]: settings.menuColor === "green",
          [styles.air__menuLeft__white]: settings.menuColor === "white",
          [styles.air__menuLeft__gray]: settings.menuColor === "gray",
          [styles.air__menuFlyout__black]:
            settings.flyoutMenuColor === "dark" && settings.menuType !== "default",
          [styles.air__menuFlyout__white]:
            settings.flyoutMenuColor === "white" && settings.menuType !== "default",
          [styles.air__menuFlyout__gray]:
            settings.flyoutMenuColor === "gray" && settings.menuType !== "default"
        })}
      >
        <div className={styles.air__menuLeft__outer}>
          <span className={styles.air__menuLeft__mobileToggleButton} onClick={toggleMobileMenu}>
            <span />
          </span>
          <span className={styles.air__menuLeft__toggleButton} onClick={toggleMenu}>
            <span />
            <span />
          </span>
          {renderUserSection()}

          {/* <div className={styles.air__menuLeft__container} style={{ overflow: "auto" }}> */}
          <Scrollbars height="100%">
            <ul className={styles.air__menuLeft__list}>{generateMenuItems()}</ul>
          </Scrollbars>
          {/* </div> */}
        </div>
      </div>
      <span className={styles.air__menuLeft__backdrop} onClick={toggleMobileMenu} />
    </Sider>
  );
};
