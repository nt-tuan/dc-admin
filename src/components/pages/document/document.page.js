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

const OrderActiveTab = () => {
  //   const [data, setData] = useState([]);
  const [showDocumentMutationModal, setShowDocumentMutationModal] = useState(false);
  const [mutationTitle, setMutationTitle] = useState("");
  const [documents, setDocuments] = useState([]);
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
      setDocuments(
        docs.map((record) => ({
          ...record,
          createdDate: DatetimeUtils.formatDateTime(record.createdDate)
        }))
      );
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
      sampleFile: targetDoc.url
        ? [
            {
              name: targetDoc.name,
              url: targetDoc.url,
              uid: targetDoc.fileName,
              status: "done"
            }
          ]
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

  const handleCreateDocument = () => {
    asyncErrorHandlerWrapper(async () => {
      const isValid = await handleFormValidate();
      if (isValid) {
        const data = formRef.current.getFieldsValue();
        const composedData = {
          fileName: data?.sampleFile[0]?.uid,
          name: data.documentName,
          routeDocumentTypeEnum: data.documentType,
          originalFileName: data?.sampleFile[0]?.originalName
        };
        try {
          await RouteService.createDocument(composedData);
          setShowDocumentMutationModal(false);
          if (showCreateDocument && routeState) {
            history.push(routeState.previousPage);
          } else {
            message.success("Created Successfully");
            handleGetAllDocs();
          }
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

  const handleEditDocument = () => {
    asyncErrorHandlerWrapper(async () => {
      const isValid = await handleFormValidate();
      if (isValid) {
        const data = formRef.current.getFieldsValue();
        const composedData = {
          fileName: data.sampleFile && data.sampleFile[0] && data.sampleFile[0].uid,
          name: data.documentName,
          routeDocumentTypeEnum: data.documentType,
          originalFileName: data.sampleFile && data.sampleFile[0] && data.sampleFile[0].originalName
        };
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
        schema={DOCUMENT_SCHEMA.getTableSchema(handleEditClick, handleDeleteClick)}
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
