import React from "react";
import { Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import { RouteConst } from "commons/consts";

class IssuesHistory extends React.Component {
  render() {
    const menu = (
      <Menu selectable={false}>
        <Menu.ItemGroup title="Active">
          <Menu.Item>
            <Link to={RouteConst.HOME_ROUTE}>Project Management</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={RouteConst.HOME_ROUTE}>User Interface Development</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={RouteConst.HOME_ROUTE}>Documentation</Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Inactive">
          <Menu.Item>
            <Link to={RouteConst.HOME_ROUTE}>Marketing</Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.Divider />
        <Menu.Item>
          <Link to={RouteConst.HOME_ROUTE}>
            <i className={`${styles.menuIcon} fe fe-settings`} /> Settings
          </Link>
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={["click"]} placement="bottomLeft">
        <div className={styles.dropdown}>
          <i className={`${styles.icon} fe fe-book-open`} />
          <span className="d-none d-xl-inline">Issues History</span>
        </div>
      </Dropdown>
    );
  }
}

export default IssuesHistory;
