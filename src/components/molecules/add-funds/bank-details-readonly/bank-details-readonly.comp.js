import React, { Fragment, useState } from "react";
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
  label = KYC3_LABEL,
  isCopy = false
}) => {
  const [isCopyClicked, setIsCopyClicked] = useState(false);
  const [isCopyClickedList, setIsCopyClickedList] = useState();

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

  const handleCopyTitle = (value) => {
    handleCopyText(value);
    setIsCopyClicked(true);
    setIsCopyClickedList(true);

    setTimeout(() => {
      setIsCopyClicked(false);
    }, 1000);
  };

  const handleCopyListData = (value) => {
    handleCopyText(value);
    setIsCopyClicked(false);
    setIsCopyClickedList(value);

    setTimeout(() => {
      setIsCopyClickedList(false);
    }, 1000);
  };

  let labelSwiftCodePrimary;
  let labelSwiftCodeSecondary;

  const renderLabelCode = (value, field, index) => {
    let labelBank = label[field];
    if (index === 0 && value === "ACH" && field === "bankIdType") {
      labelSwiftCodePrimary = "ACH Company ID";
    }
    if (index === 1 && value === "ACH" && field === "bankIdType") {
      labelSwiftCodeSecondary = "ACH Company ID";
    }
    if (index === 0 && value === "SWIFT" && field === "bankIdType") {
      labelSwiftCodePrimary = "SWIFT Code";
    }
    if (index === 1 && value === "SWIFT" && field === "bankIdType") {
      labelSwiftCodeSecondary = "SWIFT Code";
    }
    if (index === 0 && value === "CHIPS" && field === "bankIdType") {
      labelSwiftCodePrimary = "CHIPS UID";
    }
    if (index === 1 && value === "CHIPS" && field === "bankIdType") {
      labelSwiftCodeSecondary = "CHIPS UID";
    }
    if (index === 0 && field === "swiftCode") {
      labelBank = labelSwiftCodePrimary;
    }
    if (index === 1 && field === "swiftCode") {
      labelBank = labelSwiftCodeSecondary;
    }
    return labelBank;
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
                {isCopy && (
                  <tr className="bank__details__table-header">
                    <span
                      onClick={() => handleCopyTitle(bankDetails)}
                      className={`fe ${isCopyClicked ? "fe-check" : "fe-copy"} dtc-cursor-pointer`}
                    >
                      <span style={{ color: "#00b2ff" }}> Copy </span>
                    </span>
                    and Paste the details onto your bank’s website
                  </tr>
                )}
                {showTitle && <h5 className="text-primary p-2 mb-0">{renderTitle(index)}</h5>}
                {Object.values(schema).map((field) => (
                  <tr key={`${record.id}-${field}`} className="d-flex justify-content-between">
                    <div
                      className="bank__details__row__content"
                      style={{ width: `${isCopy ? "70%" : "100%"}` }}
                    >
                      <b className={label[field] === "Payment Reference" ? "red-color" : null}>
                        {renderLabelCode(record[field], field, index)}{" "}
                      </b>
                      <div className={field === "paymentReference" ? "red-color font-bold" : null}>
                        {field === BANK_DETAILS.nationality
                          ? countryList.find((c) => c.alpha2Code === record[field]).name
                          : record[field]}
                      </div>
                    </div>
                    {isCopy && (
                      <span
                        className={`fe ${
                          isCopyClickedList === record[field] || isCopyClicked
                            ? "fe-check"
                            : "fe-copy"
                        } dtc-cursor-pointer `}
                        style={{ color: "#00b2ff" }}
                        onClick={() => handleCopyListData(record[field])}
                      >
                        <span style={{ color: "#00b2ff", marginLeft: "0.5rem" }}>Copy</span>
                      </span>
                    )}
                  </tr>
                ))}
              </table>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};
