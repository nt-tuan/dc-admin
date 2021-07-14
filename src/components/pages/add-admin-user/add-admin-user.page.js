import React from "react";
import { Helmet } from "react-helmet";
import { RouteConst } from "commons/consts";
import { useHistory } from "react-router-dom";
import { AddUserForm } from "components/organisms/user-management/add-user-form.comp";

const AddAdminUser = () => {
  const history = useHistory();
  const handleCancel = () => {
    history.goBack();
  };
  const handleSuccess = () => {
    history.push(RouteConst.ADMIN_USER_MANAGEMENT);
  };
  return (
    <div>
      <Helmet title="Add User" />
      <div className="air__utils__shadow bg-white pt-2 pb-2 pr-4 pl-4 dtc-br-10">
        <div className="py-3 pr-3">
          <span className="text-primary">Add User</span>
        </div>
        <AddUserForm onCancel={handleCancel} onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default AddAdminUser;
