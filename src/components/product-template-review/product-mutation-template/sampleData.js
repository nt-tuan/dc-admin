const sampleData = {
  vitalInformation: [
    { key: "categories", value: "sampleCategoriesId" },
    { key: "type", value: "typeId" }
  ],
  customVital: [
    { key: "Custom title 1", value: "s" },
    { key: "customVital_2", value: "sampleCustom2" }
  ],
  details: {
    variantDetails: [
      {
        fieldName: "custom field 1",
        type: "dropdown",
        fieldOption: [
          {
            label: "option1",
            childField: [
              {
                fieldName: "custom child field 1",
                type: "dropdown",
                fieldOption: [
                  { label: "child label 1" },
                  { label: "child label 2" },
                  { label: "child label 3" }
                ]
              }
            ]
          }
        ]
      },
      {
        fieldName: "custom field 2",
        type: "textbox",
        fieldOption: [
          {
            allowInput: "string",
            fieldType: "text"
          }
        ]
      }
    ],
    offerDetails: [],
    packingDetails: []
  }
};
