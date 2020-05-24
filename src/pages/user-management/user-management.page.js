import React, { memo } from "react";
import { UserManagementPageContainer } from "components";
import { UserManagementBuyerTab } from "./tabs/user-management-buyer-tab.comp";
import { UserManagementSellerTab } from "./tabs/user-management-seller-tab.comp";

export const UserManagementPage = () => {
  const renderBuyer = () => <UserManagementBuyerTab />;
  const renderSeller = () => <UserManagementSellerTab />;

  return (
    <UserManagementPageContainer
      title="User Management"
      renderBuyer={renderBuyer}
      renderSeller={renderSeller}
    />
  );
};

export default memo(UserManagementPage);
