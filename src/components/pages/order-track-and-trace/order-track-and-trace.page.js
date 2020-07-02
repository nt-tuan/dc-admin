import React, { useState, Fragment, useEffect } from "react";
import { isScreensize } from "utils/general.util";
import { OrderTimeline } from "components/organisms";
import qs from "qs";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Map, Marker, Polyline, Popup, TileLayer } from "react-leaflet";

const fakedData = {
  buyerCompanyName: "qa_buyer",
  sellerCompanyName: "qa_seller",
  buyerAddress: "123 Buyer Address, Dubai, AE 00000",
  sellerAddress: "456 Seller Address, Riyadh, SA 11564",
  quantity: 1,
  unitPrice: 11,
  credit: "Escrow on Delivery",
  timezone: "Asia/Dubai",
  createdDate: "2020-06-12T10:45:58"
};

const data = [
  {
    from_lat: "12.92415",
    from_long: "77.67229",
    id: "132111512",
    to_lat: "14.92732",
    to_long: "77.63575"
  },
  {
    from_lat: "11.92415",
    from_long: "76.67229",
    id: "132512312",
    to_lat: "12.92732",
    to_long: "73.63575"
  },
  {
    from_lat: "15.92415",
    from_long: "73.67229",
    id: "1323334521512",
    to_lat: "19.92732",
    to_long: "71.63575"
  }
];

const OrderTrackAndTrace = () => {
  const [orderDetail, setOrderDetail] = useState();
  const { oid: orderId } = qs.parse(location.search, { ignoreQueryPrefix: true });
  const params = useParams();
  const orderNumber = params.orderNumber;

  useEffect(() => {
    setOrderDetail(fakedData);
  }, []);

  const setHeightMap = () => {
    if (isScreensize("xs") || isScreensize("sm")) {
      return "500px";
    }
    return "100%";
  };

  const setClass = () => {
    if (isScreensize("xs") || isScreensize("sm")) {
      return "col-12 mb-4 text-dark";
    }
    return "col-6 mb-4 text-dark";
  };

  return (
    <div className="air__utils__shadow bg-white dtc-br-10 p-3">
      <h3>Tracking Order</h3>
      <div className="row">
        <div className={setClass()}>
          <OrderTimeline
            orderDetail={{ ...orderDetail, orderId: orderId, orderNumber: orderNumber }}
          />
        </div>
        <div className={setClass()}>
          <Map
            center={[data[0].from_lat, data[0].from_long]}
            zoom={5}
            style={{ minHeight: setHeightMap() }}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {data.map(({ id, from_lat, from_long, to_lat, to_long }) => {
              return (
                <Fragment key={id}>
                  <Marker position={[from_lat, from_long]}>
                    <Popup>From</Popup>
                  </Marker>
                  <Marker position={[to_lat, to_long]}>
                    <Popup>To</Popup>
                  </Marker>
                  <Polyline
                    interactive={true}
                    weight={7}
                    opacity={0.5}
                    key={id}
                    positions={[
                      [from_lat, from_long],
                      [to_lat, to_long]
                    ]}
                    color={"blue"}
                  />
                </Fragment>
              );
            })}
          </Map>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackAndTrace;
