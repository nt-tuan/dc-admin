// Respond to message from parent thread

import {
  filterByDays,
  filterByProductCondition,
  sortDateTimeDataByField,
  groupByDaySteps,
  filterByCurrentDay,
  filterByCurrentTimeline,
  filterByProductOneCondition
} from "utils/dashboard.util";
import debounce from "lodash/debounce";

import { DASHBOARD_SCHEMA } from "commons/schemas/dashboard.schema";

const { FIELDS } = DASHBOARD_SCHEMA;

const numberOfGroupByDay = {
  [FIELDS.week]: 1,
  [FIELDS.month]: 2,
  [FIELDS.year]: 30
};

const parseDataToXAxis = (data) => {
  const xAxis = data.map((x) => {
    if (x.length > 1) {
      return `from ${x[0].soldDate} to ${x[x.length - 1].soldDate}`;
    } else {
      return x[0].soldDate;
    }
  });
  return xAxis;
};

const parseDataToYAxis = (data) => {
  const yAxis = data.map((y) =>
    y.map((item) => item.quantity).reduce((total, quantity) => total + quantity)
  );
  return yAxis;
};

const getSaleFromData = (filteredDataByCurrentDay) => {
  const mappedData = filteredDataByCurrentDay.map((item) => item.quantity * item.unitPrice);
  const todaySale = mappedData.length > 0 ? mappedData.reduce((total, sale) => total + sale) : 0;
  return todaySale;
};

const initChartData = debounce((payload) => {
  const { data, condition, days } = payload;
  // Get type of condition
  const name = Object.keys(condition);
  // Get list value of condition
  const values = condition[name];
  const resY = [];
  let resX = [];

  if (values) {
    for (let value of values) {
      const latestData = filterByDays(data, days);
      const sortedData = sortDateTimeDataByField(latestData, "soldDate");
      const dataFilterByProduct = filterByProductOneCondition(sortedData, { [name]: value });
      const groupedDataByDaySteps = groupByDaySteps(
        dataFilterByProduct,
        numberOfGroupByDay[days],
        days
      );

      const y = parseDataToYAxis([...groupedDataByDaySteps]);
      resY.push([value, ...y]);

      if (resX.length === 0) {
        resX = parseDataToXAxis([...groupedDataByDaySteps]);
      }
    }
  }
  self.postMessage({
    action: "initChartData",
    payload: [resX, resY]
  });
}, 1000);

const initSaleData = debounce((payload) => {
  const { data, condition } = payload;
  const dataFilterByProduct = filterByProductCondition(data, condition);
  const filteredDataByCurrentDay = filterByCurrentDay(dataFilterByProduct, "soldDate");
  const filteredDataByCurrentWeek = filterByCurrentTimeline(
    dataFilterByProduct,
    "soldDate",
    "week"
  );
  const filteredDataByCurrentMonth = filterByCurrentTimeline(
    dataFilterByProduct,
    "soldDate",
    "month"
  );
  const filteredDataByCurrentYear = filterByCurrentTimeline(
    dataFilterByProduct,
    "soldDate",
    "year"
  );
  const totalSaleToday = getSaleFromData(filteredDataByCurrentDay);
  const totalSaleThisWeek = getSaleFromData(filteredDataByCurrentWeek);
  const totalSaleThisMonth = getSaleFromData(filteredDataByCurrentMonth);
  const totalSaleThisYear = getSaleFromData(filteredDataByCurrentYear);

  self.postMessage({
    action: "initSaleData",
    payload: [totalSaleToday, totalSaleThisWeek, totalSaleThisMonth, totalSaleThisYear]
  });
}, 200);

self.addEventListener("message", (e) => {
  const { action, payload } = e.data;
  switch (action) {
    case "initChartData":
      initChartData(payload);
      break;

    case "initSaleData":
      initSaleData(payload);

      break;
    default:
      break;
  }
});
