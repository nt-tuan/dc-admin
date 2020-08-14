import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Rate, Button, Popover } from "antd";
import { roundToHalfDecimal } from "utils/general.util";
import { UserBadge } from "components/atoms";
import { useBooleanState } from "hooks/utilHooks";
import { AssignBadgesModal } from "components/molecules";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { UserService } from "services";

export const Reputation = ({ data, companyId, setLoading, getUserDetails }) => {
  const [isEdit, toggleIsEdit] = useBooleanState(false);
  const [badges, setBadges] = useState([]);

  const getBadges = useCallback(() => {
    asyncErrorHandlerWrapper(async () => {
      const badges = await UserService.getAvailableBadges({ companyId });
      setBadges(badges);
    });
  }, [companyId]);

  useEffect(() => {
    getBadges();
  }, [getBadges]);

  const handleRemoveBadge = async (type) => {
    await UserService.removeBadge(type, companyId);
    await getUserDetails();
    getBadges();
  };

  const renderPopoverContent = (type) => (
    <Fragment>
      <div>Do you want to remove this badge?</div>
      <div className="text-center mt-2">
        <Button type="primary" onClick={() => handleRemoveBadge(type)}>
          Yes
        </Button>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      <div className="d-flex">
        <h5 className="text-danger">Reputation</h5>
        <Button className="px-2 ml-2" onClick={() => toggleIsEdit()} title="Add badges">
          <i className="fe fe-edit" />
        </Button>
      </div>
      <div className="d-flex align-items-center h-100 mb-2">
        <strong className="mr-1 pt-2">Reputation: </strong>
        <span title={roundToHalfDecimal(data.reputation)}>
          <Rate allowHalf value={roundToHalfDecimal(data.reputation)} disabled />
        </span>
      </div>
      <div className="d-flex">
        <div className="d-flex align-items-center h-100">
          <b className="pr-1">Badges: </b>
          {data &&
            data.reputationList
              .sort((a, b) => b.value - a.value)
              .map((badge, index) => (
                <div key={badge.type}>
                  {badge.type === "VERIFIED" ? (
                    <Popover content={renderPopoverContent(badge.type)}>
                      <div>
                        <UserBadge type={badge.type} value={badge.value} />
                      </div>{" "}
                    </Popover>
                  ) : (
                    <UserBadge type={badge.type} value={badge.value} />
                  )}
                </div>
              ))}
        </div>
      </div>
      <AssignBadgesModal
        badges={badges}
        showForm={isEdit}
        toggleShowForm={toggleIsEdit}
        companyId={companyId}
        getListUsers={getUserDetails}
        setLoading={setLoading}
      />
    </Fragment>
  );
};
