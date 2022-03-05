import { taxRulesValue, taxTypeOtherValue, typeTAX } from "./tax.schema";

import React from "react";
import { toCurrency } from "utils/general.util";

export function TaxHover({ data }) {
  if (!data || !data?.length) {
    return null;
  }

  const mainTax = data.find((item) => item.applyType === typeTAX.MAIN);
  const OtherTax = data.filter((item) => item.applyType === typeTAX.OTHERS);

  return (
    <div className="px-2 py-2">
      {mainTax && (
        <div>
          <h6 className="text-left">Snapshot of Tax Details</h6>
          <p className="row justify-content-between px-3 text-secondary font-size-12">
            <strong>
              {mainTax?.type && mainTax?.type !== "OTHER"
                ? taxRulesValue.find((item) => item.value === mainTax.type)?.label
                : mainTax?.name}
            </strong>
            <span>{mainTax?.percent}%</span>
          </p>
        </div>
      )}

      {OtherTax && OtherTax.length > 0 ? (
        <div className="pt-1 pl-2 pr-3">
          <h6 className="text-left">Other Taxes:</h6>
          {OtherTax &&
            OtherTax.map((item) => {
              return (
                <p
                  className="row justify-content-between px-3 text-secondary font-size-12 pr-2"
                  style={{ minWidth: "240px" }}
                >
                  <strong className="pl-2 pl-3 ">
                    {item?.type && item?.type !== "OTHER"
                      ? taxTypeOtherValue.find((val) => val.value === item.type)?.label
                      : item?.name}
                  </strong>
                  {item?.percent && <span>{item.percent}%</span>}
                  {item?.lumpSum && <span>{toCurrency(item.lumpSum, "USD")}</span>}
                </p>
              );
            })}
        </div>
      ) : null}
    </div>
  );
}
