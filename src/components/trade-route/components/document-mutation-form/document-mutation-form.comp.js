import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  TextField
} from "@mui/material";
import { UploadFile } from "@/components/commons";
import React, { useEffect } from "react";

import { RouteService } from "../../services/route.service";
import { DOCUMENT_SCHEMA } from "./document.schema";

export const DocumentMutationForm = ({
  selectedDocument,
  formik,
  handleCancelDocumentMutation,
  isEdit
}) => {
  useEffect(() => {
    if (selectedDocument.current) {
      const targetDoc = selectedDocument.current;
      formik.setValues({
        documentName: targetDoc.name,
        documentType: targetDoc.routeDocumentTypeEnum,
        sampleFile: targetDoc?.fileName
          ? {
              name: targetDoc.fileName,
              originalName: targetDoc.originalFileName ?? targetDoc.fileName,
              url: targetDoc.url,
              uid: targetDoc.fileName
            }
          : {
              name: "",
              originalName: "",
              uid: "",
              url: ""
            }
      });
    }
    // TODO: @HauDo please resolve this
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDocument]);

  useEffect(() => {
    if (!isEdit.current) formik.setValues(DOCUMENT_SCHEMA.initialFormValue);
    // TODO: @HauDo please resolve this
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

  const uploadFile = (file) => {
    return RouteService.uploadDocument(file);
  };

  const handleChangeDocumentType = (e) => {
    formik.setFieldValue("sampleFile", {
      name: "",
      originalName: "",
      uid: "",
      url: ""
    });
    formik.setFieldValue("documentType", e.target.value);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        name="documentName"
        label="Document Name"
        value={formik.values.documentName}
        onChange={formik.handleChange}
        error={formik.touched.documentName && Boolean(formik.errors.documentName)}
        helperText={formik.touched.documentName && formik.errors.documentName}
        sx={{ marginTop: 1 }}
      />
      <TextField
        fullWidth
        select
        name="documentType"
        label="Document Type"
        value={formik.values.documentType}
        onChange={handleChangeDocumentType}
        error={formik.touched.documentType && Boolean(formik.errors.documentType)}
        helperText={formik.touched.documentType && formik.errors.documentType}
        sx={{ marginTop: 3 }}
      >
        {fileTypes.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
      <InputLabel sx={{ marginTop: 3 }}>Please upload a sample file of the document.</InputLabel>
      <FormControl name="sampleFile" fullWidth>
        <UploadFile
          disabled={!DOCUMENT_SCHEMA.acceptTypes[formik.values.documentType]}
          accept={DOCUMENT_SCHEMA.acceptTypes[formik.values.documentType]}
          title="Upload"
          maxSize={5000}
          uploadHandler={uploadFile}
          formik={formik}
          value={formik.values.sampleFile}
        />
        {formik.touched.sampleFile && (
          <FormHelperText error>{formik.errors.sampleFile}</FormHelperText>
        )}
      </FormControl>
      <Button
        onClick={handleCancelDocumentMutation}
        variant="outlined"
        sx={{
          color: "#fb434a",
          borderColor: "#fb434a !important",
          marginTop: 3,
          marginLeft: 1,
          float: "right",
          "&:hover": {
            background: "white",
            opacity: "0.7"
          }
        }}
      >
        Cancel
      </Button>
      <Button autoFocus variant="contained" type="submit" sx={{ marginTop: 3, float: "right" }}>
        Confirm
      </Button>
    </form>
  );
};

const fileTypes = [
  {
    label: "PDF",
    value: "PDF"
  },
  {
    value: "XLSX",
    label: "Excel"
  }
];
