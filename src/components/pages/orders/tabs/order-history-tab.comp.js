import React, { useState, useEffect } from "react";
import { DTCTable, FilterDropdown } from "components";
import { orderHistoryTableSchema, ORDERS_SCHEMA } from "commons/schemas";
import { Button } from "antd";
import dayjs from "dayjs";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI, handleDownloadExcel } from "utils/general.util";
import { OrderService } from "services";
import { TIME_FIELDS, TIME_LABELS } from "commons/consts";
import { DatetimeUtils } from "utils/date-time.util";
import { historyOrderMapper } from "commons/mappers";

const { isBetweenTwoDate, subtractDateTime } = DatetimeUtils;
const { parseDataToExcel, parseDataToGridView } = historyOrderMapper;

const { FIELDS } = ORDERS_SCHEMA;

const filterDays = {
  defaultValue: TIME_FIELDS.month,
  items: [
    { value: TIME_FIELDS.week, name: TIME_LABELS[TIME_FIELDS.week] },
    { value: TIME_FIELDS.month, name: TIME_LABELS[TIME_FIELDS.month] },
    { value: TIME_FIELDS.year, name: TIME_LABELS[TIME_FIELDS.year] }
  ]
};

export const OrderHistoryTab = () => {
  const [data, setData] = useState([]);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      const now = dayjs().format();
      const dateAfterSubtract = subtractDateTime(now, days, "days");
      const fn = (options) =>
        OrderService.getAllOrderHistory({ ...options, createdDate: dateAfterSubtract });
      const res = await getAllRecordsFromAPI(fn);
      const filterData = res.filter((item) => {
        return isBetweenTwoDate(item[FIELDS.timestamp], dateAfterSubtract, now);
      });
      setData(parseDataToGridView(filterData));
      setLoading(false);
    });
  }, [days]);

  const handleDownload = () => {
    const dataExcel = parseDataToExcel(data);
    const fileName = "History-order";
    const fileSheet = "HistoryOrder";
    handleDownloadExcel(dataExcel, fileName, fileSheet);
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
          <Button type="primary" className="mb-3" onClick={handleDownload}>
            <i className="fe fe-download mr-2" /> Download
          </Button>
        </div>
      </div>
      <DTCTable
        loading={loading}
        dataSource={data}
        schema={orderHistoryTableSchema()}
        onChange={(value) => setData(value)}
      />
    </div>
  );
};
