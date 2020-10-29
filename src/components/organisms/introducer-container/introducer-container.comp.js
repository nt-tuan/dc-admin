import { Button, Modal } from "antd";
import { RouteConst } from "commons/consts";
import { getIntroducerSchema, INTRODUCER_SCHEMA } from "commons/schemas";
import { DTCTable } from "components/atoms";
import { TableSetting } from "components/molecules";
import { useBooleanState } from "hooks/utilHooks";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { IntroducerService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";

const { FIELDS, LABELS } = INTRODUCER_SCHEMA;

const columnOptions = [
  FIELDS.username,
  FIELDS.firstName,
  FIELDS.middleName,
  FIELDS.lastName,
  FIELDS.country,
  FIELDS.email,
  FIELDS.phone
];

export const IntroducerContainer = ({ data, loading, fetchData }) => {
  const [isShowDeleteConfirm, setIsShowDeleteConfirm] = useState();
  const [showTableSettings, toggleShowTableSettings] = useBooleanState(false);
  const [selectedId, setSelectedId] = useState();
  const [hiddenColumns, setHiddenColumns] = useState([]);

  const handleDelete = () => {
    asyncErrorHandlerWrapper(async () => {
      await IntroducerService.deleteIntroducer(selectedId);
      fetchData();
      setIsShowDeleteConfirm(false);
    });
  };

  const handleShowDeletePopup = (id) => {
    setSelectedId(id);
    setIsShowDeleteConfirm(true);
  };

  const handleSettingChange = (e) => {
    const { checked, option } = e.target;
    if (checked) {
      if (hiddenColumns.includes(option)) {
        setHiddenColumns(hiddenColumns.filter((col) => col !== option));
      }
    } else {
      if (!hiddenColumns.includes(option)) {
        setHiddenColumns([...hiddenColumns, option]);
      }
    }
  };
  return (
    <Fragment>
      <div className="text-right">
        <Link to={RouteConst.CREATE_INTRODUCER}>
          <Button type="primary" className="mb-3">
            Create Introducer
          </Button>
        </Link>
      </div>
      <DTCTable
        showSetting={true}
        onSettingClick={toggleShowTableSettings}
        hiddenColumns={hiddenColumns}
        loading={loading}
        dataSource={data}
        schema={getIntroducerSchema(handleShowDeletePopup)}
      />
      <Modal
        title="Delete confirmation"
        visible={isShowDeleteConfirm}
        okText="Yes"
        cancelText="No"
        onOk={handleDelete}
        onCancel={() => setIsShowDeleteConfirm(false)}
      >
        Are you sure you want to delete this user as an introducer? Please note that this action
        will only delete the introducer role of this user, he will still be active as a trader on
        your marketplace.
      </Modal>
      <Modal
        title={<h4>Show/Hide Columns</h4>}
        width={700}
        visible={showTableSettings}
        onCancel={toggleShowTableSettings}
        footer={null}
      >
        <TableSetting
          onSettingChange={handleSettingChange}
          columnOptions={columnOptions}
          labels={LABELS}
        />
      </Modal>
    </Fragment>
  );
};
