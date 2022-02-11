import * as yup from "yup";

import { AlertComponent, ConfirmModal, DTCSection, DTCTable } from "components/commons";
import { Box, Button, Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { APIError } from "commons/types";
import { DOCUMENT_SCHEMA } from "components/organisms/route/document.schema";
import { DatetimeUtils } from "utils/date-time.util";
import { DocumentMutationForm } from "components/organisms";
import { Helmet } from "react-helmet";
import { RouteService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import qs from "qs";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

const parseDocument = (doc) => ({
  ...doc,
  createdDate: DatetimeUtils.formatDateTime(doc.createdDate)
});
const composeDocumentForm = (data) => ({
  fileName: data.sampleFile?.name,
  originalFileName: data.sampleFile?.originalName,
  name: data.documentName,
  routeDocumentTypeEnum: data.documentType
});
const validationSchema = yup.object({
  documentName: yup.string().required("Please input your Document Name!"),
  documentType: yup.string().required("Please input your Document Type!"),
  sampleFile: yup
    .object()
    .shape({
      name: yup.string(),
      originalName: yup.string(),
      uid: yup.string(),
      url: yup.string()
    })
    .required("Please upload a file with type as Document Type")
    .test("is-valid-name", "Please upload a file with type as Document Type", (value, object) => {
      const documentType = object.parent.documentType;
      if (!value) return false;
      return value.name
        ?.toLowerCase()
        .endsWith(DOCUMENT_SCHEMA.acceptTypes[documentType].toLowerCase());
    })
});
const OrderActiveTab = () => {
  const [showDocumentMutationModal, setShowDocumentMutationModal] = useState(false);
  const [mutationTitle, setMutationTitle] = useState("");
  const [documents, setDocuments] = useState([]);
  const [defaultDocuments, setDefaultDocuments] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    content: "",
    state: "success"
  });
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    title: "",
    innerText: "",
    onConfirmDelete: () => undefined
  });

  const isEdit = useRef(false);
  const selectedDocument = useRef({});
  const location = useLocation();
  const routeState = location.state ? location.state : null;
  const { showCreateDocument } = qs.parse(location.search, { ignoreQueryPrefix: true });
  const history = useHistory();

  useEffect(() => {
    if (showCreateDocument) {
      setMutationTitle("Create Document");
      setShowDocumentMutationModal(true);
    }
  }, [showCreateDocument]);

  const isDefaultDocument = (doc) =>
    defaultDocuments?.some((defaultDoc) => defaultDoc.id === doc.id);

  const handleGetAllDocs = useCallback(() => {
    asyncErrorHandlerWrapper(async () => {
      const docs = await getAllRecordsFromAPI(RouteService.getDocuments);
      const defaultDocs = await RouteService.getDefaultDocuments();
      setDocuments(docs.map(parseDocument));
      setDefaultDocuments(defaultDocs.map(parseDocument));
    });
  }, []);

  useEffect(() => {
    handleGetAllDocs();
  }, [handleGetAllDocs]);

  const handleEditClick = (id) => {
    const targetDoc = documents.find((doc) => doc.id === id);
    setMutationTitle("Edit Document");
    setShowDocumentMutationModal(true);
    isEdit.current = true;
    selectedDocument.current = targetDoc;
  };

  const handleDeleteClick = (id) => {
    setConfirmModal({
      title: "Are you sure?",
      innerText: "Do you want to delete this document?",
      show: true,
      onConfirmDelete: () => {
        asyncErrorHandlerWrapper(async () => {
          await RouteService.deleteDocument(id);
          handleGetAllDocs();
          setConfirmModal({
            show: false,
            title: "",
            innerText: "",
            onConfirmDelete: () => undefined
          });
          setAlert({
            content: "Deleted Successfully!",
            state: "success",
            open: true
          });
        });
      }
    });
  };

  const handleCreadDocumentFailed = (error) => {
    if (error instanceof APIError) {
      const err = error.errors;
      setAlert({
        content: err[0][1],
        state: "warning",
        open: true
      });
      return;
    }
    if (error?.errMsg === "Document name existed") {
      formik.setErrors({
        documentName: "This document has been created, please create a new one."
      });
      return;
    }
    throw error;
  };

  const handleCreateDocument = (value) => {
    asyncErrorHandlerWrapper(async () => {
      const composedData = composeDocumentForm(value);
      try {
        await RouteService.createDocument(composedData);
        setShowDocumentMutationModal(false);
        if (showCreateDocument && routeState) {
          history.push(routeState.previousPage);
          return;
        }
        setAlert({
          content: "Created Successfully!",
          state: "success",
          open: true
        });
        handleGetAllDocs();
      } catch (error) {
        handleCreadDocumentFailed(error);
      }
    });
  };

  const handleEditDocument = (value) => {
    asyncErrorHandlerWrapper(async () => {
      const composedData = composeDocumentForm(value);
      try {
        await RouteService.editDocument(selectedDocument.current.id, composedData);
        setShowDocumentMutationModal(false);
        setAlert({
          content: "Edit Successfully!",
          state: "success",
          open: true
        });
        handleGetAllDocs();
      } catch (error) {
        if (error instanceof APIError) {
          const err = error.errors;
          setAlert({
            content: err[0][1],
            state: "warning",
            open: true
          });
        } else {
          throw error;
        }
      }
    });
  };

  const handleCancelDocumentMutation = () => {
    if (showCreateDocument && routeState) {
      history.push(routeState.previousPage);
    }
    setShowDocumentMutationModal(false);
  };

  const handleCloseConfirmModal = () => {
    setConfirmModal({
      show: false,
      title: "",
      onConfirmDelete: () => undefined
    });
  };

  const handleCloseAlert = () => {
    setAlert({
      open: false,
      content: "",
      state: "success"
    });
  };

  const formik = useFormik({
    initialValues: DOCUMENT_SCHEMA.initialFormValue,
    validationSchema: validationSchema,
    onSubmit: isEdit.current ? handleEditDocument : handleCreateDocument
  });

  const columns = DOCUMENT_SCHEMA.getTableSchema(
    handleEditClick,
    handleDeleteClick,
    isDefaultDocument
  );

  return (
    <DTCSection>
      <DTCSection.Content>
        <Helmet title="Documents" />
        <Stack direction="row" justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={(e) => {
              setMutationTitle("Create Document");
              setShowDocumentMutationModal(true);
              isEdit.current = false;
            }}
          >
            Create Document
          </Button>
        </Stack>

        <Box mt={2} height="500px">
          <DTCTable
            columnBuffer={columns.length}
            loading={false}
            dataSource={documents}
            columns={columns}
          />
        </Box>
        <ConfirmModal
          showForm={confirmModal.show}
          title={confirmModal.title}
          innerText={confirmModal.innerText}
          onConfirmLock={confirmModal.onConfirmDelete}
          toggleShowForm={handleCloseConfirmModal}
        />
        <AlertComponent
          content={alert.content}
          open={alert.open}
          state={alert.state}
          handleClose={handleCloseAlert}
        />
        <Dialog open={showDocumentMutationModal} onClose={handleCancelDocumentMutation}>
          <DialogTitle>{mutationTitle}</DialogTitle>
          <DialogContent>
            <DocumentMutationForm
              formik={formik}
              selectedDocument={selectedDocument}
              handleEditDocument={handleEditDocument}
              handleCreateDocument={handleCreateDocument}
              handleCancelDocumentMutation={handleCancelDocumentMutation}
              isEdit={isEdit}
            />
          </DialogContent>
        </Dialog>
      </DTCSection.Content>
    </DTCSection>
  );
};

export default OrderActiveTab;
