import React, { useEffect, useState } from "react";
import { getBankDetails } from "services/bankDetail.service";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { Card } from "antd";

function BankDetailView() {
  const [bankDetails, setBankDetails] = useState([]);
  //** Fetch API Bank detail */
  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const res = await getBankDetails();
      setBankDetails(res);
    });
  }, []);
  return (
    <div className="col-lg-12 col-md-12 col-sm-12">
      <div className="row">
        {bankDetails &&
          bankDetails.length > 0 &&
          bankDetails.map((item, index) => (
            <div className="col-lg-6 col-md-6 col-sm-12" key={`${index}-bankDetailViewItem`}>
              <Card>
                <h5 className="text-primary mb-3">
                  {index === 0 ? "Primary Bank Account" : "Secondary Bank Account"}{" "}
                </h5>
                <p className="row">
                  <b className="text-left col-md-4">Beneficiary Name:</b>
                  <span className="text-left col-md-8">{item.accountHolder}</span>
                </p>

                <p className="row">
                  <b className="text-left col-md-4">Bank Name:</b>
                  <span className="text-left col-md-8">{item.name}</span>
                </p>

                <p className="row">
                  <b className="text-left col-md-4">Account No.:</b>
                  <span className="text-left col-md-8">{item.accountNumber}</span>
                </p>

                <p className="row">
                  <b className="text-left col-md-4">IBAN:</b>
                  <span className="text-left col-md-8">{item.iban}</span>
                </p>

                <p className="row">
                  <b className="text-left col-md-4">Country of Beneficiary's Bank:</b>
                  <span className="text-left col-md-8">{item.nationality}</span>
                </p>

                <p className="row">
                  <b className="text-left col-md-4">Swift Code:</b>
                  <span className="text-left col-md-8">{item.swiftCode}</span>
                </p>

                <p className="row">
                  <b className="text-left col-md-4">Sort Code:</b>
                  <span className="text-left col-md-8">{item.sortCode}</span>
                </p>

                <p className="row">
                  <b className="text-left col-md-4">Bank Currency:</b>
                  <span className="text-left col-md-8">{item.currency}</span>
                </p>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BankDetailView;
