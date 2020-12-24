import { Input, Select } from "antd";
import React, { memo, useCallback, useState } from "react";

export const OfferDetailsTab = memo(({ data }) => {
  return (
    <div className="p-3 mb-3">
      {Object.keys(data)
        .filter((item) => item !== "productImage")
        .map((field) => (
          <ProductReviewSection key={field} name={field} data={data[field]} />
        ))}
    </div>
  );
});

const ProductReviewSection = memo(({ name, data }) => {
  const [selectedParent, setSelectedParent] = useState({});

  const handleOptionClick = useCallback((fieldName, value) => {
    setSelectedParent((state) => ({
      ...state,
      [fieldName]: [value]
    }));
  }, []);

  const mappingType = useCallback(
    (type, options, fieldName) => {
      switch (type) {
        case "multiDropdown":
        case "dropdown":
          return (
            <Select style={{ width: "100%" }} mode={type === "multiDropdown" ? "multiple" : null}>
              {options.map((option) => (
                <Select.Option value={option.label} key={option.label}>
                  <div
                    onClick={() => handleOptionClick(fieldName, option.label)}
                    className="text-capitalize"
                  >
                    {option.label}
                  </div>
                </Select.Option>
              ))}
            </Select>
          );

        case "radio": {
          return options.map((option) => (
            <div key={option.label} className="col-xl-4 col-12">
              <input
                type="radio"
                name={fieldName}
                onClick={() => handleOptionClick(fieldName, option.label)}
              />
              <label htmlFor={option.label} className="text-capitalize ml-2">
                {option.label}
              </label>
            </div>
          ));
        }

        case "textbox":
          return options[0].fieldType === "shortText" ? <Input /> : <Input.TextArea />;

        default:
          return;
      }
    },
    [handleOptionClick]
  );

  return (
    <div className="air__utils__shadow p-3 dtc-br-10 bg-white mb-3">
      <h5>{SECTION_LABEL[name]}</h5>
      {name === "certificationDetails" && (
        <div className="">Please choose certifications applicable for your product</div>
      )}
      <div className="row">
        {data
          .filter((item) =>
            item.parentField ? selectedParent[item.rootField]?.includes(item.parentField) : item
          )
          .map(({ fieldName, type, fieldOption }, index) => {
            if (type === "radio") {
              return (
                <div key={`${fieldName}${index}`} className="col-12 mt-3 row">
                  <div className="text-capitalize col-xl-3 col-12">{fieldName}</div>
                  <div className="col-12 col-xl-9 row">
                    {mappingType(type, fieldOption, fieldName)}
                  </div>
                </div>
              );
            }
            return (
              <div
                key={`${fieldName}${index}`}
                className={`col-12 mt-3 ${
                  type === "textbox" && fieldOption[0].fieldType === "longText"
                    ? "col-xl-9"
                    : "col-xl-6"
                }`}
              >
                <div className="text-capitalize">{fieldName}</div>
                {mappingType(type, fieldOption, fieldName)}
              </div>
            );
          })}
      </div>
    </div>
  );
});

const SECTION_LABEL = {
  variantDetails: "Variants",
  offerDetails: "Offer Details",
  packingDetails: "Packing Details",
  certificationDetails: "Certifications"
};
