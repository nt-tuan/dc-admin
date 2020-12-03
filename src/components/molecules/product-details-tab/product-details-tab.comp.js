import { PRODUCT_DETAILS_LABELS } from "commons/consts";
import React, { memo } from "react";

export const ProductDetailsTab = memo(({ data }) => {
  return (
    <div className="air__utils__shadow p-3 dtc-br-10 bg-white mb-3">
      {data
        .filter((field) => field.key !== "customVital")
        .map(({ key, value, name }) => {
          if (!value) return;
          return (
            <div className="my-3" key={key}>
              <b>
                {PRODUCT_DETAILS_LABELS[key || name] ? PRODUCT_DETAILS_LABELS[key] : key || name}:
              </b>{" "}
              {value}
            </div>
          );
        })}
    </div>
  );
});
