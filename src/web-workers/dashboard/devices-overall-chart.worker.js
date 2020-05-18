import debounce from "lodash/debounce";
import {
  groupDataBy12Month,
  groupDataTwoYearByFieldName,
  filterByYear
} from "utils/dashboard.util";

const initChartData = debounce((payload) => {
  const { data, filters } = payload;
  const { collapseName, collapseValue } = filters;

  const currentYear = new Date().getFullYear();
  let currentData = [`${currentYear}`];
  let prevData = [`${currentYear - 1}`];

  const data12Month = groupDataBy12Month(data);

  for (let i = 1; i <= 12; i++) {
    // Filter data by month
    const dataMonth = data12Month[i - 1];
    // Filter data by year
    const dataCurrentYear = filterByYear(dataMonth, currentYear);
    const dataPrevYear = filterByYear(dataMonth, currentYear - 1);
    // Group data by product condition
    const [currentDataOfItem, prevDataOfItem] = groupDataTwoYearByFieldName(
      dataCurrentYear,
      dataPrevYear,
      collapseName,
      collapseValue
    );
    // Add data for array
    currentData.splice(i, 0, currentDataOfItem !== undefined ? currentDataOfItem.quantity : 0);
    prevData.splice(i, 0, prevDataOfItem !== undefined ? prevDataOfItem.quantity : 0);
  }
  self.postMessage({
    action: "initChartData",
    payload: { prevData, currentData }
  });
}, 1500);

self.addEventListener("message", (e) => {
  const { action, payload } = e.data;
  switch (action) {
    case "initChartData":
      initChartData(payload);
      break;
    default:
      break;
  }
});
