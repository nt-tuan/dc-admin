import { Button, message } from "antd";
import { DATETIME_FORMAT, SERVER_UNKNOWN_ERR } from "commons/consts";
import { financialMapper } from "commons/mappers";
import { FINANCIAL_SCHEMA } from "commons/schemas";
import { DTCHighlighter, DTCTable } from "components";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { toCurrency } from "utils/general.util";
import { sortAlphabetically } from "utils/sort.util";
import XLSX from "xlsx";

const { FIELDS, LABELS } = FINANCIAL_SCHEMA;
const { parseDataToExcel } = financialMapper;

const BuyerAccoutSummaryPage = () => {
  const [financials, setFinancials] = useState([]);

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      try {
        // let res = await getFinancialsAsBuyer();
        let res = fakeData;
        res = res.map((item) => {
          const { number, value } = item;
          return {
            ...item,
            value: toCurrency(value),
            id: number
          };
        });
        setFinancials(res);
      } catch (error) {
        message.error(SERVER_UNKNOWN_ERR);
      }
    });
  }, []);

  const handleDownloadFinancial = () => {
    const parsedFinancial = parseDataToExcel(financials);
    const sheet = XLSX.utils.json_to_sheet(parsedFinancial, {
      skipHeader: true
    });
    const excelBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(excelBook, sheet, "financial");
    XLSX.writeFile(excelBook, "ExportedFinancial.xlsx", {
      bookType: "xlsx",
      type: "file",
      sheet: "financial"
    });
  };

  return (
    <div>
      <Helmet title="Purchase - Account Summary" />
      <div className="air__utils__shadow bg-white p-4 dtc-br-10">
        <div className="d-flex justify-content-between">
          <div className="mb-3">
            <Button className="btn btn-round btn-primary mr-2">Copy</Button>
            <Button className="btn btn-round btn-primary mr-2">CSV</Button>
            <Button className="btn btn-round btn-primary mr-2">Print</Button>
          </div>
          <div className="mb-3">
            <Button type="primary" onClick={handleDownloadFinancial}>
              <i className="fe fe-download mr-2" /> Download Financials
            </Button>
          </div>
        </div>
        <DTCTable
          showSettings={false}
          loading={false}
          dataSource={financials}
          schema={() => columns}
          onChange={(value) => setFinancials(value)}
        />
      </div>
    </div>
  );
};

export default BuyerAccoutSummaryPage;

const columns = [
  {
    title: LABELS[FIELDS.date],
    dataIndex: FIELDS.date,
    key: FIELDS.date,
    sorter: (a, b) => sortAlphabetically(a.date, b.date),
    makeRender: ({ searchText }) => (date) => (
      <DTCHighlighter searchText={searchText} value={dayjs(date).format(DATETIME_FORMAT)} />
    )
  },
  {
    title: LABELS[FIELDS.number],
    dataIndex: FIELDS.number,
    key: FIELDS.number,
    sorter: (a, b) => sortAlphabetically(a.number, b.number),
    makeRender: ({ searchText }) => (number) => (
      <DTCHighlighter searchText={searchText} value={number} />
    )
  },
  {
    title: LABELS[FIELDS.city],
    dataIndex: FIELDS.city,
    key: FIELDS.city,
    sorter: (a, b) => sortAlphabetically(a.city, b.city),
    makeRender: ({ searchText }) => (city) => (
      <DTCHighlighter searchText={searchText} value={city} />
    )
  },
  {
    title: LABELS[FIELDS.country],
    dataIndex: FIELDS.country,
    key: FIELDS.country,
    sorter: (a, b) => sortAlphabetically(a.country, b.country),
    makeRender: ({ searchText }) => (country) => (
      <DTCHighlighter searchText={searchText} value={country} />
    )
  },
  {
    title: LABELS[FIELDS.value],
    dataIndex: FIELDS.value,
    key: FIELDS.value,
    sorter: (a, b) => a.value - b.value,
    makeRender: ({ searchText }) => (value) => (
      <DTCHighlighter searchText={searchText} value={toCurrency(value)} />
    )
  },
  {
    title: LABELS[FIELDS.payment],
    dataIndex: FIELDS.payment,
    key: FIELDS.payment,
    sorter: (a, b) => a.payment - b.payment,
    makeRender: ({ searchText }) => (payment) => (
      <DTCHighlighter searchText={searchText} value={toCurrency(payment)} />
    )
  }
];

const fakeData = [
  {
    date: "2020-06-10",
    number: "321586508348919",
    city: "Dubai",
    country: "AE",
    value: 90.0,
    payment: 0.0,
    commission: 30
  },
  {
    date: "2020-06-10",
    number: "321586508306003",
    city: "Dubai",
    country: "AE",
    value: 11.0,
    payment: 0.0,
    commission: 20
  },
  {
    date: "2020-06-10",
    number: "321586508288413",
    city: "Dubai",
    country: "AE",
    value: 100.0,
    payment: 0.0,
    commission: 50
  },
  {
    date: "2020-06-10",
    number: "321586508324429",
    city: "Dubai",
    country: "AE",
    value: 100.0,
    payment: 0.0,
    commission: 100
  },
  {
    date: "2020-06-10",
    number: "321586508290890",
    city: "Dubai",
    country: "AE",
    value: 120.0,
    payment: 0.0,
    commission: 230
  },
  {
    date: "2020-06-10",
    number: "321586508326233",
    city: "Dubai",
    country: "AE",
    value: 60.0,
    payment: 0.0,
    commission: 30
  },
  {
    date: "2020-06-10",
    number: "321586508336424",
    city: "Dubai",
    country: "AE",
    value: 100.0,
    payment: 0.0,
    commission: 123
  },
  {
    date: "2020-06-10",
    number: "321586507425017",
    city: "Dubai",
    country: "AE",
    value: 78.0,
    payment: 0.0,
    commission: 119
  },
  {
    date: "2020-06-10",
    number: "321586508348918",
    city: "Dubai",
    country: "AE",
    value: 45.0,
    payment: 0.0,
    commission: 80
  },
  {
    date: "2020-06-10",
    number: "321586508289802",
    city: "Dubai",
    country: "AE",
    value: 50.0,
    payment: 0.0,
    commission: 176
  }
];
