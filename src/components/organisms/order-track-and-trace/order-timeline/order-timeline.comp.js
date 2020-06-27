import React from "react";
import { OrderCreatedTimeline } from "components/molecules";

export const OrderTimeline = ({ orderDetail = {} }) => {
  return (
    <ul className="list-unstyled pl-0">
      <OrderCreatedTimeline orderDetail={orderDetail} />
    </ul>
  );
};
