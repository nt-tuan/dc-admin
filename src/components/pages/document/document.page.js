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

const { confirm } = Modal;

const OrderActiveTab = () => {
  //   const [data, setData] = useState([]);
  const [showDocumentMutationModal, setShowDocumentMutationModal] = useState(false);
  const [mutationTitle, setMutationTitle] = useState("");
  const [documents, setDocuments] = useState([]);
  const formRef = useRef();
  const isEdit = useRef(false);
  const selectedDocument = useRef({});

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
          fileName: data.sampleFile && data.sampleFile[0].uid,
          name: data.documentName,
          routeDocumentTypeEnum: data.documentType,
          originalFileName: data.sampleFile && data.sampleFile[0].originalName
        };
        try {
          await RouteService.createDocument(composedData);
          setShowDocumentMutationModal(false);
          message.success("Create Successfully");
          handleGetAllDocs();
        } catch (error) {
          if (error.message === "400") {
            message.error(error.errMsg);
            return;
          }
          throw error;
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
          fileName: data.sampleFile && data.sampleFile[0].uid,
          name: data.documentName,
          routeDocumentTypeEnum: data.documentType,
          originalFileName: data.sampleFile && data.sampleFile[0].originalName
        };
        try {
          await RouteService.editDocument(selectedDocument.current.id, composedData);
          setShowDocumentMutationModal(false);
          message.success("Edit Successfully");
          handleGetAllDocs();
        } catch (error) {
          if (error.message === "400") {
            message.error(error.errMsg);
            return;
          }
          throw error;
        }
      }
    });
  };

  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
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
        onCancel={() => setShowDocumentMutationModal(false)}
        onOk={isEdit.current ? handleEditDocument : handleCreateDocument}
        title={mutationTitle}
        visible={showDocumentMutationModal}
        forceRender
      >
        <DocumentMutationForm ref={formRef} />
      </Modal>
    </div>
  );
};

export default OrderActiveTab;
