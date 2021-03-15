import { Button, message, Modal } from "antd";
import { RouteConst } from "commons/consts";
import { DTCSection, LoadMoreButton, ProductCard, SearchBar } from "components/atoms";
import { withListItem } from "HOCs/withListItem";
import { usePaginatedApiService } from "hooks/useApiService";
import debounce from "lodash/debounce";
import React from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { ProductService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { useDispatch } from "react-redux";
import * as STORAGE_DUCK from "redux/storage/storage.duck";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const ListProductCard = withListItem({ xxl: 6, xl: 6, lg: 8, md: 12, sm: 12, xs: 24, gutter: 30 })(
  ProductCard
);

const ProductDatabase = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [
    { data: products, isLoading, isLoadMore, page, totalPages },
    { setIsLoading, onSearch, onReFetch, onLoadMore }
  ] = usePaginatedApiService(ProductService.getProducts, {
    itemPerPage: 8
  });

  const handleDeleteProduct = debounce((id, setLoading, setHidden) => {
    confirm({
      title: "Are you sure you want to delete the Product Template ?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        setLoading(true);
        asyncErrorHandlerWrapper(async () => {
          await ProductService.deleteProduct(id);
          onReFetch();
          setLoading(false);
          setHidden(true);
          message.success("Successful");
        });
      }
    });
  }, 100);

  const selectImageFromProduct = (product) => {
    if (product && product.images && product.images.length > 0) {
      return product.images[0].url;
    }
    if (product && product.importImages && product.importImages.length > 0) {
      return product.importImages[0].url;
    }
    return "";
  };

  return (
    <article>
      <Helmet title="Product Database" />
      <DTCSection className="d-flex justify-content-between align-items-center">
        <SearchBar onSubmit={onSearch} onTyping={() => setIsLoading(true)} />
        <Button type="primary" onClick={() => history.push(RouteConst.ADD_PRODUCT)}>
          Add Product
        </Button>
      </DTCSection>
      <section>
        <ListProductCard
          disableNavigation={true}
          isLoading={isLoading}
          renderHoverContent={(product, loading, setLoading, setHidden) => {
            return (
              <div className="d-flex justify-space-between align-items-center flex-column">
                <Button
                  className="w-100"
                  title={`Edit ${product.name}`}
                  onClick={(e) => {
                    dispatch({
                      type: STORAGE_DUCK.CLEAR_FROM_STORAGE,
                      payload: { pageName: "EditProductPage" }
                    });
                    history.push(
                      `${RouteConst.EDIT_PRODUCT.replace(":id", `${product.name}`)}?uid=${
                        product.id
                      }`
                    );
                  }}
                >
                  <div className="text-truncate">{`Edit ${product.name}`}</div>
                </Button>
                <Button
                  className="mt-3 w-100"
                  title={`Duplicate ${product.name}`}
                  onClick={() => {
                    history.push(`${RouteConst.ADD_PRODUCT}?uid=${product.id}`);
                  }}
                >
                  <div className="text-truncate">{`Duplicate ${product.name}`}</div>
                </Button>
                <Button
                  className="mt-3"
                  loading={loading}
                  disabled={loading}
                  onClick={() => handleDeleteProduct(product.id, setLoading, setHidden)}
                  style={{ width: 80 }}
                >
                  {loading ? null : "Delete"}
                </Button>
              </div>
            );
          }}
          data={products.map((product) => ({
            ...product,
            image: selectImageFromProduct(product)
          }))}
        />
        <div className="text-center mt-3 mb-5">
          <LoadMoreButton
            isLoading={isLoadMore}
            isHide={page >= totalPages - 1}
            onLoadMoreClick={onLoadMore}
          />
        </div>
      </section>
    </article>
  );
};

export default ProductDatabase;
