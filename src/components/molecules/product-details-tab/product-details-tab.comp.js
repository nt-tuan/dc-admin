import { PRODUCT_DETAILS_LABELS } from "commons/consts";
import React, { memo, useMemo } from "react";

export const ProductDetailsTab = memo(({ data, categories, types }) => {
  const parsedData = useMemo(() => {
    const cloneData = [...data];
    cloneData
      .filter((field) => field.key !== "customVital")
      .forEach((field) => {
        if (field.key === "productCategory") {
          field.value = categories.find((item) => item.id === field.value)?.name;
        }
        if (field.key === "productType") {
          field.value = types.find((item) => item.id === field.value)?.name;
        }
      });
    return cloneData;
  }, [data, categories, types]);

  return (
    <div className="air__utils__shadow p-3 dtc-br-10 bg-white mb-3">
      {parsedData.map(({ key, value, name }) => {
        if (!value) return null;
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
