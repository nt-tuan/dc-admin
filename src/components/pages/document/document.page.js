import { Button, Modal } from "antd";
import { ROUTE_SCHEMA } from "commons/schemas";
import { DTCTable } from "components";
import { DocumentMutationForm } from "components/organisms";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const { confirm } = Modal;

const data = [
  {
    id: 1,
    createdDate: "11-11-2020 16:06:24",
    route: "Route",
    to: "UAE",
    from: "Viet Nam"
  }
];

const OrderActiveTab = () => {
  //   const [data, setData] = useState([]);
  const [showDocumentMutationModal, setShowDocumentMutationModal] = useState(false);
  const [mutationTitle, setMutationTitle] = useState("");

  const handleEditClick = () => {
    setMutationTitle("Edit Document");
    setShowDocumentMutationModal(true);
  };

  const handleDeleteClick = () => {
    confirm({
      title: "Do you Want to delete this document?",
      icon: <ExclamationCircleOutlined />
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
          }}
        >
          Create Document
        </Button>
      </div>

      <DTCTable
        showSettings={false}
        loading={false}
        dataSource={data}
        schema={ROUTE_SCHEMA.getTableSchema(handleEditClick, handleDeleteClick)}
      />
      <Modal
        onCancel={() => setShowDocumentMutationModal(false)}
        title={mutationTitle}
        visible={showDocumentMutationModal}
      >
        <DocumentMutationForm />
      </Modal>
    </div>
  );
};

export default OrderActiveTab;
