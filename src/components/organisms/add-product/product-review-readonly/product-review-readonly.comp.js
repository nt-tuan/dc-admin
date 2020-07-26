import { Empty } from "antd";
import { PerfumeSpecTable } from "components/atoms";
import React from "react";

export const ProductReviewReadOnly = ({ data }) => {
  const renderImage = () => {
    return data.imgUrl ? (
      <img src={data.imgUrl} alt="iphone" className="img-fluid pt-4" />
    ) : (
      <Empty className="w-100" image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Image" />
    );
  };
  const renderProductHeader = (name) => {
    return <h5 className="font-weight-bolder mb-3">{name}</h5>;
  };
  return (
    <div className="row">
      <div className="col-12 col-xl-3">{renderImage()}</div>
      <div className="col-12 col-xl-9">
        {renderProductHeader(data.productName)}
        <PerfumeSpecTable values={data.variantList} />
      </div>
    </div>
  );
};
