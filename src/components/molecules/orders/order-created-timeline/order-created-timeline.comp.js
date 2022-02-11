import React, { Fragment } from "react";

import { Avatar } from "antd";
import { TimePoint } from "components/atoms";
import { toCurrency } from "utils/general.util";

export const OrderCreatedTimeline = ({ timezone, orderDetail }) => {
  return (
    <Fragment>
      {/* ORDER CREATED */}
      <TimePoint timezone={timezone} dateTime={orderDetail.createdDate} type="major">
        <OrderCreated orderDetail={orderDetail} />
      </TimePoint>
      {/* PURCHASE ORDER */}
      <TimePoint timezone={timezone} dateTime={orderDetail.createdDate} type="major">
        <PurchaseOrder orderDetail={orderDetail} />
      </TimePoint>
    </Fragment>
  );
};
const OrderCreated = ({ orderDetail }) => {
  const renderLogo = (logo) => {
    if (logo) {
      return <img alt="" className="mb-1" src={logo} style={{ height: 40 }} />;
    } else {
      return (
        <Avatar shape="square" size={40} icon={<i className="fe fe-user" />} className="mb-1" />
      );
    }
  };

  const renderAddress = (addressLine1, city, country, postalCode) => {
    return (
      <p>
        {addressLine1}, {city}, {country} {postalCode}
      </p>
    );
  };

  return (
    <Fragment>
      <h5>Order Created</h5>
      <article>
        <p className="mb-1">
          <b>Buyer:</b> {orderDetail.buyerCompanyName}
        </p>
        {renderLogo(orderDetail.buyerLogo)}
        {renderAddress(orderDetail.buyerAddress)}
      </article>
      <article>
        <p className="mb-1">
          <b>Seller</b>: {orderDetail.sellerCompanyName}
        </p>
        {renderLogo(orderDetail.sellerLogo)}
        {renderAddress(orderDetail.sellerAddress)}
        <div>
          <div>
            <b>Quantity:</b> {orderDetail.quantity}
          </div>
          <div>
            <b>Price:</b> {toCurrency(orderDetail.unitPrice)}
          </div>
          <div>
            <b>Credit: </b>
            {orderDetail.credit}
          </div>
          <div>
            <b>Initialed by:</b> {orderDetail.sellerCompanyName}
          </div>
        </div>
      </article>
    </Fragment>
  );
};

const PurchaseOrder = ({ orderDetail }) => {
  return (
    <Fragment>
      <h5>Purchase Order</h5>
      <article className="d-flex align-items-center">
        <i className="fe fe-file-text font-size-21" />
        <p className="mb-0 ml-1">Purchase Order {orderDetail.orderNumber}</p>
      </article>
    </Fragment>
  );
};
