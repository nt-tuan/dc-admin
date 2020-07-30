import { Checkbox, Col, Divider, Input, Row } from "antd";
import { DTCSection } from "components/atoms";
import { EditableTable } from "components/organisms";
import React from "react";
const CheckboxGroup = Checkbox.Group;

const AddRoutePage = () => {
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
        <DocumentList />
      </div>
      <Divider />
      <div>
        <h5>Document Rules</h5>
        <EditableTable />
      </div>
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
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </CheckboxGroup>
        </div>
      </div>
    );
  }
}

export default AddRoutePage;
