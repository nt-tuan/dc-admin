import React, { useCallback } from "react";
import { Button, message, Modal, Menu } from "antd";
import { RouteConst } from "commons/consts";
import { DTCSection, LoadMoreButton, ProductCard, SearchBar } from "components/atoms";
import { withListItem } from "HOCs/withListItem";
import { usePaginatedApiService } from "hooks/useApiService";
import debounce from "lodash/debounce";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { ProductService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { useDispatch } from "react-redux";
import * as STORAGE_DUCK from "redux/storage/storage.duck";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const ListProductCard = withListItem({
  xxl: 6,
  xl: 6,
  lg: 8,
  md: 12,
  sm: 12,
  xs: 24,
  gutter: [30, 15]
})(ProductCard);

const ProductDatabase = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [
    { data: products, isLoading, isLoadMore, page, totalPages },
    { setIsLoading, onSearch, onReFetch, onLoadMore }
  ] = usePaginatedApiService(ProductService.getProducts, {
    itemPerPage: 8
  });

  const handleDeleteProduct = debounce((product, setLoading, setHidden) => {
    confirm({
      title: `Are you sure you want to delete the \"${product.name}\" template?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        setLoading(true);
        asyncErrorHandlerWrapper(async () => {
          await ProductService.deleteProduct(product.id);
          onReFetch();
          setLoading(false);
          setHidden(true);
          message.success(`Product template \"${product.name}\" was successfully deleted`);
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

  const handleEditProduct = useCallback(
    (product) => {
      dispatch({
        type: STORAGE_DUCK.CLEAR_FROM_STORAGE,
        payload: { pageName: "EditProductPage" }
      });
      history.push(
        `${RouteConst.EDIT_PRODUCT.replace(":id", `${product.name}`)}?uid=${product.id}`
      );
    },
    [history, dispatch]
  );

  const handleDuplicateProduct = useCallback(
    (product) => {
      history.push(`${RouteConst.ADD_PRODUCT}?uid=${product.id}`);
    },
    [history]
  );

  const onMenuItemClick = useCallback(
    ({ key, product, setLoading, setHidden }) => {
      switch (key) {
        case "edit-product":
          handleEditProduct(product);
          break;
        case "duplicate-product":
          handleDuplicateProduct(product);
          break;
        case "delete-product":
          handleDeleteProduct(product, setLoading, setHidden);
          break;
        default:
          break;
      }
    },
    [handleDeleteProduct, handleDuplicateProduct, handleEditProduct]
  );

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
          renderMenu={({ data, setLoading, setHidden }) => (
            <Menu
              onClick={({ key }) => onMenuItemClick({ key, product: data, setLoading, setHidden })}
            >
              <Menu.Item
                title={`Edit ${data.name}`}
                key="edit-product"
              >{`Edit ${data.name}`}</Menu.Item>
              <Menu.Item
                title={`Duplicate ${data.name}`}
                key="duplicate-product"
              >{`Duplicate ${data.name}`}</Menu.Item>
              <Menu.Item title="Delete" danger key="delete-product">
                Delete
              </Menu.Item>
            </Menu>
          )}
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
