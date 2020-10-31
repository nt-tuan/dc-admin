import { Button, Col, Modal, Row } from "antd";
import { getTraderRulesActive, TRADE_RULES_SCHEMA } from "commons/schemas/trade-rules.schema";
import { DTCTable } from "components/atoms";
import React, { memo, useCallback, useEffect, useState } from "react";
import { ProductService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";

const { STATUS } = TRADE_RULES_SCHEMA;
export const TradeRulesActiveTab = memo(() => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowSuspendModal, setIsShowSuspendModal] = useState(false);
  const [deletedId, setDeletedId] = useState();
  const [suspendedData, setSuspendedData] = useState({});

  const getActiveData = useCallback(() => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      const result = await ProductService.getProductTradeRulesActive();
      setData(result);
      setLoading(false);
    });
  });

  useEffect(() => {
    getActiveData();
  }, []);

  const onSubmitSuspendTradeRule = () => {
    if (suspendedData) {
      setLoading(true);
      asyncErrorHandlerWrapper(async () => {
        await ProductService.updateProductTradeRulesStatus(
          suspendedData.id,
          suspendedData.status === STATUS.ACTIVE ? STATUS.SUSPENDED : STATUS.ACTIVE
        );
        getActiveData();
        setIsShowSuspendModal(false);
        setLoading(false);
      });
    }
  };
  const onSubmitDeleteTradeRule = () => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await ProductService.updateProductTradeRulesStatus(deletedId, STATUS.DELETE);
      getActiveData();
      setIsShowDeleteModal(false);
      setLoading(false);
    });
  };

  const renderSuspendModal = () => {
    return (
      <Modal
        title="Are you sure?"
        visible={isShowSuspendModal}
        onCancel={() => setIsShowSuspendModal(false)}
        footer={[
          <Row key="suspend-modal">
            <Col span={11}>
              <Button onClick={() => setIsShowSuspendModal(false)} style={{ minWidth: "200px" }}>
                No
              </Button>
            </Col>
            <Col span={11}>
              <Button
                type="primary"
                style={{ minWidth: "200px" }}
                onClick={onSubmitSuspendTradeRule}
              >
                Yes
              </Button>
            </Col>
          </Row>
        ]}
      >
        <p className="text-center">
          Are you sure want to suspend the trade rules for this product?
        </p>
        <p className="text-center">
          Please note that without the trade rules, the traders in your platform won't be able to
          continue trading this product
        </p>
      </Modal>
    );
  };

  const renderDeleteModal = () => {
    return (
      <Modal
        title="Are you sure?"
        visible={isShowDeleteModal}
        onCancel={() => setIsShowDeleteModal(false)}
        footer={[
          <Row key="delete-modal">
            <Col span={11}>
              <Button onClick={() => setIsShowDeleteModal(false)} style={{ minWidth: "200px" }}>
                No
              </Button>
            </Col>
            <Col span={11}>
              <Button
                type="primary"
                style={{ minWidth: "200px" }}
                onClick={onSubmitDeleteTradeRule}
              >
                Yes
              </Button>
            </Col>
          </Row>
        ]}
      >
        <p className="text-center">Are you sure want to delete the trade rules for this product?</p>
        <p className="text-center">
          Please note that without the trade rules, the traders in your platform won't be able to
          continue trading this product
        </p>
      </Modal>
    );
  };

  const handleSuspendTradeRulesModal = (trade) => {
    setSuspendedData(trade);
    setIsShowSuspendModal(true);
  };
  const handleDeleteTradeRulesModal = (id) => {
    setDeletedId(id);
    setIsShowDeleteModal(true);
  };

  return (
    <section className="air__utils__shadow bg-white p-4 dtc-br-10 mt-3">
      <DTCTable
        showSetting={false}
        loading={loading}
        dataSource={data}
        schema={getTraderRulesActive(handleSuspendTradeRulesModal, handleDeleteTradeRulesModal)}
      />
      {renderSuspendModal()}
      {renderDeleteModal()}
    </section>
  );
});

// const mockData = [
//   {
//     timestamp: "2020-10-29T13:41:41.297Z",
//     productCategory: "productCategory",
//     type: "productType",
//     productName: "productName",
//     numberOfDocuments: "1",
//     status: "ACTIVE"
//   },
//   {
//     timestamp: "2020-10-29T13:41:41.297Z",
//     productCategory: "productCategory",
//     type: "productType",
//     productName: "productName",
//     numberOfDocuments: "1",
//     status: "SUSPENDED"
//   }
// ];
