import { userMgtTableSchema } from "commons/schemas/user-management.schema";
import { AssignBadgesModal, ConfirmModal } from "components";
import { DTCTable } from "components/atoms";
import { useBooleanState } from "hooks/utilHooks";
import React, { Fragment, useEffect, useState, useCallback } from "react";
import { UserService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import { userMapper } from "commons/mappers";

const { parseDataToGridView } = userMapper;

export const UserManagementAllUserTab = () => {
  const [data, setData] = useState([]);
  const [currentCompanyId, setCurrentCompanyId] = useState();
  const [showAssignBadgeForm, toggleShowAssignBadgeForm] = useBooleanState(false);
  const [showConfirmForm, toggleConfirmForm] = useBooleanState(false);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleShowAssignBadgeFormWrapper = (companyId) => {
    asyncErrorHandlerWrapper(async () => {
      const badges = await UserService.getAvailableBadges({ companyId });
      setBadges(badges);
      toggleShowAssignBadgeForm();
      setCurrentCompanyId(companyId);
    });
  };

  const getListAllUsers = useCallback(() => {
    asyncErrorHandlerWrapper(async () => {
      const data = await getAllRecordsFromAPI(UserService.getAllUsers);
      setData(parseDataToGridView(data));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getListAllUsers();
  }, [getListAllUsers]);

  const handleLock = (companyId) => {
    setCurrentCompanyId(companyId);
    toggleConfirmForm();
  };

  const handleUnlock = (companyId) => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await UserService.unsuspendUser({ companyId });
      getListAllUsers();
    });
  };

  const handelConfirmLock = () => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await UserService.suspendUser({ companyId: currentCompanyId });
      getListAllUsers();
      toggleConfirmForm();
    });
  };

  return (
    <Fragment>
      <div className="air__utils__shadow bg-white p-4 dtc-br-10">
        <DTCTable
          showSetting={false}
          loading={loading}
          dataSource={data}
          schema={userMgtTableSchema({
            onLock: handleLock,
            onUnlock: handleUnlock,
            onViewAssignBadges: toggleShowAssignBadgeFormWrapper
          })}
        />
      </div>

      <ConfirmModal
        showForm={showConfirmForm}
        toggleShowForm={toggleConfirmForm}
        onConfirmLock={handelConfirmLock}
        title="Please Confirm"
        innerText="Please note that if you disable the account, all the actions and processes of this user will be suspended."
      />

      <AssignBadgesModal
        badges={badges}
        showForm={showAssignBadgeForm}
        toggleShowForm={toggleShowAssignBadgeForm}
        companyId={currentCompanyId}
        getListUsers={getListAllUsers}
        setLoading={setLoading}
      />
    </Fragment>
  );
};

// const users = [
//   {
//     id: "d1ca52db-b4b9-41d6-b4aa-79a2b995685b",
//     companyName: "qa_seller",
//     username: "qa_seller",
//     email: "zec82993@gmail.com",
//     country: "vn",
//     contact: "123456789",
//     reputation: 0.0,
//     badges: [
//       { type: "NUMBER_BADGE", value: 15.0 },
//       { type: "VALUE_BADGE", value: 5000.0 },
//       { type: "MANUFACTURE", value: 0.0 },
//       { type: "DISTRIBUTOR", value: 0.0 }
//     ]
//   },
//   {
//     id: "e32c8c28-7479-4f6b-8d46-b70d655d1b2e",
//     companyName: "qa_seller",
//     username: "qa_seller",
//     email: "zec82993@gmail.com",
//     country: "vn",
//     contact: "123456789",
//     reputation: 0.0,
//     badges: [
//       { type: "NUMBER_BADGE", value: 15.0 },
//       { type: "VALUE_BADGE", value: 5000.0 },
//       { type: "MANUFACTURE", value: 0.0 },
//       { type: "DISTRIBUTOR", value: 0.0 }
//     ]
//   }
// ];
