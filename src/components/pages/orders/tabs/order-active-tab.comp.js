import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ConstFacade } from "commons/consts";
import { getOrderActiveTableSchema, ORDERS_SCHEMA } from "commons/schemas";
import { DTCTable, FilterDropdown } from "components";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { UtilFacade } from "utils";

const { DATETIME_FORMAT, TIME_FIELDS, TIME_LABELS } = ConstFacade.getGeneralConst();
const { handleDownloadExcel } = UtilFacade.getgeneralUtils();
const { subtractDateTime, isBetweenTwoDate } = UtilFacade.getDatetimeUtils();

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
  const columns = getOrderActiveTableSchema();
  return [
    columns[FIELDS.timestamp],
    columns[FIELDS.orderNumber],
    columns[FIELDS.productCategory],
    columns[FIELDS.productType],
    columns[FIELDS.productBrand],
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
  [FIELDS.productCategory]: 2,
  [FIELDS.productType]: 3,
  [FIELDS.productBrand]: 4,
  [FIELDS.productName]: 5,
  [FIELDS.quantity]: 6,
  [FIELDS.unitPrice]: 7,
  [FIELDS.totalPrice]: 8,
  [FIELDS.buyerCompanyName]: 9,
  [FIELDS.sellerCompanyName]: 10,
  [FIELDS.status]: 11
};

export const OrderActiveTab = () => {
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
    productCategory: "Consumer Electronics",
    productType: "Mobile Phone",
    productBrand: "Apple",
    productName: "Apple iPhone 11 Black 64GB",
    quantity: "111",
    unitPrice: "333",
    totalPrice: "555",
    buyerCompanyName: "buyer",
    sellerCompanyName: "seller",
    status: "Order Completed"
  },
  {
    id: 2,
    timestamp: "2020-04-29T17:34:08+07:00",
    orderNumber: 12345679,
    productCategory: "Consumer Electronics",
    productType: "Mobile Phone",
    productBrand: "Samsung",
    productName: "Samsung Galaxy S20+ Cosmic grey 256GB",
    quantity: "222",
    unitPrice: "111",
    totalPrice: "444",
    buyerCompanyName: "buyer1",
    sellerCompanyName: "seller1",
    status: "Order Cancelled"
  },
  {
    id: 3,
    timestamp: "2020-04-29T17:34:08+07:00",
    orderNumber: 12345681,
    productCategory: "Consumer Electronics",
    productType: "Mobile Phone",
    productBrand: "Samsung",
    productName: "Samsung Galaxy S20+ Cosmic grey 256GB",
    quantity: "222",
    unitPrice: "111",
    totalPrice: "444",
    buyerCompanyName: "buyer1",
    sellerCompanyName: "seller1",
    status: "Order Cancelled"
  },
  {
    id: 4,
    timestamp: "2020-04-29T17:34:08+07:00",
    orderNumber: 12345685,
    productCategory: "Consumer Electronics",
    productType: "Mobile Phone",
    productBrand: "Samsung",
    productName: "Samsung Galaxy S20+ Cosmic grey 256GB",
    quantity: "222",
    unitPrice: "111",
    totalPrice: "444",
    buyerCompanyName: "buyer1",
    sellerCompanyName: "seller1",
    status: "Order Cancelled"
  },
  {
    id: 5,
    timestamp: "2020-03-29T17:34:08+07:00",
    orderNumber: 12345687,
    productCategory: "Consumer Electronics",
    productType: "Mobile Phone",
    productBrand: "Samsung",
    productName: "Samsung Galaxy S20+ Cosmic grey 256GB",
    quantity: "222",
    unitPrice: "111",
    totalPrice: "444",
    buyerCompanyName: "buyer1",
    sellerCompanyName: "seller1",
    status: "Order Cancelled"
  },
  {
    id: 6,
    timestamp: "2019-12-29T17:34:08+07:00",
    orderNumber: 12345690,
    productCategory: "Consumer Electronics",
    productType: "Mobile Phone",
    productBrand: "Samsung",
    productName: "Samsung Galaxy S20+ Cosmic grey 256GB",
    quantity: "222",
    unitPrice: "111",
    totalPrice: "444",
    buyerCompanyName: "buyer1",
    sellerCompanyName: "seller1",
    status: "Order Cancelled"
  }
];
