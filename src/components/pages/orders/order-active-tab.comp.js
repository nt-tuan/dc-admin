import { DTCSection, DTCTable, FilterDropdown } from "components/commons";
import { ORDERS_SCHEMA, orderActiveTableColumns } from "./order.schema";
import React, { useEffect, useState } from "react";
import { TIME_FIELDS, TIME_LABELS } from "commons/consts";
import { getAllRecordsFromAPI, handleDownloadExcel } from "utils/general.util";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DatetimeUtils } from "utils/date-time.util";
import DownloadIcon from "@mui/icons-material/Download";
import { OrderService } from "services";
import Stack from "@mui/material/Stack";
import { activeOrderMapper } from "./order.mapper";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import dayjs from "dayjs";

const { parseDataToExcel, parseDataToGridView } = activeOrderMapper;
const { isBetweenTwoDate, subtractDateTime } = DatetimeUtils;

const { FIELDS } = ORDERS_SCHEMA;

const filterDays = {
  defaultValue: TIME_FIELDS.month,
  items: [
    { value: TIME_FIELDS.week, name: TIME_LABELS[TIME_FIELDS.week] },
    { value: TIME_FIELDS.month, name: TIME_LABELS[TIME_FIELDS.month] },
    { value: TIME_FIELDS.year, name: TIME_LABELS[TIME_FIELDS.year] }
  ]
};

export const OrderActiveTab = () => {
  const [data, setData] = useState([]);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      const now = dayjs().format();
      const dateAfterSubtract = subtractDateTime(now, days, "days");
      const fn = (pageOptions) =>
        OrderService.getAllActiveOrders({
          ...pageOptions,
          createdDate: dateAfterSubtract
        });
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
    const fileName = "Active-order";
    const fileSheet = "ActiveOrder";
    handleDownloadExcel(dataExcel, fileName, fileSheet);
  };

  const handleChangeDays = (event) => {
    setDays(event.target.value);
  };

  return (
    <DTCSection>
      <DTCSection.Content>
        <Stack alignItems="center" mb={1} direction="row" justifyContent="space-between">
          <FilterDropdown
            displayEmpty
            defaultValue={filterDays.defaultValue}
            onChange={handleChangeDays}
            items={filterDays.items}
          />

          <Button
            startIcon={<DownloadIcon />}
            size="small"
            variant="contained"
            onClick={handleDownload}
          >
            Download
          </Button>
        </Stack>
        <Box sx={{ height: "500px" }}>
          <DTCTable loading={loading} dataSource={data} columns={orderActiveTableColumns} />
        </Box>
      </DTCSection.Content>
    </DTCSection>
  );
};
