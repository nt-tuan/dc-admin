import React, { useEffect, useState } from "react";
import {message} from "antd";
import { getBankDetails } from "services/bankDetail.service";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { BankDetailsReadonly } from "components/molecules/add-funds/bank-details-readonly/bank-details-readonly.comp";
function BankDetailView() {
  const [bankDetails, setBankDetails] = useState([]);
  //** Fetch API Bank detail */
  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const res = await getBankDetails();
      setBankDetails(res);
    });
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(JSON.stringify(text));
    message.success({ content: "Copied!", duration: 1 });
  };

  return (
    <div className="col-lg-12 col-md-12 col-sm-12">
      <BankDetailsReadonly
        bankDetails={bankDetails}
        showHeader={false}
        showTitle={true}
        handleCopyText={handleCopy}
      />
    </div>
  );
}

export default BankDetailView;
