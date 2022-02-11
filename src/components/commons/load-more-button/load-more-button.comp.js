import React from "react";
import Button from "@mui/material/ButtonBase";
import LoadingButton from "@mui/lab/LoadingButton";

export const LoadMoreButton = ({ isLoading, isHide, onLoadMoreClick }) => {
  const sx = {
    visibility: `${isHide ? "hidden" : "visible"}`
  };
  if (isLoading) return <LoadingButton />;
  return (
    <Button variant="contained" sx={sx} onClick={onLoadMoreClick}>
      Load more
    </Button>
  );
};
