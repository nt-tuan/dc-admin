import { Button } from "antd";
import { RouteConst } from "commons/consts";
import { DTCSection, LoadMoreButton, ProductCard, SearchBar } from "components/atoms";
import { withListItem } from "HOCs/withListItem";
import { usePaginatedApiService } from "hooks/useApiService";
import React from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { ProductService } from "services";

const ListProductCard = withListItem({ xxl: 6, xl: 6, lg: 8, md: 12, sm: 12, xs: 24, gutter: 30 })(
  ProductCard
);

const ProductDatabase = () => {
  const history = useHistory();
  const [
    { data: products, isLoading, isLoadMore, page, totalPages },
    { setIsLoading, onSearch, onLoadMore }
  ] = usePaginatedApiService(ProductService.getProducts, {
    itemPerPage: 8
  });
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
          isLoading={isLoading}
          renderHoverContent={(data) => {
            return (
              <div className="d-flex justify-content-between align-items-center">
                <Button onClick={(e) => e.preventDefault()} style={{ width: 80 }}>
                  Edit
                </Button>
                <Button onClick={(e) => e.preventDefault()} style={{ width: 80 }}>
                  Delete
                </Button>
              </div>
            );
          }}
          data={products}
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
