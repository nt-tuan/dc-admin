import { FormControlLabel, FormGroup } from "@mui/material";
import { newDocumentRule, parseDocument } from "./mapper";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import React from "react";
import { useFormikContext } from "formik";

export const DocumentList = ({ fieldName, documentTypes, defaultDocuments }) => {
  const { setFieldValue, values } = useFormikContext();
  const currentDocuments = values[fieldName] ?? [];

  const handleDocumentChecked = (id) => {
    const selectedDocumentType = documentTypes.find((item) => item.id === id);
    if (!selectedDocumentType) return;
    const nextDocuments = [...currentDocuments, newDocumentRule(selectedDocumentType)];
    setFieldValue(fieldName, nextDocuments);
  };

  const handleDocumentUnchecked = (id) => {
    const nextDocuments = currentDocuments.filter((item) => item.id !== id);
    setFieldValue(fieldName, nextDocuments);
  };

  const handleCheckboxClick = (e, id) => {
    const isChecked = e.target.checked;
    if (!isChecked) {
      handleDocumentUnchecked(id);
      return;
    }
    handleDocumentChecked(id);
  };
  const isCheckedAll = documentTypes.every((item) =>
    currentDocuments.some((checkedDoc) => checkedDoc.id === item.id)
  );

  const isIndeterminate = currentDocuments.length > 0;
  const handleCheckAllDocuments = () => {
    const willSelectedDocuments = documentTypes
      .filter((documentType) => !currentDocuments.some((current) => current.id === documentType.id))
      .map(newDocumentRule);
    setFieldValue(fieldName, [...currentDocuments, ...willSelectedDocuments]);
  };

  const handleUncheckAllDocuments = () => {
    const selectedDocuments = parseDocument(defaultDocuments, documentTypes);
    setFieldValue(fieldName, selectedDocuments);
  };
  const handleCheckAll = () => {
    if (isCheckedAll) {
      handleUncheckAllDocuments();
      return;
    }
    handleCheckAllDocuments();
  };
  return (
    <Box
      style={{
        width: "400px",
        border: "solid 1px #f1f1f1",
        borderRadius: "5px",
        padding: "20px"
      }}
    >
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleCheckAll}
              checked={isCheckedAll}
              indeterminate={!isCheckedAll && isIndeterminate}
              disabled={documentTypes.length === 0}
            />
          }
          label="Select all"
        />
      </FormGroup>

      <hr />
      <FormGroup>
        {documentTypes.map((opt, index) => (
          <FormControlLabel
            key={opt.id}
            control={
              <Checkbox
                onChange={(e) => handleCheckboxClick(e, opt.id)}
                value={opt.id}
                disabled={defaultDocuments.some((d) => d.id === opt.id)}
                checked={currentDocuments.some((item) => item.id === opt.id)}
              />
            }
            label={opt.name}
          />
        ))}
      </FormGroup>
    </Box>
  );
};
