import React, { useEffect, useState, useMemo, useRef } from "react";
import { Helmet } from "react-helmet";
import { Box, Chip, Typography } from "@mui/material";
import { DTCSection, DTCTable, LoadingIndicator } from "@/components/commons";
import { UserService } from "@/services";
import { getAllRecordsFromAPI } from "@/utils/general.util";
import { SEARCH_TIME, USER_STATUSES, USER_STATUS_LABELS } from "./constant/user.const";
import ActionList from "./components/action-list.comp";
import SearchEmailInput from "./components/search-email-input.comp";
import NoUsers from "./components/no-users.comp";
import InviteUserButton from "./components/invite-user-button.comp";

const AdminUserManagement = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [email, setEmail] = useState("");
  const [searchedText, setSearchedText] = useState("");
  const searchRef = useRef();

  const haveUsers = useMemo(() => {
    return Array.isArray(users) && users?.length > 0;
  }, [users]);

  const tableLoading = useMemo(() => {
    return isSearching || !users;
  }, [users, isSearching]);

  const handleSearchEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
    setIsSearching(true);
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }
    searchRef.current = setTimeout(() => {
      setSearchedText(value);
      setIsSearching(false);
    }, SEARCH_TIME);
  };

  useEffect(() => {
    if (users === null) setLoading(true);
    if (haveUsers) setIsSearching(true);

    getAllRecordsFromAPI(UserService.getAdminUsers, { outerParams: { searchText: searchedText } })
      .then((respondedUsers) => {
        const sortedUsers = respondedUsers.sort(
          (a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
        );
        setUsers(sortedUsers);
      })
      .finally(() => {
        setLoading(false);
        setIsSearching(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedText]);

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
      width: 200
    },
    {
      headerName: "Email",
      width: 300,
      field: "email"
    },
    {
      headerName: "First Name",
      width: 200,
      field: "firstName"
    },
    {
      headerName: "Last Name",
      width: 200,
      field: "lastName"
    },
    {
      headerName: "Status",
      width: 180,
      field: "status",
      renderCell: ({ row }) => {
        const { status } = row;
        const statusColor = getStatusColor(status);
        return (
          <Chip color={statusColor} label={USER_STATUS_LABELS[status]} sx={{ borderRadius: 16 }} />
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
      width: 120
    }
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 200
        }}
      >
        <LoadingIndicator />
      </Box>
    );
  }

  return (
    <React.Fragment>
      <Helmet title="Users" />
      <DTCSection>
        <Box
          paddingTop={2}
          paddingLeft={2}
          paddingRight={2}
          display="flex"
          justifyContent="space-between"
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Typography variant="h5">Users</Typography>
          {users && !loading && (
            <Box display="flex" paddingTop={{ xs: 2, sm: 0 }}>
              <SearchEmailInput value={email} onChange={handleSearchEmail} />
              <InviteUserButton />
            </Box>
          )}
        </Box>
        <DTCSection.Content>
          {!users && <NoUsers />}
          <Box mt={2} sx={{ height: "500px" }}>
            {users && (
              <DTCTable
                showSettings={false}
                loading={tableLoading}
                columns={columns}
                columnBuffer={columns.length}
                dataSource={users}
                sx={{
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "grey.100",
                    boxShadow: "inset 0px -1px 0px rgba(0, 0, 0, 0.12)"
                  }
                }}
              />
            )}
          </Box>
        </DTCSection.Content>
      </DTCSection>
    </React.Fragment>
  );
};

export default AdminUserManagement;
