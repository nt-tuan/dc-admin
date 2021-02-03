import React, { useEffect, useState } from "react";
import { getBankDetails } from "services/bankDetail.service";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { Card } from "antd";
import { BankDetailsReadonly } from "components/molecules/add-funds/bank-details-readonly/bank-details-readonly.comp";
function BankDetailView() {
  const [bankDetails, setBankDetails] = useState([]);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  //** Fetch API Bank detail */
  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const res = await getBankDetails();
      setBankDetails(res);
    });
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(JSON.stringify(text));
    setShowCopySuccess(true);
    setTimeout(() => {
      setShowCopySuccess(false);
    }, 1000);
  };

  return (
    <div className="col-lg-12 col-md-12 col-sm-12">
      <BankDetailsReadonly
        bankDetails={bankDetails}
        showHeader={false}
        showTitle={true}
        handleCopyText={(text) => handleCopy(text)}
      />
    </div>
  );
}

export default BankDetailView;
