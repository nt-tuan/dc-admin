import React, { useState, memo } from "react";
import { useHistory } from "react-router-dom";

import { IconButton, Menu, MenuItem } from "@mui/material";
import { DeleteUserModal } from "../delete-user-modal.comp";
import { EditUserModal } from "../edit-user-modal.comp";

import { UserService } from "@/services";
import { useAsyncErrorHandler } from "@/utils/error-handler.util";
import { USER_STATUSES } from "../constant/user.const";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { RouteConst } from "@/commons/consts";

const ActionList = ({ user, setUsers }) => {
  const asyncErrorHandler = useAsyncErrorHandler();
  const [deletingUser, setDeletingUser] = useState();
  const [editingUser, setEditingUser] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenuDropdown = Boolean(anchorEl);
  const history = useHistory();

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
    history.push(RouteConst.EDIT_ADMIN_USER, clickedUser);
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
    asyncErrorHandler(async () => {
      await UserService.enableAdminUser(user.id);
      setUsers(updateUserStatus({ status: USER_STATUSES.ACTIVE }));
    });
  };

  const handleDeactiveUser = () => {
    asyncErrorHandler(async () => {
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

  const handleClickMenuIcon = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const overlayContent = (
    <Menu
      anchorEl={anchorEl}
      open={openMenuDropdown}
      onClose={handleCloseMenu}
      PaperProps={{
        style: {
          maxWidth: 150
        }
      }}
    >
      {user.status === USER_STATUSES.DISABLED && (
        <MenuItem key="0" onClick={handleActivateUser}>
          <a style={{ color: "black" }}>Activate</a>
        </MenuItem>
      )}
      {user.status === USER_STATUSES.ACTIVE && (
        <MenuItem key="1" onClick={handleDeactiveUser}>
          <a style={{ color: "black" }}>Deactivate</a>
        </MenuItem>
      )}
      {user.status !== USER_STATUSES.DELETED && (
        <MenuItem key="2" onClick={() => handleClickEditUser(user)}>
          <a style={{ color: "black" }}>Edit</a>
        </MenuItem>
      )}
      {user.status !== USER_STATUSES.DELETED && (
        <MenuItem key="3" onClick={() => showConfirmModal()}>
          <a style={{ color: "red" }}>Delete</a>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <>
      <DeleteUserModal
        user={user}
        isOpen={deletingUser ? true : false}
        onCancel={closeConfirmModal}
        onSuccess={handleDeleteUser}
      />
      <EditUserModal
        isOpen={editingUser ? true : false}
        user={editingUser}
        onCancel={handleCancelEditUser}
        onConfirm={handleEditUserSuccess}
      />
      <IconButton onClick={handleClickMenuIcon}>
        <MoreHorizRoundedIcon sx={{ fontSize: 25 }} htmlColor="#000000DE" />
      </IconButton>
      {overlayContent}
    </>
  );
};

export default memo(ActionList);
