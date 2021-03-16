import React from "react";
import {
  typeTAX,
  taxTypeOtherValue,
  taxRulesValue
} from "components/organisms/route/forms/tax-rules/tax.chemas";
import { toCurrency } from "utils/general.util";

function HoverTax({ data }) {
  if (!data || !data?.length) {
    return null;
  }
  // const mainTax = data[0];
  const mainTax = data.find((item) => item.applyType === typeTAX.MAIN);
  const OtherTax = data.filter((item) => item.applyType === typeTAX.OTHERS);

  return (
    <div className="px-2 py-2">
      {mainTax && (
        <div>
          <h6 className="text-left">Snapshot of Tax Details</h6>
          <p className="row justify-content-between px-3 text-secondary font-size-12">
            <strong>
              {mainTax?.type && taxRulesValue.find((item) => item.value === mainTax.type)?.label}
            </strong>
            <span>{mainTax?.percent}%</span>
          </p>
        </div>
      )}

      {OtherTax && OtherTax.length > 0 ? (
        <div className="pt-1 pl-2">
          <h6 className="text-left">Other Taxes:</h6>
          {OtherTax &&
            OtherTax.map((item) => {
              return (
                <p className="row justify-content-between px-3 text-secondary font-size-12">
                  <strong className="pl-2">
                    {item?.type && taxTypeOtherValue.find((val) => val.value === item.type)?.label}
                  </strong>
                  {item?.percent && <span>{item.percent}%</span>}
                  {item?.lumpSum && <span>{toCurrency(item.lumpSum)}</span>}
                </p>
              );
            })}
        </div>
      ) : null}
    </div>
  );
}

export default HoverTax;
