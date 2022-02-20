import { Checkbox, Typography } from "antd";
import React, { useEffect, useState } from "react";

import uniq from "lodash/uniq";
import { useMessage } from "hooks/use-message";
import { FormControlLabel, FormGroup } from "@mui/material";

const defaultValueProp = [];
const defaultDocsProp = [];
const defaultDocuments = [];

export const DocumentList = ({
  loadMoreButton,
  onChange,
  onTouch,
  documents = defaultDocuments,
  disableCheckAll = false,
  title,
  defaultDocs = defaultDocsProp,
  defaultValue = defaultValueProp
}) => {
  const message = useMessage();
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    if (documents.length) {
      const defaultDocIds = documents
        .filter((d) => defaultDocs.some((dd) => dd.id === d.id))
        .map((d) => d.id);
      const list = uniq([...defaultDocIds, ...defaultValue, ...checkedList]);
      setCheckedList(list);
      setIndeterminate(list.length < documents.length && list.length > 0);
      setCheckAll(list.length === documents.length);
      onChange && onChange(list);
    }
    // NOTE: DO NOT need to add dependency: 'checkedList'
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
    setIndeterminate(!isChecked);
    setCheckAll(isChecked);
    onTouch && onTouch(isChecked ? documents.map((d) => d.id) : []);
    onChange && onChange(isChecked ? documents.map((d) => d.id) : defaultDocIs);
  };

  const handleCheckboxClick = (e, id) => {
    const isChecked = e.target.checked;

    if (!isChecked) {
      message.error("Deleted successfully");
    }
    onTouch && onTouch([id]);
    const checkedListAfter = isChecked ? [...checkedList, id] : checkedList.filter((c) => c !== id);
    handleChange(checkedListAfter);
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
            <Typography strong>{title}</Typography>
          </div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={handleCheckAllChange}
                  checked={checkAll}
                  disabled={documents.length === 0 || disableCheckAll}
                />
              }
              label="Select all"
            />
          </FormGroup>
        </div>
        <hr />
        <FormGroup>
          {documents.map((opt) => (
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => handleCheckboxClick(e, opt.id)}
                  value={opt.id}
                  disabled={defaultDocs.some((d) => d.id === opt.id)}
                  defaultChecked={defaultDocs.some((d) => d.id === opt.id)}
                  checked={checkedList.includes(opt.id)}
                />
              }
              label={opt.name}
            />
          ))}
        </FormGroup>
        {/*<CheckboxGroup onChange={handleChange} value={checkedList} defaultValue={checkedList}>*/}
        {/*  <Row>*/}
        {/*    {documents.map((opt) => (*/}
        {/*      <Col span={24} key={opt.id}>*/}
        {/*        <Checkbox*/}
        {/*          onChange={(e) => handleCheckboxClick(e, opt.id)}*/}
        {/*          value={opt.id}*/}
        {/*          className="w-100 align-items-center"*/}
        {/*          disabled={defaultDocs.some((d) => d.id === opt.id)}*/}
        {/*        >*/}
        {/*          <span>{opt.name}</span>*/}
        {/*        </Checkbox>*/}
        {/*      </Col>*/}
        {/*    ))}*/}
        {/*  </Row>*/}
        {/*</CheckboxGroup>*/}
        {loadMoreButton}
      </div>
    </div>
  );
};
