import * as yup from "yup";

import { Box, Button, Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import { ConfirmModal, DTCSection, DTCTable } from "components/commons";
import { DOCUMENT_SCHEMA, DocumentMutationForm } from "../components/document-mutation-form";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { APIError } from "commons/types";
import { DatetimeUtils } from "utils/date-time.util";
import { Helmet } from "react-helmet";
import { RouteService } from "../services/route.service";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import qs from "qs";
import { useFormik } from "formik";
import { useMessage } from "@/hooks/use-message";

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
    .test("is-valid-name", "Please upload a file with type as Document Type", (value, object) => {
      const documentType = object.parent.documentType;
      if (!value || !value.name) return true;
      return value.name
        ?.toLowerCase()
        .endsWith(DOCUMENT_SCHEMA.acceptTypes[documentType].toLowerCase());
    })
});
const CREATE_DOCUMENT = "Create Document";
const DocumentPage = () => {
  const [showDocumentMutationModal, setShowDocumentMutationModal] = useState(false);
  const [mutationTitle, setMutationTitle] = useState("");
  const [documents, setDocuments] = useState([]);
  const [defaultDocuments, setDefaultDocuments] = useState([]);
  const message = useMessage();

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
      setMutationTitle(CREATE_DOCUMENT);
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
    setMutationTitle(CREATE_DOCUMENT);
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
          message.success("Deleted Successfully!");
        });
      }
    });
  };

  const handleCreadDocumentFailed = (error) => {
    if (error instanceof APIError) {
      const err = error.errors;
      message.warning(err[0][1]);
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
        formik.resetForm();
        setShowDocumentMutationModal(false);
        if (showCreateDocument && routeState) {
          history.push(routeState.previousPage);
          return;
        }
        message.success("Created Successfully!");
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
        message.success("Edit Successfully!");
        handleGetAllDocs();
        formik.resetForm();
      } catch (error) {
        if (error instanceof APIError) {
          const err = error.errors;
          message.warning(err[0][1]);
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
            {CREATE_DOCUMENT}
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
        {showDocumentMutationModal && (
          <Dialog open onClose={handleCancelDocumentMutation}>
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
        )}
      </DTCSection.Content>
    </DTCSection>
  );
};

export default DocumentPage;
