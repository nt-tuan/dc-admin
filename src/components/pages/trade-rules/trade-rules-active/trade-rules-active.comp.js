import { Button, Col, Modal, Row } from "antd";
import { getTraderRulesActive, TRADE_RULES_SCHEMA } from "commons/schemas/trade-rules.schema";
import { DTCTable } from "components/atoms";
import React, { memo, useCallback, useEffect, useState } from "react";
import { ProductRuleService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import moment from "moment";
import { DATETIME_FORMAT } from "commons/consts";

const { STATUS, FIELDS } = TRADE_RULES_SCHEMA;
export const TradeRulesActiveTab = memo((status) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowSuspendModal, setIsShowSuspendModal] = useState(false);
  const [deletedId, setDeletedId] = useState();
  const [suspendedData, setSuspendedData] = useState({});

  const getActiveData = useCallback(() => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      const result = await getAllRecordsFromAPI(ProductRuleService.getProductTradeRules, {
        outerParams: status
      });
      setData(mapProductRules(result));
      setLoading(false);
    });
  }, [status]);

  const mapProductRules = (data) => {
    return data.map((item) => {
      item[FIELDS.timestamp] = moment(item[FIELDS.timestamp]).format(DATETIME_FORMAT);
      item[FIELDS.id] = item[FIELDS.productId];
      item[FIELDS.numberOfDocuments] = item[FIELDS.productRuleResponseList].filter(
        (item) => item.routeDocumentTypeId
      ).length;
      return item;
    });
  };

  useEffect(() => {
    getActiveData();
  }, [getActiveData]);

  const onSubmitSuspendTradeRule = () => {
    if (suspendedData) {
      setLoading(true);
      asyncErrorHandlerWrapper(async () => {
        await ProductRuleService.updateProductTradeRulesStatus(
          suspendedData.id,
          suspendedData.status === STATUS.ACTIVE ? STATUS.SUSPENDED : STATUS.START
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
      await ProductRuleService.updateProductTradeRulesStatus(deletedId, STATUS.DELETE);
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
