import React, { useState, useEffect } from "react";
import { Button, Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { DTCTable } from "components/atoms";
import { RouteConst } from "commons/consts";
import { getAllRecordsFromAPI } from "utils/general.util";
import { UserService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { DeleteUserModal } from "./delete-user-modal.comp";
import { EditUserModal } from "./edit-user-modal.comp";

const sortAlphabetically = (stringA, stringB) => {
  return stringA.localeCompare(stringB, "en", { sensitivity: "base" });
};

const USER_STATUSES = {
  ACTIVE: "ACTIVE",
  DISABLED: "DISABLED",
  INACTIVE: "INACTIVE",
  DELETED: "DELETED"
};

const USER_STATUS_LABELS = {
  ACTIVE: "ACTIVE",
  DISABLED: "INACTIVE",
  INACTIVE: "PENDING",
  DELETED: "DELETED"
};

const ActionList = ({ user, setUsers }) => {
  const [deletingUser, setDeletingUser] = useState();
  const [editingUser, setEditingUser] = useState();
  const updateUserStatus = (updatedData) => (users) => {
    return users.map((currentUser) => {
      if (currentUser.id !== user.id) return currentUser;
      return {
        ...currentUser,
        ...updatedData
      };
    });
  };
  const handleClickEditUser = (clickedUser) => {
    setEditingUser(clickedUser);
  };
  const handleCancelEditUser = () => {
    setEditingUser();
  };
  const handleEditUserSuccess = (editedUser) => {
    setUsers(updateUserStatus(editedUser));
    setEditingUser();
  };
  const handleDeleteUser = () => {
    setUsers((users) => users?.filter((currentUser) => currentUser.id !== user.id));
    setDeletingUser(false);
  };
  const handleActivateUser = () => {
    asyncErrorHandlerWrapper(async () => {
      await UserService.enableAdminUser(user.id);
      setUsers(updateUserStatus({ status: USER_STATUSES.ACTIVE }));
    });
  };
  const handleDeactiveUser = () => {
    asyncErrorHandlerWrapper(async () => {
      await UserService.disableAdminUser(user.id);
      setUsers(updateUserStatus({ status: USER_STATUSES.DISABLED }));
    });
  };

  const showConfirmModal = () => {
    setDeletingUser(user);
  };

  const closeConfirmModal = () => {
    setDeletingUser();
  };

  const overlayContent = (
    <Menu>
      {user.status === USER_STATUSES.DISABLED && (
        <Menu.Item key="0" onClick={handleActivateUser}>
          <a>Activate</a>
        </Menu.Item>
      )}
      {user.status === USER_STATUSES.ACTIVE && (
        <Menu.Item key="1" onClick={handleDeactiveUser}>
          <a>Deactivate</a>
        </Menu.Item>
      )}
      {user.status !== USER_STATUSES.DELETED && (
        <Menu.Item key="2" onClick={() => handleClickEditUser(user)}>
          <a>Edit</a>
        </Menu.Item>
      )}
      {user.status !== USER_STATUSES.DELETED && (
        <>
          <Menu.Item key="3" onClick={() => showConfirmModal()}>
            <a style={{ color: "red" }}>Delete</a>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <>
      <DeleteUserModal
        user={user}
        isOpen={deletingUser}
        onCancel={closeConfirmModal}
        onSuccess={handleDeleteUser}
      />
      <EditUserModal
        isOpen={editingUser != null}
        user={editingUser}
        onCancel={handleCancelEditUser}
        onConfirm={handleEditUserSuccess}
      />
      <Dropdown overlay={overlayContent} placement="bottomLeft" trigger={["click"]}>
        <Button>
          <i className="fe fe-more-horizontal" />
        </Button>
      </Dropdown>
    </>
  );
};

const AdminUserManagement = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    getAllRecordsFromAPI(UserService.getAdminUsers).then((respondedUsers) => {
      const sortedUsers = respondedUsers.sort(
        (a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
      );
      setUsers(sortedUsers);
    });
  }, []);

  const getSchema = (sortedInfo, CustomHighlighter, searchText, hiddenColumns) => [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => sortAlphabetically(a.username, b.username),
      sortOrder: sortedInfo.columnKey === "username" && sortedInfo.username,
      render: (username) => <CustomHighlighter searchText={searchText} value={username} />
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a, b) => sortAlphabetically(a.firstName, b.firstName),
      sortOrder: sortedInfo.columnKey === "firstName" && sortedInfo.firstName,
      render: (firstName) => <CustomHighlighter searchText={searchText} value={firstName} />
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: (a, b) => sortAlphabetically(a.lastName, b.lastName),
      sortOrder: sortedInfo.columnKey === "lastName" && sortedInfo.lastName,
      render: (lastName) => <CustomHighlighter searchText={searchText} value={lastName} />
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => sortAlphabetically(a.email, b.email),
      sortOrder: sortedInfo.columnKey === "email" && sortedInfo.email,
      render: (email) => <CustomHighlighter searchText={searchText} value={email} />
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => sortAlphabetically(a.status, b.status),
      sortOrder: sortedInfo.columnKey === "status" && sortedInfo.status,
      render: (status) => (
        <CustomHighlighter
          className={`text-uppercase ${
            status === USER_STATUSES.ACTIVE ? "bg-success" : "bg-secondary"
          } text-white py-1 px-2 font-size-12`}
          searchText={searchText}
          value={USER_STATUS_LABELS[status]}
        />
      )
    },
    {
      title: "Manage",
      render: (user) => {
        return <ActionList user={user} setUsers={setUsers} />;
      }
    }
  ];
  return (
    <React.Fragment>
      <Helmet title="User Management" />
      <div className="air__utils__shadow bg-white pt-2 pb-2 pr-4 pl-4 dtc-br-10">
        <div className="d-flex justify-content-end my-3">
          <Link to={RouteConst.ADD_ADMIN_USER}>
            <Button type="primary">Add new user</Button>
          </Link>
        </div>
        <DTCTable dataSource={users} schema={getSchema} loading={users == null} />
      </div>
    </React.Fragment>
  );
};

export default AdminUserManagement;
