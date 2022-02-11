import React, { useEffect, useState } from "react";

import { BankDetailsReadonly } from "components/molecules/bank-details-readonly/bank-details-readonly.comp";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getBankDetails } from "services/bankDetail.service";
import { message } from "antd";

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
    <BankDetailsReadonly
      bankDetails={bankDetails}
      showHeader={false}
      showTitle={true}
      handleCopyText={handleCopy}
    />
  );
}

export default BankDetailView;
