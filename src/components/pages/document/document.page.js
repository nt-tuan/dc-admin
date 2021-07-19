import { Button, Modal, message } from "antd";
import { DOCUMENT_SCHEMA } from "commons/schemas";
import { DTCTable } from "components";
import { DocumentMutationForm } from "components/organisms";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { RouteService } from "services";
import { getAllRecordsFromAPI } from "utils/general.util";
import { DatetimeUtils } from "utils/date-time.util";
import { useLocation } from "react-router-dom";
import qs from "qs";
import { useHistory } from "react-router-dom";
import { APIError } from "commons/types";
import { Helmet } from "react-helmet";

const { confirm } = Modal;
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
const OrderActiveTab = () => {
  //   const [data, setData] = useState([]);
  const [showDocumentMutationModal, setShowDocumentMutationModal] = useState(false);
  const [mutationTitle, setMutationTitle] = useState("");
  const [documents, setDocuments] = useState([]);
  const [defaultDocuments, setDefaultDocuments] = useState([]);
  const [forceRender, setForceRender] = useState(true);
  const formRef = useRef();
  const isEdit = useRef(false);
  const selectedDocument = useRef({});
  const location = useLocation();
  const routeState = location.state ? location.state : null;
  const { showCreateDocument } = qs.parse(location.search, { ignoreQueryPrefix: true });
  const history = useHistory();

  useEffect(() => {
    if (showCreateDocument) {
      setMutationTitle("Create Document");
      setForceRender(false);
      setShowDocumentMutationModal(true);
    }
  }, [showCreateDocument]);

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
    formRef.current.setFieldsValue({
      documentName: targetDoc.name,
      documentType: targetDoc.routeDocumentTypeEnum,
      sampleFile: targetDoc?.fileName
        ? {
            name: targetDoc.fileName,
            originalName: targetDoc.originalFileName ?? targetDoc.fileName,
            url: targetDoc.url,
            uid: targetDoc.fileName
          }
        : undefined
    });
  };

  const handleDeleteClick = (id) => {
    confirm({
      title: "Do you Want to delete this document?",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        asyncErrorHandlerWrapper(async () => {
          await RouteService.deleteDocument(id);
          message.success("Deleted Successfully");
          handleGetAllDocs();
        });
      }
    });
  };

  const handleFormValidate = async () => {
    try {
      await formRef.current.validateFields();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleCreadDocumentFailed = (error) => {
    if (error instanceof APIError) {
      const err = error.errors;
      message.warning(err[0][1]);
      return;
    }
    if (error?.errMsg === "Document name existed") {
      formRef.current.setFields([
        {
          name: "documentName",
          errors: ["This document has been created, please create a new one."]
        }
      ]);
      return;
    }
    throw error;
  };

  const handleCreateDocument = () => {
    asyncErrorHandlerWrapper(async () => {
      const isValid = await handleFormValidate();
      if (!isValid) return;
      const data = formRef.current.getFieldsValue();
      const composedData = composeDocumentForm(data);
      try {
        await RouteService.createDocument(composedData);
        setShowDocumentMutationModal(false);
        if (showCreateDocument && routeState) {
          history.push(routeState.previousPage);
          return;
        }
        message.success("Created Successfully");
        handleGetAllDocs();
      } catch (error) {
        handleCreadDocumentFailed(error);
      }
    });
  };

  const handleEditDocument = () => {
    asyncErrorHandlerWrapper(async () => {
      const isValid = await handleFormValidate();
      if (isValid) {
        const data = formRef.current.getFieldsValue();
        const composedData = composeDocumentForm(data);
        try {
          await RouteService.editDocument(selectedDocument.current.id, composedData);
          setShowDocumentMutationModal(false);
          message.success("Edit Successfully");
          handleGetAllDocs();
        } catch (error) {
          if (error instanceof APIError) {
            const err = error.errors;
            message.warning(err[0][1]);
          } else {
            throw error;
          }
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

  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      <Helmet title="Documents" />
      <div className="d-flex justify-content-end">
        <Button
          type="primary"
          className="mb-3"
          onClick={(e) => {
            setMutationTitle("Create Document");
            setShowDocumentMutationModal(true);
            formRef.current.resetFields();
            isEdit.current = false;
          }}
        >
          Create Document
        </Button>
      </div>

      <DTCTable
        showSettings={false}
        loading={false}
        dataSource={documents}
        schema={DOCUMENT_SCHEMA.getTableSchema(
          handleEditClick,
          handleDeleteClick,
          defaultDocuments
        )}
      />
      <Modal
        onCancel={handleCancelDocumentMutation}
        onOk={isEdit.current ? handleEditDocument : handleCreateDocument}
        title={mutationTitle}
        visible={showDocumentMutationModal}
        forceRender={forceRender}
      >
        <DocumentMutationForm ref={formRef} />
      </Modal>
    </div>
  );
};

export default OrderActiveTab;
