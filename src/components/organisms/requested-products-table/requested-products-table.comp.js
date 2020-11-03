import { Button, Col, Modal, Row } from "antd";
import { RouteConst, DATETIME_FORMAT } from "commons/consts";
import { getRequestedProductsSchema } from "commons/schemas";
import { DTCTable } from "components/atoms";
import { AvailableProductModal } from "components/molecules";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductRequestsService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import moment from "moment";
import { getAllRecordsFromAPI } from "utils/general.util";

export const RequestedProductsTable = memo(() => {
  const [showModalReject, setIsShowModalReject] = useState(false);
  const [showModalAccept, setIsShowModalAccept] = useState(false);
  const [showModalAvailableProducts, setIsShowModalAvailableProducts] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [removeData, setRemoveData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const mapRequestedProductsData = (requestedProducts) => {
    if (requestedProducts && requestedProducts.length > 0) {
      return requestedProducts.map((item) => {
        item.timestamp = moment(item.createdDate).format(DATETIME_FORMAT);
        return item;
      });
    }
    return [];
  };
  const getRequestedProductsData = useCallback(() => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      const result = await getAllRecordsFromAPI(ProductRequestsService.getRequestedProducts);
      setData(mapRequestedProductsData(result));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getRequestedProductsData();
  }, [getRequestedProductsData]);

  const handleReject = (removeProduct) => {
    setIsShowModalReject(true);
    setRemoveData(removeProduct);
  };

  const handleAccept = (requestData) => {
    setSelectedData(requestData);
    setIsShowModalAccept(true);
  };

  const onRejectRequest = () => {
    asyncErrorHandlerWrapper(async () => {
      await ProductRequestsService.rejectProduct(removeData.id);
      getRequestedProductsData();
    });
    setIsShowModalReject(false);
  };

  const renderRejectRequestModal = () => {
    return (
      <Modal
        title="Are you sure?"
        visible={showModalReject}
        onCancel={() => setIsShowModalReject(false)}
        footer={[
          <Row className="justify-content-center" key="reject-modal">
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
          <Row key="approve-product">
            <Col span={11}>
              {selectedData && (
                <Link
                  to={`${RouteConst.EDIT_PRODUCT.replace(
                    ":id",
                    `${selectedData.productName}`
                  )}?uid=${selectedData.id}&requestedProduct=true`}
                >
                  <Button type="primary">Create a new product</Button>
                </Link>
              )}
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
            <Button type="primary">Create a new product</Button>
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
        onSubmitSuccess={() => {
          getRequestedProductsData();
          setIsShowModalAccept(false);
          setIsShowModalAvailableProducts(false);
        }}
        onCancel={() => {
          setIsShowModalAccept(true);
          setIsShowModalAvailableProducts(false);
        }}
      />
    </section>
  );
});
