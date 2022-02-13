import * as STORAGE_DUCK from "redux/storage/storage.duck";

import { Button, Menu, Modal, message } from "antd";
import { DTCSection, LoadMoreButton } from "components/commons";
import { Lagecy, getLagecyModalContainer } from "components/lagecy/lagecy.comp";
import React, { useCallback } from "react";
import { RouteConst, TEMPLATE_NAME_MAX_CHARS } from "commons/consts";

import Box from "@mui/material/Box";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import { ProductCard } from "./product-card/product-card.comp";
import { ProductService } from "services";
import { SearchBar } from "./search-bar/search-bar.comp";
import Stack from "@mui/material/Stack";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import debounce from "lodash/debounce";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { usePaginatedApiService } from "hooks/useApiService";
import { withListItem } from "./withListItem";

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
      getContainer: getLagecyModalContainer,
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
      <Lagecy>
        <Helmet title="Product Template Database" />
        <DTCSection>
          <DTCSection.Content>
            <Stack direction="row" spacing={2}>
              <Box display="flex" flexGrow={1}>
                <SearchBar
                  onSubmit={onSearch}
                  onTyping={() => setIsLoading(true)}
                  maxLength={TEMPLATE_NAME_MAX_CHARS}
                />
              </Box>
              <Button type="primary" onClick={() => history.push(RouteConst.ADD_PRODUCT)}>
                Add Product
              </Button>
            </Stack>
          </DTCSection.Content>
        </DTCSection>
        <DTCSection sx={{ mt: 2 }}>
          <DTCSection.Content>
            <ListProductCard
              disableNavigation={true}
              isLoading={isLoading}
              renderMenu={({ data, setLoading, setHidden }) => (
                <Menu
                  onClick={({ key }) =>
                    onMenuItemClick({ key, product: data, setLoading, setHidden })
                  }
                >
                  <Menu.Item title={`Edit ${data.name}`} key="edit-product">
                    Edit
                  </Menu.Item>
                  <Menu.Item title={`Duplicate ${data.name}`} key="duplicate-product">
                    Duplicate
                  </Menu.Item>
                  <Menu.Item title={`Delete ${data.name}`} danger key="delete-product">
                    Delete
                  </Menu.Item>
                </Menu>
              )}
              data={products.map((product) => ({
                ...product,
                image: selectImageFromProduct(product)
              }))}
            />
            <Stack alignItems="center">
              {page < totalPages - 1 && (
                <LoadMoreButton isLoading={isLoadMore} onLoadMoreClick={onLoadMore} />
              )}
            </Stack>
          </DTCSection.Content>
        </DTCSection>
      </Lagecy>
    </article>
  );
};

export default ProductDatabase;
