import React, { memo } from "react";
import { UserManagementTable } from "./user-management-table";
import { Helmet } from "react-helmet";
import { DTCTabs, useTabSearchParams } from "components/commons";
import { UserService } from "services";

const tabs = [
  {
    key: "BUYER",
    label: "Buyer",
    component: <UserManagementTable getUserFn={UserService.getAllBuyer} />
  },
  {
    key: "SELLER",
    label: "Seller",
    component: <UserManagementTable getUserFn={UserService.getAllSeller} />
  },
  {
    key: "ALL_USER",
    label: "All User",
    component: <UserManagementTable getUserFn={UserService.getAllUsers} />
  }
];

export const UserManagementPage = () => {
  const [value, handleChange] = useTabSearchParams(tabs);
  return (
    <article>
      <Helmet title="User Management" />
      <DTCTabs tabs={tabs} value={value} onChange={handleChange} />
    </article>
  );
};

export default memo(UserManagementPage);
