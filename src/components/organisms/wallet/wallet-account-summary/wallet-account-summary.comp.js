import React, { useState } from "react";
import { Button } from "antd";
import { getAccountSummarySchema } from "commons/schemas/wallet.schema";
import { DTCTable } from "components/atoms";
import { walletMapper } from "commons/mappers";
import { handleDownloadExcel } from "utils/general.util";

const { parseDataToExcel } = walletMapper;

export const WalletAccountSummary = ({ transactionDetails }) => {
  const [data, setData] = useState(transactionDetails);

  const handleDownload = () => {
    const dataExcel = parseDataToExcel(data);
    const fileName = "Wallet-account-summary";
    const fileSheet = "WalletAccountSummary";
    handleDownloadExcel(dataExcel, fileName, fileSheet);
  };

  return (
    <section className="air__utils__shadow p-3 dtc-br-10 bg-white mb-3">
      <h5 className="text-capitalize mb-2 text-primary font-weight-bold">Account Summary</h5>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button shape="round" className="mr-2">
          Transaction Details
        </Button>
        <Button type="primary" onClick={handleDownload}>
          <i className="fe fe-download mr-2" /> Download
        </Button>
      </div>
      <DTCTable
        showSettings={false}
        loading={false}
        dataSource={data}
        schema={getAccountSummarySchema()}
        onChange={(value) => setData(value)}
      />
    </section>
  );
};
