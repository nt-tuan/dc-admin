import { UserManagementPageContainer } from "components";
import React, { memo } from "react";
import { UserManagementAllUserTab } from "./tabs/user-mgt-all-user-tab.comp";
import { UserManagementBuyerTab } from "./tabs/user-mgt-buyer-tab.comp";
import { UserManagementSellerTab } from "./tabs/user-mgt-seller-tab.comp";

export const UserManagementPage = () => {
  const renderBuyer = () => <UserManagementBuyerTab />;
  const renderSeller = () => <UserManagementSellerTab />;
  const renderAllUser = () => <UserManagementAllUserTab />;

  return (
    <UserManagementPageContainer
      title="User Management"
      renderBuyer={renderBuyer}
      renderSeller={renderSeller}
      renderAllUser={renderAllUser}
    />
  );
};

export default memo(UserManagementPage);
