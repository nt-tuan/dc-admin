import React from "react";
import { Button } from "antd";

export const LoadMoreButton = ({ isLoading, isHide, onLoadMoreClick }) => {
  return (
    <Button
      style={{
        visibility: `${isHide ? "hidden" : "visible"}`
      }}
      className="dtc-min-width-100"
      loading={isLoading}
      type="primary"
      onClick={onLoadMoreClick}
    >
      {isLoading ? "" : "Load more"}
    </Button>
  );
};
