import React, { Fragment } from "react";
import { KYC3_SCHEMA } from "commons/schemas";
import { Card } from "antd";
import { areObjectValuesUndefined } from "utils";
import countryList from "assets/country.json";
import "./bank-details-readonly.comp.scss";

const { BANK_DETAILS, KYC3_LABEL } = KYC3_SCHEMA;

export const BankDetailsReadonly = ({
  handleCopyText,
  bankDetails,
  showHeader = true,
  showTitle = true,
  schema = BANK_DETAILS,
  label = KYC3_LABEL
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
            <div
              key={record.id || index}
              className={`col-12 col-lg-${bankDetails.length === 1 ? "12" : "6"} mb-4`}
            >
              <table className="bank__details">
                <tr className="bank__details__table-header">
                  <span
                    onClick={() => handleCopyText(bankDetails)}
                    className="fe fe-copy mr-2 dtc-cursor-pointer"
                  />
                  <b style={{ color: "rgb(128, 200, 250)" }}>Copy</b> and Paste the details onto
                  your bank’s website
                </tr>
                {showTitle && <h5 className="text-primary p-2 mb-0">{renderTitle(index)}</h5>}
                {Object.values(schema).map((field) => (
                  <tr key={`${record.id}-${field}`} className="d-flex justify-content-between">
                    <div className="bank__details__row__content">
                      <b>{label[field]} </b>
                      <div>
                        {field === BANK_DETAILS.nationality
                          ? countryList.find((c) => c.alpha2Code === record[field]).name
                          : record[field]}
                      </div>
                    </div>
                    <span
                      className="fe fe-copy dtc-cursor-pointer"
                      onClick={() => handleCopyText(record[field])}
                    >
                      <b style={{ color: "rgb(128, 200, 250)", marginLeft: "0.5rem" }}>Copy</b>
                    </span>
                  </tr>
                ))}
              </table>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};
