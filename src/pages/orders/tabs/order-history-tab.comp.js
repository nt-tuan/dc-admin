import React, { useState, useEffect } from "react";
import { DTCTable, FilterDropdown } from "components/widgets";
import { getOrderHistoryTableSchema, ORDERS_SCHEMA } from "commons/schemas";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { handleDownloadExcel, subtractDateTime, isBetweenTwoDate } from "utils";
import { DATETIME_FORMAT, TIME_FIELDS, TIME_LABELS } from "commons/consts";
import dayjs from "dayjs";

const { FIELDS, LABELS } = ORDERS_SCHEMA;

const filterDays = {
  defaultValue: TIME_FIELDS.month,
  items: [
    { value: TIME_FIELDS.week, name: TIME_LABELS[TIME_FIELDS.week] },
    { value: TIME_FIELDS.month, name: TIME_LABELS[TIME_FIELDS.month] },
    { value: TIME_FIELDS.year, name: TIME_LABELS[TIME_FIELDS.year] }
  ]
};

const columns = () => {
  const columns = getOrderHistoryTableSchema();
  return [
    columns[FIELDS.timestamp],
    columns[FIELDS.orderNumber],
    columns[FIELDS.productName],
    columns[FIELDS.quantity],
    columns[FIELDS.unitPrice],
    columns[FIELDS.totalPrice],
    columns[FIELDS.buyerCompanyName],
    columns[FIELDS.sellerCompanyName],
    columns[FIELDS.status]
  ];
};

const labelIndex = {
  [FIELDS.timestamp]: 0,
  [FIELDS.orderNumber]: 1,
  [FIELDS.productName]: 2,
  [FIELDS.quantity]: 3,
  [FIELDS.unitPrice]: 4,
  [FIELDS.totalPrice]: 5,
  [FIELDS.buyerCompanyName]: 6,
  [FIELDS.sellerCompanyName]: 7,
  [FIELDS.status]: 8
};

export const OrderHistoryTab = () => {
  const [data, setData] = useState([]);
  const [days, setDays] = useState(30);

  useEffect(() => {
    const now = dayjs().format();
    const dateAfterSubtract = subtractDateTime(now, days, "days");
    const filterData = fakedData.filter((item) => {
      return isBetweenTwoDate(item.timestamp, dateAfterSubtract, now);
    });
    setData([
      ...filterData.map((item) => ({
        ...item,
        timestamp: dayjs(item.timestamp).format(DATETIME_FORMAT)
      }))
    ]);
  }, [days]);

  const handleDownload = () => {
    handleDownloadExcel(data, labelIndex, LABELS, FIELDS, "Orders");
  };

  const handleChangeDays = (value) => {
    setDays(value);
  };

  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      <div className="d-flex justify-content-between">
        <div>
          <FilterDropdown
            className="mr-2"
            defaultValue={filterDays.defaultValue}
            onChange={handleChangeDays}
            items={filterDays.items}
          />
        </div>
        <div>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            className="mb-3"
            onClick={handleDownload}
          >
            Download
          </Button>
        </div>
      </div>
      <DTCTable
        showSettings={false}
        data={data}
        columns={columns()}
        isLoading={false}
        onChange={(value) => setData(value)}
      />
    </div>
  );
};

const fakedData = [
  {
    id: 1,
    timestamp: "2020-05-23T17:34:08+07:00",
    orderNumber: 12345678,
    productName: "Apple iPhone 11 Black 64GB",
    quantity: 200,
    unitPrice: 3000,
    totalPrice: 40000,
    buyerCompanyName: "buyer",
    sellerCompanyName: "seller",
    status: "Order Cancelled"
  },
  {
    id: 2,
    timestamp: "2019-12-29T17:34:08+07:00",
    orderNumber: 12345680,
    productName: "Samsung Galaxy S20+ Cosmic grey 256GB",
    quantity: 300,
    unitPrice: 10000,
    totalPrice: 600000,
    buyerCompanyName: "buyer1",
    sellerCompanyName: "seller1",
    status: "Order Completed"
  }
];
