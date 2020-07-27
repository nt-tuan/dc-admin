import { Button, message } from "antd";
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

const ListProductCard = withListItem({ xxl: 6, xl: 6, lg: 8, md: 12, sm: 12, xs: 24, gutter: 30 })(
  ProductCard
);

const ProductDatabase = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [
    { data: products, isLoading, isLoadMore, page, totalPages },
    { setIsLoading, onSearch, onLoadMore }
  ] = usePaginatedApiService(ProductService.getProducts, {
    itemPerPage: 8
  });

  const handleDeleteProduct = debounce((id, setLoading) => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await ProductService.deleteProduct(id);

      setLoading(false);
      message.success("Successful");
    });
  }, 100);

  return (
    <article>
      <Helmet id="Product database" />
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
          renderHoverContent={(product, loading, setLoading) => {
            return (
              <div className="d-flex justify-content-between align-items-center">
                <Button
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
                  style={{ width: 80 }}
                >
                  Edit
                </Button>
                <Button
                  loading={loading}
                  disabled={loading}
                  onClick={() => handleDeleteProduct(product.id, setLoading)}
                  style={{ width: 80 }}
                >
                  {loading ? null : "Delete"}
                </Button>
              </div>
            );
          }}
          data={products.map((product) => ({
            ...product,
            image: product.images && product.images[0].url
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
