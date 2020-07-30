import React, { useState } from "react";
import { EditableTable } from "components/organisms";
import { DTCSection } from "components/atoms";
import { Input, Divider, Checkbox, Row, Col, Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import { DocumentMutationForm } from "components/organisms/route/forms/document-mutation-form/document-mutation-form.comp";
const CheckboxGroup = Checkbox.Group;

const AddRoutePage = () => {
  const [showDocumentMutationModal, setShowDocumentMutationModal] = useState(false);
  const [mutationTitle, setMutationTitle] = useState("");

  return (
    <DTCSection>
      <div>
        <h3>Route Information</h3>
        <div className="d-flex">
          <div className="d-flex align-items-center mr-5">
            <span className="mr-1">To</span> <Input />
          </div>
          <div className="d-flex align-items-center">
            <span className="mr-1">From</span> <Input />
          </div>
        </div>
      </div>
      <Divider />
      <div>
        <h5>Documents</h5>
        <p>You can either select from the document list of or create a new document</p>
        <p>Select the documents that required for this route</p>
        <DocumentList
          onEdit={(e) => {
            e.preventDefault();
            setMutationTitle("Edit Document");
            setShowDocumentMutationModal(true);
          }}
          onCreate={(e) => {
            e.preventDefault();
            setMutationTitle("Create Document");
            setShowDocumentMutationModal(true);
          }}
        />
      </div>
      <Divider />
      <div>
        <h5>Document Rules</h5>
        <EditableTable />
      </div>
      <Modal
        onCancel={() => setShowDocumentMutationModal(false)}
        title={mutationTitle}
        visible={showDocumentMutationModal}
      >
        <DocumentMutationForm />
      </Modal>
    </DTCSection>
  );
};

const plainOptions = ["Commercial Invoice", "Certificate of Origin", "Packing List"];
const defaultCheckedList = ["Commercial Invoice"];

class DocumentList extends React.Component {
  state = {
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false
  };

  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length
    });
  };

  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  };

  render() {
    return (
      <div
        style={{
          width: "400px"
        }}
      >
        <div
          style={{
            width: "400px",
            border: "solid 1px #f1f1f1",
            borderRadius: "5px",
            padding: "20px"
          }}
        >
          <div>
            <Checkbox
              indeterminate={this.state.indeterminate}
              onChange={this.onCheckAllChange}
              checked={this.state.checkAll}
            >
              <b>Select all</b>
            </Checkbox>
          </div>
          <hr />
          <CheckboxGroup onChange={this.onChange} value={this.state.checkedList}>
            <Row>
              {plainOptions.map((opt, idx) => (
                <Col span={24} key={idx}>
                  <Checkbox value={opt} className="w-100 align-items-center">
                    <span>{opt}</span>
                    <span title="Edit" className="float-right" onClick={this.props.onEdit}>
                      <i className="fe fe-edit" />
                    </span>
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </CheckboxGroup>
        </div>
        <div className="d-flex justify-content-end">
          <Button type="link" onClick={this.props.onCreate}>
            Create Document
          </Button>
        </div>
      </div>
    );
  }
}

export default AddRoutePage;
