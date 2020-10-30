import { RouteConst } from "commons/consts";
import React, { Fragment, memo, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import qs from "qs";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { DocumentList } from "../route/document-list/document-list.comp";
import { SelectProductForm } from "components/molecules";
import { Checkbox, Button } from "antd";
import { TradeRulesTable } from "../trade-rules-table/trade-rules-table.comp";

const docs = [
  { id: "423423432", name: "Doc1" },
  { id: "42342323432", name: "Doc2" },
  { id: "4234222232", name: "Doc3" }
];

export const TradeRules = memo(({ initialValues = {} }) => {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState([]);
  const [isSkip, setIsSkip] = useState(false);
  const location = useLocation();
  const { id } = qs.parse(location.search, { ignoreQueryPrefix: true });
  const selectProductFormRef = useRef();
  const tradeRuleTableRef = useRef();

  useEffect(() => setDocuments(docs), []);

  const handleDocumentChange = useCallback((checkedList) => {
    setSelectedDoc(checkedList);
  }, []);

  const handleSubmit = useCallback(() => {
    selectProductFormRef.current.validateFields();
    const value = tradeRuleTableRef.current.getTradeRuleData();
    console.log(value);
  }, []);

  return (
    <Fragment>
      <SelectProductForm initialValues={{}} disabled={!!id} ref={selectProductFormRef} />
      <div className="d-flex my-3">
        <Checkbox className="mr-2" checked={isSkip} onChange={(e) => setIsSkip(e.target.checked)} />
        This product doesn't require any document
      </div>
      {!isSkip && (
        <>
          <h5 className="text-primary font-weight-bold my-2">Documents</h5>
          <p>
            You can either select from the list of documents or{" "}
            <Link
              to={{
                pathname: RouteConst.DOCUMENT,
                search: "?showCreateDocument=true",
                state: { previousPage: RouteConst.CREATE_TRADE_RULES }
              }}
              className="text-primary"
            >
              create a new document
            </Link>
          </p>
          <p className="mt-2">Select the documents that have to be uploaded by the users</p>
          <DocumentList
            title="Customized Documents"
            documents={documents}
            onChange={handleDocumentChange}
          />
          <TradeRulesTable {...{ selectedDoc }} ref={(ins) => (tradeRuleTableRef.current = ins)} />
        </>
      )}
      <div className="text-center">
        <Button className="mr-2">Cancel</Button>
        <Button type="primary" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </Fragment>
  );
});
