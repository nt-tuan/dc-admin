import React, { Fragment } from "react";
import { KYC3_SCHEMA } from "commons/schemas";
import { Card } from "antd";
import { areObjectValuesUndefined } from "utils/general.util";
const { BANK_DETAILS, KYC3_LABEL } = KYC3_SCHEMA;

export const BankDetailsReadonly = ({
  bankDetails,
  showHeader = true,
  showTitle = true,
  schema = BANK_DETAILS,
  label = KYC3_LABEL,
  classname = "col-12 col-lg-6 mb-4"
}) => {
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
    <React.Fragment>
      {showHeader ? (
        <Fragment>
          <h5 className="font-weight-bold">BANK DETAILS</h5>
          <hr />
        </Fragment>
      ) : null}
      <div className="row">
        {bankDetails
          .filter((account) => areObjectValuesUndefined(account) === false)
          .map((record, index) => (
            <div key={record.id || index} className={classname}>
              <Card bodyStyle={{ padding: "10px 15px" }} hoverable={true} className="dtc-br-10">
                {showTitle && <h5 className="text-primary">{renderTitle(index)}</h5>}
                {Object.values(schema).map((field) => (
                  <div key={`${record.id}-${field}`} className="d-flex justify-content-between">
                    <b>{label[field]} </b>
                    {record[field]}
                  </div>
                ))}
              </Card>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};
