import React, { useState, useEffect } from "react";
import { Typography, Checkbox, Row, Col } from "antd";
import uniq from "lodash/uniq";

const CheckboxGroup = Checkbox.Group;

const defaultValueProp = [];
const defaultDocsProp = [];
const defaultDocuments = [];

export const DocumentList = ({
  onChange,
  onTouch,
  documents = defaultDocuments,
  disableCheckall = false,
  title,
  defaultDocs = defaultDocsProp,
  defaultValue = defaultValueProp
}) => {
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    if (documents.length) {
      const defaultDocIds = documents
        .filter((d) => defaultDocs.some((dd) => dd.id === d.id))
        .map((d) => d.id);
      const list = uniq([...defaultDocIds, ...defaultValue]);
      console.log(list);
      setCheckedList(list);
      setIndeterminate(list.length < documents.length && list.length > 0);
      setCheckAll(list.length === documents.length);
      onChange && onChange(list);
    }
  }, [documents, defaultDocs, onChange, defaultValue]);

  const handleChange = (checkedList) => {
    setCheckedList(checkedList);
    setIndeterminate(!!checkedList.length && checkedList.length < documents.length);
    setCheckAll(checkedList.length === documents.length);
    onChange && onChange(checkedList);
  };

  const handleCheckAllChange = (e) => {
    const isChecked = e.target.checked;
    const defaultDocIs = documents
      .filter((d) => defaultDocs.some((dd) => dd.id === d.id))
      .map((d) => d.id);
    setCheckedList(isChecked ? documents.map((d) => d.id) : defaultDocIs);
    setIndeterminate(isChecked ? false : true);
    setCheckAll(isChecked);
    onTouch && onTouch(isChecked ? documents.map((d) => d.id) : []);
    onChange && onChange(isChecked ? documents.map((d) => d.id) : defaultDocIs);
  };

  const handleCheckboxClick = (e, id) => {
    onTouch && onTouch([id]);
  };

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
          <div className="mb-2">
            <Typography.Text strong>{title}</Typography.Text>
          </div>
          <Checkbox
            indeterminate={indeterminate}
            onChange={handleCheckAllChange}
            checked={checkAll}
            disabled={documents.length === 0 || disableCheckall}
          >
            <b>Select all</b>
          </Checkbox>
        </div>
        <hr />
        <CheckboxGroup onChange={handleChange} value={checkedList}>
          <Row>
            {documents.map((opt) => (
              <Col span={24} key={opt.id}>
                <Checkbox
                  onChange={(e) => handleCheckboxClick(e, opt.id)}
                  value={opt.id}
                  className="w-100 align-items-center"
                  disabled={defaultDocs.some((d) => d.id === opt.id)}
                >
                  <span>{opt.name}</span>
                </Checkbox>
              </Col>
            ))}
          </Row>
        </CheckboxGroup>
      </div>
    </div>
  );
};
