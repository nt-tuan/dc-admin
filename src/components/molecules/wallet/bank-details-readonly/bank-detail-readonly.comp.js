import React from "react";
import { areObjectValuesUndefined } from "utils/general.util";
import { Card } from "antd";
import { WALLET_SCHEMA } from "commons/schemas/wallet.schema";

const { BANK_DETAILS, BANK_DETAIL_LABELS } = WALLET_SCHEMA;

export const BankDetailReadonly = ({ bankDetails }) => {
  const renderTitle = (index) => {
    switch (index) {
      case 0:
        return "Primary Bank Account";
      case 1:
        return "Secondary Bank Account";
      default:
        return null;
    }
  };
  return (
    <div className="row">
      {bankDetails
        .filter((account) => areObjectValuesUndefined(account) === false)
        .map((record, index) => (
          <div key={record.id || index} className="col-12 col-lg-6 mb-4">
            <Card bodyStyle={{ padding: "10px 15px" }} hoverable={true} className="dtc-br-10">
              <h5 className="text-primary">{renderTitle(index)}</h5>
              {Object.values(BANK_DETAILS).map((field) => (
                <div key={`${record.id}-${field}`} className="d-flex justify-content-between">
                  <b>{BANK_DETAIL_LABELS[field]} </b>
                  {record[field]}
                </div>
              ))}
            </Card>
          </div>
        ))}
    </div>
  );
};
