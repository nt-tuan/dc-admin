import { Button, Col, Modal, Row } from "antd";
import { RouteConst } from "commons/consts";
import { getRequestedProductsSchema } from "commons/schemas";
import { DTCTable } from "components/atoms";
import { AvailableProductModal } from "components/molecules";
import React, { memo, useState } from "react";
import { Link } from "react-router-dom";

export const RequestedProductsTable = memo(({ data, loading }) => {
  const [showModalReject, setIsShowModalReject] = useState(false);
  const [showModalAccept, setIsShowModalAccept] = useState(false);
  const [showModalAvailableProducts, setIsShowModalAvailableProducts] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const handleReject = () => {
    setIsShowModalReject(true);
  };

  const handleAccept = (requestData) => {
    setSelectedData(requestData);
    setIsShowModalAccept(true);
  };

  const onRejectRequest = () => {
    //TODO: APPLY API
    setIsShowModalReject(false);
  };

  const renderRejectRequestModal = () => {
    return (
      <Modal
        title="Are you sure?"
        visible={showModalReject}
        onCancel={() => setIsShowModalReject(false)}
        footer={[
          <Row className="justify-content-center">
            <Button
              key="back"
              onClick={() => setIsShowModalReject(false)}
              style={{ minWidth: "100px" }}
            >
              No
            </Button>
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={onRejectRequest}
              style={{ minWidth: "100px" }}
            >
              Yes
            </Button>
          </Row>
        ]}
      >
        <p className="text-center">Are sure you want to reject this request?</p>
      </Modal>
    );
  };

  const renderAcceptRequestModal = () => {
    return (
      <Modal
        title="Approve requested product"
        visible={showModalAccept}
        onCancel={() => setIsShowModalAccept(false)}
        footer={[
          <Row>
            <Col span={11}>
              <Link to={RouteConst.ADD_PRODUCT}>
                <Button type="primary">Create a new product</Button>
              </Link>
            </Col>
            <Col span={11}>
              <Button
                type="primary"
                onClick={() => {
                  setIsShowModalAccept(false);
                  setIsShowModalAvailableProducts(true);
                }}
              >
                Link to an available product
              </Button>
            </Col>
          </Row>
        ]}
      >
        <p className="text-center">Are sure you want to reject this request?</p>
      </Modal>
    );
  };

  return (
    <section>
      <Row className="mb-5">
        <Col span={20}>
          <h5>Requested Products</h5>
        </Col>
        <Col span={4}>
          <Link to={RouteConst.ADD_PRODUCT}>
            <Button block type="primary">
              Create a new product
            </Button>
          </Link>
        </Col>
      </Row>
      <DTCTable
        loading={loading}
        dataSource={data}
        schema={getRequestedProductsSchema(handleReject, handleAccept)}
        showSettings={false}
      />

      {renderAcceptRequestModal()}
      {renderRejectRequestModal()}
      <AvailableProductModal
        initialValues={selectedData}
        isVisibleModal={showModalAvailableProducts}
        onCancel={() => {
          setIsShowModalAccept(true);
          setIsShowModalAvailableProducts(false);
        }}
      />
    </section>
  );
});
