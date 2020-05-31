import { userMgtTableSchema } from "commons/schemas/user-management.schema";
import { AssignBadgesModal, ConfirmModal } from "components";
import { DTCTable } from "components/atoms";
import { useBooleanState } from "hooks/utilHooks";
import React, { Fragment, useEffect, useState } from "react";
import { UserService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";

// const { STATUS, STATUS_LABELS } = USER_MANAGEMENT_SCHEMA;

export const UserManagementSellerTab = () => {
  const [data, setData] = useState([]);
  const [currentCompanyId, setCurrentCompanyId] = useState();
  const [showAssignBadgeForm, toggleShowAssignBadgeForm] = useBooleanState(false);
  const [showConfirmForm, toggleConfirmForm] = useBooleanState(false);
  const [badges, setBadges] = useState([]);

  const toggleShowAssignBadgeFormWrapper = (companyId) => {
    asyncErrorHandlerWrapper(async () => {
      const badges = await UserService.getAvailableBadges({ companyId });
      setBadges(badges);
      toggleShowAssignBadgeForm();
    });
  };

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const data = await getAllRecordsFromAPI(UserService.getAllSeller);
      setData(data);
    });
  }, []);

  const handleLock = (companyId) => {
    setCurrentCompanyId(companyId);
    toggleConfirmForm();
  };

  const handleUnlock = (companyId) => {
    asyncErrorHandlerWrapper(async () => {
      await UserService.unsuspendUser({ companyId });
      const data = await getAllRecordsFromAPI(UserService.getAllSeller);
      setData(data);
    });
  };

  const handelConfirmLock = () => {
    asyncErrorHandlerWrapper(async () => {
      await UserService.suspendUser({ companyId: currentCompanyId });
      const data = await getAllRecordsFromAPI(UserService.getAllSeller);
      setData(data);
    });
  };
  return (
    <Fragment>
      <div className="air__utils__shadow bg-white p-4 dtc-br-10">
        <DTCTable
          showSetting={false}
          loading={false}
          dataSource={data}
          schema={userMgtTableSchema({
            onLock: handelConfirmLock,
            onUnlock: handleUnlock,
            onViewAssignBadges: toggleShowAssignBadgeFormWrapper
          })}
        />
      </div>

      <ConfirmModal
        showForm={showConfirmForm}
        toggleShowForm={toggleConfirmForm}
        onConfirmLock={handleLock}
        title="Please Confirm"
        innerText="Please note that if you disable the account, all the actions and processes of this user will be suspended."
      />

      <AssignBadgesModal
        badges={badges}
        showForm={showAssignBadgeForm}
        toggleShowForm={toggleShowAssignBadgeForm}
      />
    </Fragment>
  );
};

// const users = [
//   {
//     id: 1,
//     company: "Morphotech",
//     owner: "Seller Owner 1",
//     username: "Username 1",
//     email: "Email 1",
//     country: "Country 1",
//     contact: "Contact 1",
//     reputation: "4.5",
//     reputationList: [
//       { type: "STATUS_BADGE", value: 0.0 },
//       { type: "NUMBER_BADGE", value: 35.0 },
//       { type: "VALUE_BADGE", value: 5000.0 }
//     ],
//     status: STATUS_LABELS[STATUS.LIVE_SELLERS]
//   },
//   {
//     id: 2,
//     company: "Morphotech",
//     owner: "Seller Owner 2",
//     username: "Username 2",
//     email: "Email 2",
//     country: "Country 2",
//     contact: "Contact 2",
//     reputation: "4",
//     reputationList: [
//       { type: "STATUS_BADGE", value: 0.0 },
//       { type: "NUMBER_BADGE", value: 20.0 },
//       { type: "VALUE_BADGE", value: 110000.0 }
//     ],
//     status: STATUS_LABELS[STATUS.BUYING_SELLERS]
//   },
//   {
//     id: 3,
//     company: "Morphotech",
//     owner: "Seller Owner 3",
//     username: "Username 3",
//     email: "Email 3",
//     country: "Country 3",
//     contact: "Contact 3",
//     reputation: "5",
//     reputationList: [
//       { type: "STATUS_BADGE", value: 0.0 },
//       { type: "NUMBER_BADGE", value: 15.0 },
//       { type: "VALUE_BADGE", value: 125000.0 }
//     ],
//     status: STATUS_LABELS[STATUS.INACTIVE_SELLERS]
//   },
//   {
//     id: 4,
//     company: "Morphotech",
//     owner: "Seller Owner 4",
//     username: "Username 4",
//     email: "Email 4",
//     country: "Country 4",
//     contact: "Contact 4",
//     reputation: "5",
//     reputationList: [
//       { type: "STATUS_BADGE", value: 0.0 },
//       { type: "NUMBER_BADGE", value: 15.0 },
//       { type: "VALUE_BADGE", value: 125000.0 }
//     ],
//     status: STATUS_LABELS[STATUS.SUSPENDED]
//   }
// ];
