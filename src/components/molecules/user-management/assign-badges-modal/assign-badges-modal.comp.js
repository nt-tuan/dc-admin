import React, { useCallback, useState, useEffect } from "react";
import qs from "qs";

import { Button, Checkbox, Modal, Empty, Input, Row, Col, message } from "antd";
import { ReactComponent as DistributorBadge } from "assets/icons/badges/distributor.svg";
import { ReactComponent as ManuFactorBadge } from "assets/icons/badges/manufactor.svg";
import { SearchOutlined } from "@ant-design/icons";
import UserVerifiedBadges from "assets/icons/badges/user-verified-badge.png";
import { USER_MANAGEMENT_SCHEMA } from "commons/schemas";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { UserService } from "services";
import "./assign-badges-modal.comp.scss";

const { BADGE_TYPES, BADGE_LABELS } = USER_MANAGEMENT_SCHEMA;

const IMAGE_SCHEMA = {
  [BADGE_TYPES.DISTRIBUTOR]: <DistributorBadge />,
  [BADGE_TYPES.MANUFACTURE]: <ManuFactorBadge />,
  [BADGE_TYPES.VERIFIED]: (
    <img className="w-100" src={UserVerifiedBadges} alt="User Verified Badge" />
  )
};

const BADGE_SIZE = 100;

export const AssignBadgesModal = ({
  showForm,
  toggleShowForm,
  companyId,
  getListUsers,
  assignedBadgesId,
  setLoading
}) => {
  const [isAssigning, setIsAssigning] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState([]);
  const [listBadgeFiltered, setListBadgeFiltered] = useState([]);
  const [totalBadges, setTotalBadges] = useState([]);

  const { username } = qs.parse(location.search, { ignoreQueryPrefix: true });

  const toggleShowAssignBadgeFormWrapper = useCallback(async () => {
    asyncErrorHandlerWrapper(async () => {
      const badges = await UserService.getAllBadges();
      setTotalBadges(badges);
      const res = await UserService.getUserDetails(username);
      setSelected(res?.companyInfo?.badgeList || []);
    });
  }, [username]);

  useEffect(() => {
    toggleShowAssignBadgeFormWrapper();
  }, [toggleShowAssignBadgeFormWrapper]);

  useEffect(() => {
    const filtered = totalBadges.filter((badge) =>
      badge.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setListBadgeFiltered(filtered);
  }, [searchValue, totalBadges]);

  const handleChange = useCallback(
    (e) => {
      const { value, checked } = e.target;
      if (checked) {
        if (selected.length >= 3) {
          message.error("You can not assign more than 3 user-defined badges to a user");
          return;
        }
        setSelected([...selected, value]);
      } else {
        setSelected(selected.filter((badge) => badge !== value));
      }
    },
    [selected]
  );

  const handleAssignBadge = useCallback(() => {
    setIsAssigning(true);
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await UserService.assignBadges({ companyId, badgeIdList: selected });
      await getListUsers();
      setIsAssigning(false);
      setLoading(false);
    });
  }, [companyId, selected, setLoading, getListUsers]);

  const renderItem = useCallback(
    (badge, index) => {
      return (
        <div className="col-6 col-sm-4 col-md-4 col-lg-4 mb-4" key={badge.id}>
          <div className="w-50 mx-auto">
            <img
              className="w-100"
              src={badge.url}
              // src={"http://s.cdpn.io/3/kiwi.svg"}
              alt={badge.name}
              width={BADGE_SIZE}
              height={BADGE_SIZE}
            />
          </div>
          <div className="font-weight-bold text-center">
            <Checkbox
              value={badge.id}
              checked={selected?.includes(badge.id)}
              onChange={handleChange}
            >
              {badge.name}
            </Checkbox>
          </div>
        </div>
      );
    },
    [handleChange, selected]
  );

  return (
    <Modal
      width={1000}
      title="Choose and assign badges to your user"
      visible={showForm}
      footer={null}
      onCancel={toggleShowForm}
      destroyOnClose={true}
    >
      <div className="assign-badge-modal">
        <Row>
          {listBadgeFiltered
            .filter((badge) => selected?.includes(badge.id))
            .map((badge, index) => renderItem(badge, index))}
        </Row>
        <Row className="mb-4">
          <Col span={12}>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search for Badges"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Col>
        </Row>
        {listBadgeFiltered.length === 0 ? (
          <div className="text-center w-100">
            <Empty description="This company has been assigned all badges available" />
          </div>
        ) : (
          <Row>
            {listBadgeFiltered
              .filter((badge) => !selected?.includes(badge.id))
              .map((badge, index) => renderItem(badge, index))}
          </Row>
        )}
      </div>
      <div className="col-12 mt-4 text-center">
        <Button key="cancel" className="mr-4 mb-2" onClick={toggleShowForm}>
          Cancel
        </Button>
        <Button
          key="assign"
          className="mb-2"
          type="primary"
          onClick={() => {
            handleAssignBadge();
            toggleShowForm();
          }}
          disabled={listBadgeFiltered.length === 0}
          loading={isAssigning}
        >
          Assign
        </Button>
      </div>
    </Modal>
  );
};
