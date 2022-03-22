import { Box, Button, Chip, Menu, MenuItem } from "@mui/material";
import { DTCSection, DTCTable } from "@/components/commons";
import React, { useEffect, useState } from "react";

import { DeleteUserModal } from "./delete-user-modal.comp";
import { EditUserModal } from "./edit-user-modal.comp";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { RouteConst } from "@/commons/consts";
import { UserService } from "@/services";
import { asyncErrorHandlerWrapper } from "@/utils/error-handler.util";
import { getAllRecordsFromAPI } from "@/utils/general.util";

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenuDropdown = Boolean(anchorEl);

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
      <Button variant="outlined" onClick={handleClickMenuIcon}>
        <MoreHorizIcon />
      </Button>
      {overlayContent}
    </>
  );
};

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllRecordsFromAPI(UserService.getAdminUsers).then((respondedUsers) => {
      const sortedUsers = respondedUsers.sort(
        (a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
      );
      setUsers(sortedUsers);
    });
  }, []);

  const getStatusColor = (status) => {
    switch (true) {
      case status === USER_STATUSES.ACTIVE:
        return "success";
      case status === USER_STATUSES.INACTIVE:
        return "warning";
      case status !== USER_STATUSES.ACTIVE && status !== USER_STATUSES.INACTIVE:
        return "secondary";
      default:
        return "primary";
    }
  };

  const columns = [
    {
      headerName: "Username",
      field: "username",
      width: 180
    },
    {
      headerName: "First Name",
      width: 180,
      field: "firstName"
    },
    {
      headerName: "Last Name",
      width: 180,
      field: "lastName"
    },
    {
      headerName: "Email",
      width: 280,
      field: "email"
    },
    {
      headerName: "Status",
      width: 150,
      field: "status",
      renderCell: ({ row }) => {
        const { status } = row;
        const statusColor = getStatusColor(status);
        return (
          <Chip color={statusColor} label={USER_STATUS_LABELS[status]} sx={{ borderRadius: 0 }} />
        );
      }
    },
    {
      headerName: "Manage",
      field: "manage",
      sortable: false,
      renderCell: ({ row }) => {
        const user = row;
        return <ActionList user={user} setUsers={setUsers} />;
      },
      width: 100
    }
  ];

  return (
    <React.Fragment>
      <Helmet title="User Management" />
      <DTCSection>
        <DTCSection.Content>
          <Link to={RouteConst.ADD_ADMIN_USER}>
            <Button variant="contained">Add new user</Button>
          </Link>
          <Box mt={2} sx={{ height: "500px" }}>
            <DTCTable
              showSettings={false}
              loading={users == null}
              columns={columns}
              columnBuffer={columns.length}
              dataSource={users}
            />
          </Box>
        </DTCSection.Content>
      </DTCSection>
    </React.Fragment>
  );
};

export default AdminUserManagement;
