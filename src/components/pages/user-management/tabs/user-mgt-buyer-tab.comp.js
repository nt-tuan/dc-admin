import { userMgtTableSchema } from "commons/schemas/user-management.schema";
import { AssignBadgesModal, ConfirmModal } from "components";
import { DTCTable } from "components/atoms";
import { useBooleanState } from "hooks/utilHooks";
import React, { Fragment, useEffect, useState } from "react";
import { UserService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
// import { USER_MANAGEMENT_SCHEMA } from "commons/schemas";

// const { STATUS, STATUS_LABELS } = USER_MANAGEMENT_SCHEMA;

export const UserManagementBuyerTab = () => {
  const [data, setData] = useState([]);
  const [currentCompanyId, setCurrentCompanyId] = useState();
  const [showAssignBadgeForm, toggleShowAssignBadgeForm] = useBooleanState(false);
  const [showConfirmForm, toggleConfirmForm] = useBooleanState(false);
  const [badges, setBadges] = useState([]);
  const [isAssigning, setIsAssigning] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleShowAssignBadgeFormWrapper = (companyId) => {
    asyncErrorHandlerWrapper(async () => {
      const badges = await UserService.getAvailableBadges({ companyId });
      setBadges(badges);
      toggleShowAssignBadgeForm();
      setCurrentCompanyId(companyId);
    });
  };

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const data = await getAllRecordsFromAPI(UserService.getAllBuyer);
      setData(data);
      setLoading(false);
    });
  }, []);

  const handleLock = (companyId) => {
    setCurrentCompanyId(companyId);
    toggleConfirmForm();
  };

  const handleUnlock = (companyId) => {
    asyncErrorHandlerWrapper(async () => {
      await UserService.unsuspendUser({ companyId });
      const data = await getAllRecordsFromAPI(UserService.getAllBuyer);
      setData(data);
    });
  };

  const handelConfirmLock = () => {
    asyncErrorHandlerWrapper(async () => {
      await UserService.suspendUser({ companyId: currentCompanyId });
      const data = await getAllRecordsFromAPI(UserService.getAllBuyer);
      setData(data);
    });
  };

  const handleAssignBadge = (types) => {
    setIsAssigning(true);
    asyncErrorHandlerWrapper(async () => {
      await Promise.all(
        types.map((type) => UserService.assignBadge({ companyId: currentCompanyId, type }))
      );
      setIsAssigning(false);
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
        onAssign={handleAssignBadge}
        loading={isAssigning}
      />
    </Fragment>
  );
};

// const users = [
//   {
//     id: "e32c8c28-7479-4f6b-8d46-b70d655d1b2e",
//     company: "Morphotech",
//     owner: "Buyer Owner 1",
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
//     status: STATUS_LABELS[STATUS.LIVE_BUYERS]
//   },
//   {
//     id: "226f83bf-fd68-4a28-88c0-67eaebb3c710",
//     company: "Morphotech",
//     owner: "Buyer Owner 2",
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
//     status: STATUS_LABELS[STATUS.BUYING_BUYERS]
//   },
//   {
//     id: "d1ca52db-b4b9-41d6-b4aa-79a2b995685b",
//     company: "Morphotech",
//     owner: "Buyer Owner 3",
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
//     status: STATUS_LABELS[STATUS.INACTIVE_BUYERS]
//   },
//   {
//     id: "5a695bbb-c5ad-4b22-bbcd-d79a050f31c6",
//     company: "Morphotech",
//     owner: "Buyer Owner 4",
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
//   },
//   {
//     id: "f11e9213-3e8b-494f-851c-d1868de56c7f",
//     company: "Morphotech",
//     owner: "Buyer Owner 4",
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
//   },
//   {
//     id: "3d95179e-56e9-4e4c-90a5-799820651b5c",
//     company: "Morphotech",
//     owner: "Buyer Owner 4",
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
//   },
//   {
//     id: "c6d51376-2465-4f19-b97e-b73ced3f51cf",
//     company: "Morphotech",
//     owner: "Buyer Owner 4",
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
