import { Spin } from "antd";
import { ReactComponent as LoadingSvg } from "assets/images/loading.svg";
import React from "react";

export const LoadingIndicator = () => {
  return <Spin indicator={<LoadingSvg />} size="large" />;
};
