import React, { useState, useCallback, useEffect, Fragment } from "react";
import { DTCTable } from "components/atoms";
import { useBooleanState } from "hooks/utilHooks";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { Modal, Button, Card, Divider } from "antd";
import { TableSetting } from "components/molecules";
import { MARKETPLACE_CREDIT_SCHEMA, creditRequestSchema } from "commons/schemas";
import { getAllRecordsFromAPI } from "utils/general.util";
import { CreditService } from "services";
import { parseDataCredit } from "commons/mappers";
import { DatetimeUtils } from "utils/date-time.util";

const { formatDateTime } = DatetimeUtils;

const { FIELDS, LABELS } = MARKETPLACE_CREDIT_SCHEMA;

const columnOptions = [
  FIELDS.timestamp,
  FIELDS.orderNumber,
  FIELDS.buyerCompanyName,
  FIELDS.productCategory,
  FIELDS.productType,
  FIELDS.productBrand,
  FIELDS.productName,
  FIELDS.quantity,
  FIELDS.unitPrice,
  FIELDS.totalPrice,
  FIELDS.creditTerms,
  FIELDS.paymentOverdue
];

export const CreditRequestTab = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTableSettings, toggleShowTableSettings] = useBooleanState(false);
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [isViewTable, toggleIsViewTable] = useBooleanState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // const [selectedRows, setSelectedRows] = useState([]);

  const getRequestList = useCallback(() => {
    asyncErrorHandlerWrapper(async () => {
      const res = await getAllRecordsFromAPI(CreditService.getCreditRequest);
      const parsedData = parseDataCredit(res);
      setData(parsedData);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getRequestList();
  }, [getRequestList]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // setSelectedRows(selectedRows);
      setSelectedRowKeys(selectedRowKeys);
    }
  };

  const handleAccept = (id) => {
    console.log("handleAccept -> id", id);
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await CreditService.manageCredit(id, true);
      getRequestList();
    });
  };

  const handleReject = (id) => {
    console.log("handleReject -> id", id);
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await CreditService.manageCredit(id, false);
      getRequestList();
    });
  };

  const handleAcceptAll = () => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await Promise.all(selectedRowKeys.map((id) => CreditService.manageCredit(id, true)));
      getRequestList();
    });
  };

  const handleRejectAll = () => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await Promise.all(selectedRowKeys.map((id) => CreditService.manageCredit(id, false)));
      getRequestList();
    });
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

  const renderTableSettingModal = () => {
    return (
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
    );
  };

  return (
    <Fragment>
      <div className="air__utils__shadow bg-white px-4 py-3 dtc-br-10 mt-3 d-flex justify-content-between align-items-center">
        <h5 className="m-0">Request List</h5>
        <i
          className={`fe fe-${isViewTable ? "grid" : "list"} text-primary`}
          style={{ fontSize: 19 }}
          onClick={() => toggleIsViewTable()}
        />
      </div>
      {isViewTable ? (
        <div className="air__utils__shadow bg-white p-4 dtc-br-10 mt-3">
          <DTCTable
            showSettings={false}
            loading={loading}
            dataSource={data}
            schema={creditRequestSchema(handleAccept, handleReject)}
            showSetting={true}
            onSettingClick={toggleShowTableSettings}
            hiddenColumns={hiddenColumns}
            rowSelection={rowSelection}
            renderFooter={() =>
              data.length > 0 && (
                <div className="text-center">
                  <Button
                    type="primary"
                    disabled={selectedRowKeys.length < 2}
                    onClick={handleAcceptAll}
                  >
                    Accept Requests Selected
                  </Button>
                  <Button
                    type="danger"
                    className="ml-2"
                    disabled={selectedRowKeys.length < 2}
                    onClick={handleRejectAll}
                  >
                    Reject Requests Selected
                  </Button>
                </div>
              )
            }
          />
          {renderTableSettingModal()}
        </div>
      ) : (
        <div className="row">
          {data.map((request) => (
            <div className="p-3 col-12 col-lg-6" key={request.id}>
              <Card>
                {columnOptions.map((field) => (
                  <div className="d-flex justify-content-between" key={field}>
                    <b>{LABELS[field]}:</b>
                    <div>{request[field]}</div>
                  </div>
                ))}
                <Divider />
                <div className="text-center">
                  <Button type="primary" className="mr-2" onClick={() => handleAccept(request.id)}>
                    Accept
                  </Button>
                  <Button onClick={() => handleReject(request.id)}>Reject</Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};
