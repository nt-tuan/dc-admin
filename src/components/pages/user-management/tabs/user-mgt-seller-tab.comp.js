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

export const UserManagementSellerTab = () => {
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

  const getListSellers = useCallback(() => {
    asyncErrorHandlerWrapper(async () => {
      const data = await getAllRecordsFromAPI(UserService.getAllSeller);
      setData(parseDataToGridView(data));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getListSellers();
  }, [getListSellers]);

  const handleMarketplaceCredit = (id, isEnable) => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await UserService.manageMarketplaceCredit(id, isEnable);
      getListSellers();
    });
  };

  const handleLock = (companyId) => {
    setCurrentCompanyId(companyId);
    toggleConfirmForm();
  };

  const handleUnlock = (companyId) => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await UserService.unsuspendUser({ companyId });
      getListSellers();
    });
  };

  const handelConfirmLock = () => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await UserService.suspendUser({ companyId: currentCompanyId });
      getListSellers();
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
            onViewAssignBadges: toggleShowAssignBadgeFormWrapper,
            onHandleMarketplaceCredit: handleMarketplaceCredit
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
        assignedBadgesId={data?.find((comp) => comp.id === currentCompanyId)?.badgeDTOList}
        badges={badges}
        showForm={showAssignBadgeForm}
        toggleShowForm={toggleShowAssignBadgeForm}
        companyId={currentCompanyId}
        getListUsers={getListSellers}
        setLoading={setLoading}
      />
    </Fragment>
  );
};
