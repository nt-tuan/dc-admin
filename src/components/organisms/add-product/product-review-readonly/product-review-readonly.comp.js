import React from "react";
import { PerfumeSpecTable } from "components/atoms";
import { Empty } from "antd";

const values = {
  Brand: "Chanel",
  "Short Description": "Short Description",
  "Long Description": "Long Description",
  "Retail Price": "$1000",
  Gender: "Unisex",
  Size: "FL.",
  Type: "Type"
};

export const ProductReviewReadOnly = () => {
  const renderImage = (images) => {
    return images && images[0] ? (
      <img src={images[0].url} alt="iphone" className="img-fluid pt-4" />
    ) : (
      <Empty className="w-100" image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Image" />
    );
  };
  const renderProductHeader = (product) => {
    const { name } = product;
    // const variants = mapVariantFields(product.variants, product.brand);
    return <h5 className="font-weight-bolder mb-3">{name}</h5>;
  };
  return (
    <div className="row">
      <div className="col-12 col-xl-3">{renderImage()}</div>
      <div className="col-12 col-xl-9">
        {renderProductHeader({ name: "SIGNATURE JADE 100ML EDP + 15ML + FUNNEL" })}
        <PerfumeSpecTable values={values} />
      </div>
    </div>
  );
};
