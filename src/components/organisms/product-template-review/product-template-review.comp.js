import React, { Fragment, memo, useMemo } from "react";
import image from "assets/images/aramex-logo.png";
import { Tabs } from "antd";
import { OfferDetailsTab, ProductDetailsTab } from "components/molecules";
import { flatten, has, get } from "lodash";

export const ProductTemplateReview = memo(({ data = sample, categories, types }) => {
  const productName = useMemo(
    () =>
      Object.keys(data?.vitalInformation ? data?.vitalInformation : {})
        .filter((field) => field !== "customVital")
        .map((key) => {
          return { key, value: data?.vitalInformation[key] };
        })
        .find((item) => item.key === "productName")?.value,
    [data]
  );
  const productDetails = useMemo(
    () =>
      data.vitalInformation
        ? [
            ...Object.keys(data.vitalInformation)
              .map((key) => {
                return { key, value: data?.vitalInformation[key] };
              })
              .filter((item) => !["aheccCode", "aheccDescription"].includes(item.key)),
            ...data?.details?.customVital?.map((field) => {
              return {
                key: field.name,
                value: field.value
              };
            })
          ]
        : [],
    [data]
  );

  const preHandleOfferDetails = useMemo(() => {
    // puts parents and child fields at same root level, in following order:
    // parent field 1, ...child fields, parent field 2, ...child fields
    const flatData = (name) => {
      const orderedData = get(data, `details[${name}]`, []).map((field) => {
        const children = flatten(
          field.fieldOption.map((option) => {
            if (option?.childField) {
              return option.childField.map((child) => ({
                ...child,
                parentField: option.label,
                rootField: field.fieldName
              }));
            }
            return [];
          })
        );
        return [field, ...children];
      });
      return flatten(orderedData);
    };

    let offerDetailsTabSections = {};
    let sections = ["variantDetails", "offerDetails", "packingDetails", "certificationDetails"];

    sections.map((sectName) => (offerDetailsTabSections[sectName] = flatData(sectName)));

    return offerDetailsTabSections;
  }, [data]);

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-3 col-12 text-center mb-4">
          <h5 className="text-primary">Product Template Review</h5>
          <img
            src={data?.ProductUploadImagesForm.url}
            alt="Product"
            className="mt-2"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-xl-9 col-12">
          <h5 className="text-uppercase mb-0">{productName}</h5>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Offer Details" key="1">
              <OfferDetailsTab data={preHandleOfferDetails} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Product Details" key="2">
              <ProductDetailsTab
                data={productDetails.filter((field) => field.key && field.key !== "customVital")}
                categories={categories}
                types={types}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </Fragment>
  );
});

const sample = {
  vitalInformation: [
    { key: "productCategory", value: "Agribusiness" },
    { key: "productType", value: "Meat" },
    { key: "aheccCode", value: "08081001" },
    { key: "aheccDescription", value: "Delicious apple" },
    { key: "productName", value: "Apple" },
    { key: "hsCode", value: "80810" },
    { key: "chapterLabel", value: "Edible vegetables" },
    { key: "headingLabel", value: "Apple, pears" }
  ],
  customVital: [
    { key: "Custom Vital 1", value: "Sample Custom 1" },
    { key: "Custom vital 2", value: "Sample Custom 2" }
  ],
  details: {
    variantDetails: [
      {
        fieldName: "kinds of meal",
        type: "radio",
        fieldOption: [
          {
            label: "breakfast",
            childField: [
              {
                fieldName: "time of breakfast",
                type: "dropdown",
                fieldOption: [{ label: "6AM" }, { label: "7AM" }, { label: "8AM" }]
              },
              {
                fieldName: "price of breakfast",
                type: "radio",
                fieldOption: [{ label: "$100" }, { label: "$200" }, { label: "$300" }]
              }
            ]
          },
          {
            label: "lunch"
          },
          {
            label: "dinner",
            childField: [
              {
                fieldName: "type of dinner",
                type: "radio",
                fieldOption: [{ label: "chilli" }, { label: "peper" }, { label: "vegetable" }]
              }
            ]
          }
        ]
      },
      {
        fieldName: "Size",
        type: "dropdown",
        fieldOption: [
          {
            label: "Large",
            childField: [
              {
                fieldName: "unit of large",
                type: "dropdown",
                fieldOption: [{ label: "cm" }, { label: "mm" }, { label: "inch" }]
              },
              {
                fieldName: "shape of large",
                type: "radio",
                fieldOption: [{ label: "circle" }, { label: "triangle" }, { label: "rectangle" }]
              }
            ]
          },
          { label: "Medium" },
          { label: "Small" }
        ]
      }
    ],
    offerDetails: [
      {
        fieldName: "Multiselect Dropdown",
        type: "multiDropdown",
        fieldOption: [
          {
            label: "morning"
          },
          {
            label: "evening"
          },
          {
            label: "night"
          }
        ]
      },
      {
        fieldName: "Export Quantity",
        type: "radio",
        fieldOption: [
          {
            label: "yes",
            childField: [
              {
                fieldName: "unit of quantity",
                type: "dropdown",
                fieldOption: [{ label: "cm" }, { label: "mm" }, { label: "inch" }]
              },
              {
                fieldName: "shape of quantity",
                type: "radio",
                fieldOption: [{ label: "circle" }, { label: "triangle" }, { label: "rectangle" }]
              }
            ]
          },
          {
            label: "no"
          }
        ]
      },
      {
        fieldName: "Chemical Free",
        type: "radio",
        fieldOption: [
          {
            label: "yes"
          },
          {
            label: "no"
          },
          {
            label: "unknown"
          }
        ]
      },
      {
        fieldName: "Additional note",
        type: "textbox",
        fieldOption: [
          {
            allowInput: "string",
            fieldType: "longText"
          }
        ]
      }
    ],
    packingDetails: [
      {
        fieldName: "Packing Permission",
        type: "textbox",
        fieldOption: [
          {
            allowInput: "string",
            fieldType: "shortText"
          }
        ]
      },
      {
        fieldName: "Packing Options",
        type: "multiDropdown",
        fieldOption: [
          {
            label: "morning"
          },
          {
            label: "evening"
          },
          {
            label: "night"
          }
        ]
      },
      {
        fieldName: "Shipping Type",
        type: "dropdown",
        fieldOption: [
          {
            label: "air"
          },
          {
            label: "sea"
          },
          {
            label: "car"
          }
        ]
      }
    ],
    certification: [
      {
        fieldName: "Please Choose the certification applicable for your product",
        type: "multiDropdown",
        fieldOption: [
          {
            label: "Invoice"
          },
          {
            label: "Taxing"
          },
          {
            label: "Purchase Order"
          }
        ]
      }
    ],
    productImage: { url: image }
  }
};

const DEFAULT_OFFER_FIELDS = [
  {
    fieldName: "Quantity",
    type: "textbox",
    fieldOption: [
      {
        allowInput: "string",
        fieldType: "shortText"
      }
    ]
  },
  {
    fieldName: "Credit",
    type: "dropdown",
    fieldOption: [
      {
        label: "7 days"
      },
      {
        label: "14 days"
      },
      {
        label: "21 days"
      },
      {
        label: "28 days"
      },
      {
        label: "35 days"
      },
      {
        label: "Escrow on delivery"
      }
    ]
  },
  {
    fieldName: "Unit Price",
    type: "textbox",
    fieldOption: [
      {
        allowInput: "string",
        fieldType: "shortText"
      }
    ]
  },
  {
    fieldName: "Pickup Location",
    type: "dropdown",
    fieldOption: [
      {
        label: "123 ahiii, hcmc"
      }
    ]
  }
];
