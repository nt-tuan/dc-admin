import React, { useState, useEffect } from "react";
import { DTCTable, FilterDropdown } from "components";
import { orderHistoryTableSchema, ORDERS_SCHEMA } from "commons/schemas";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { ConstFacade } from "commons/consts";
import { UtilFacade } from "utils";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import { OrderService } from "services";

const { DATETIME_FORMAT, TIME_FIELDS, TIME_LABELS } = ConstFacade.getGeneralConst();
const { handleDownloadExcel } = UtilFacade.getGeneralUtils();
const { subtractDateTime, isBetweenTwoDate } = UtilFacade.getDateTimeUtils();

const { FIELDS, LABELS } = ORDERS_SCHEMA;

const filterDays = {
  defaultValue: TIME_FIELDS.month,
  items: [
    { value: TIME_FIELDS.week, name: TIME_LABELS[TIME_FIELDS.week] },
    { value: TIME_FIELDS.month, name: TIME_LABELS[TIME_FIELDS.month] },
    { value: TIME_FIELDS.year, name: TIME_LABELS[TIME_FIELDS.year] }
  ]
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
    asyncErrorHandlerWrapper(async () => {
      const now = dayjs().format();
      const dateAfterSubtract = subtractDateTime(now, days, "days");
      const res = await getAllRecordsFromAPI(OrderService.getAllOrderHistory);
      const filterData = res.filter((item) => {
        return isBetweenTwoDate(item.timestamp, dateAfterSubtract, now);
      });
      setData([
        ...filterData.map((item) => ({
          ...item,
          timestamp: dayjs(item.timestamp).format(DATETIME_FORMAT)
        }))
      ]);
    });
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
        loading={false}
        dataSource={data}
        schema={orderHistoryTableSchema()}
        onChange={(value) => setData(value)}
      />
    </div>
  );
};
