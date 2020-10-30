import { Button, Col, Modal, Row } from "antd";
import { getTraderRulesActive } from "commons/schemas/trade-rules.schema";
import { DTCTable } from "components/atoms";
import React, { memo, useState } from "react";

export const TradeRulesActiveTab = memo((status) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(mockData);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowSuspendModal, setIsShowSuspendModal] = useState(false);

  const onSubmitSuspendTradeRule = () => {};
  const onSubmitDeleteTradeRule = () => {};

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

  const handleSuspendTradeRulesModal = () => {
    setIsShowSuspendModal(true);
  };
  const handleDeleteTradeRulesModal = () => {
    setIsShowDeleteModal(true);
  };
  const handleCreateTradeRules = () => {};

  return (
    <section className="air__utils__shadow bg-white p-4 dtc-br-10 mt-3">
      <DTCTable
        showSetting={false}
        loading={loading}
        dataSource={data}
        schema={getTraderRulesActive(
          handleCreateTradeRules,
          handleSuspendTradeRulesModal,
          handleDeleteTradeRulesModal
        )}
      />
      {renderSuspendModal()}
      {renderDeleteModal()}
    </section>
  );
});

const mockData = [
  {
    timestamp: "2020-10-29T13:41:41.297Z",
    productCategory: "productCategory",
    type: "productType",
    productName: "productName",
    numberOfDocuments: "1",
    status: "ACTIVE"
  },
  {
    timestamp: "2020-10-29T13:41:41.297Z",
    productCategory: "productCategory",
    type: "productType",
    productName: "productName",
    numberOfDocuments: "1",
    status: "SUSPENDED"
  }
];
