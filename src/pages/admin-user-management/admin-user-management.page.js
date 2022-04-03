import React, { useEffect, useState, useMemo, useRef } from "react";
import { Helmet } from "react-helmet";
import { LoadingIndicator } from "@/components/commons";
import { UserService } from "@/services";
import { useAsyncErrorHandler } from "@/utils/error-handler.util";
import { getAllRecordsFromAPI } from "@/utils/general.util";
import { SEARCH_TIME, USER_STATUSES, USER_STATUS_LABELS } from "./constant/user.const";
import ActionList from "./components/action-list.comp";
import AdminUserHeader from "./components/header.comp";
import AdminUserContent from "./components/content.comp";
import { ContentWrapper, PageContainer, StyledChip, LoadingLayout } from "./style.comp";

const AdminUserManagement = () => {
  const asyncErrorHandler = useAsyncErrorHandler();
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [email, setEmail] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const searchRef = useRef();

  const haveUsers = useMemo(() => {
    return (Array.isArray(users) && users?.length > 0) || showContent;
  }, [users, showContent]);

  const tableLoading = useMemo(() => {
    return isSearching || !users;
  }, [users, isSearching]);

  const getStatusColor = (status) => {
    switch (true) {
      case status === USER_STATUSES.ACTIVE:
        return "success";
      case status === USER_STATUSES.INACTIVE:
        return "warning";
      case status !== USER_STATUSES.ACTIVE && status !== USER_STATUSES.INACTIVE:
        return "error";
      default:
        return "primary";
    }
  };

  const columns = useMemo(() => {
    return [
      {
        headerName: "Username",
        field: "username",
        width: 180,
        height: 56
      },
      {
        headerName: "Email",
        field: "email",
        width: 302,
        height: 56
      },
      {
        headerName: "First Name",
        field: "firstName",
        width: 180,
        height: 56
      },
      {
        headerName: "Last Name",
        field: "lastName",
        width: 180,
        height: 56
      },
      {
        headerName: "Status",
        width: 180,
        height: 56,
        field: "status",
        renderCell: ({ row }) => {
          const { status } = row;
          const statusColor = getStatusColor(status);
          return <StyledChip color={statusColor} label={USER_STATUS_LABELS[status]} />;
        }
      },
      {
        headerName: "Manage",
        field: "manage",
        sortable: false,
        renderCell: ({ row }) => {
          const user = row;
          return (
            <ActionList user={user} onDeleteSuccess={onHandleDeleteSuccess} setUsers={setUsers} />
          );
        },
        width: 130,
        height: 56
      }
    ];
  }, []);

  const adminUserContentProps = useMemo(() => {
    return {
      haveUsers,
      showSettings: false,
      loading: tableLoading,
      columns,
      columnBuffer: columns.length,
      dataSource: users,
      onPageChange: setPageIndex,
      onPageSizeChange: setPageSize,
      rowsPerPageOptions: [10, 25, 50],
      page: pageIndex,
      pageSize: pageSize
    };
  }, [columns, haveUsers, pageIndex, pageSize, tableLoading, users]);

  const handleSearchEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
    setIsSearching(true);
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }
    searchRef.current = setTimeout(() => {
      handleSetUsers(value);
    }, SEARCH_TIME);
  };

  const getAdminUsers = async (outerParams = {}) => {
    return asyncErrorHandler(async () => {
      const result = await getAllRecordsFromAPI(UserService.getAdminUsers, {
        outerParams
      });
      return result?.sort(
        (a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
      );
    });
  };

  const handleSetUsers = async (searchText = "") => {
    if (!showContent) setLoading(true);
    try {
      const result = await getAdminUsers({ searchText });
      setUsers(result);
      return result;
    } finally {
      setIsSearching(false);
      setLoading(false);
    }
  };

  const onHandleDeleteSuccess = async (filteredUsers) => {
    setShowContent(Array.isArray(filteredUsers) && filteredUsers.length > 0);
  };

  useEffect(() => {
    (async () => {
      const result = await handleSetUsers();
      setShowContent(Array.isArray(result) && result.length > 0);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !users) {
    return (
      <LoadingLayout>
        <LoadingIndicator />
      </LoadingLayout>
    );
  }

  return (
    <React.Fragment>
      <Helmet title="Users" />
      <PageContainer>
        <AdminUserHeader haveUsers={haveUsers} email={email} onSearchEmail={handleSearchEmail} />
        <ContentWrapper>
          <AdminUserContent {...adminUserContentProps} />
        </ContentWrapper>
      </PageContainer>
    </React.Fragment>
  );
};

export default AdminUserManagement;
