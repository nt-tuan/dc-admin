import { RouteConst } from "commons/consts";
import React, { Fragment, memo, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import qs from "qs";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { DocumentList } from "../route/document-list/document-list.comp";
import { SelectProductForm } from "components/molecules";
import { Checkbox, Button } from "antd";
import { TradeRulesTable } from "../trade-rules-table/trade-rules-table.comp";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { RouteService, ProductRuleService } from "services";
import { usePaginatedApiService } from "hooks/useApiService";
import { LoadMoreButton } from "components/atoms";
import { TRADE_RULES_SCHEMA } from "commons/schemas";

const { FIELDS } = TRADE_RULES_SCHEMA;
export const TradeRules = memo(({ initialValues }) => {
  const [selectedDoc, setSelectedDoc] = useState([]);
  const [isSkip, setIsSkip] = useState(false);
  const [documentSelectedDefault, setDocumentSelectedDefault] = useState([]);
  const [docRules, setDocRules] = useState({});
  const location = useLocation();
  const { id } = qs.parse(location.search, { ignoreQueryPrefix: true });
  const selectProductFormRef = useRef();
  const tradeRuleTableRef = useRef();
  let history = useHistory();
  const [
    { data: documents, isLoadMore, page, totalPages },
    { onLoadMore }
  ] = usePaginatedApiService(RouteService.getDocuments, {
    itemPerPage: 5
  });

  const handleDocumentChange = useCallback(
    (checkedList) => {
      if (documents) {
        const documentRules = documents.filter((doc) => checkedList.includes(doc.id));
        setSelectedDoc(documentRules);
      }
    },
    [documents]
  );

  const checkDuplicateRouteDocumentTypeId = (productRuleResponseList) => {
    let listTradeTypeAll = productRuleResponseList.reduce((a, e) => {
      a[e.routeDocumentTypeId] = ++a[e.routeDocumentTypeId] || 0;
      return a;
    }, {});
    listTradeTypeAll = productRuleResponseList
      .filter((e) => listTradeTypeAll[e.routeDocumentTypeId])
      .map((item) => item.routeDocumentTypeId);
    return listTradeTypeAll;
  };
  const setInitValue = useCallback(() => {
    if (initialValues && initialValues.productRuleResponseList) {
      if (initialValues.productRuleResponseList.length > 0) {
        const selectedDocs = initialValues.productRuleResponseList.map(
          (item) => item.routeDocumentTypeId
        );
        let rulesObject = {};
        let listTradeTypeAll = checkDuplicateRouteDocumentTypeId(
          initialValues.productRuleResponseList
        );

        initialValues.productRuleResponseList.forEach((item) => {
          let tradeType = {};
          if (listTradeTypeAll.includes(item.routeDocumentTypeId)) {
            tradeType[RULE_TYPE.IS_BUYER] = true;
            tradeType[RULE_TYPE.IS_SELLER] = true;
          } else {
            tradeType[item.traderType] = true;
            if (item.traderType === RULE_TYPE.IS_BUYER) {
              tradeType[RULE_TYPE.IS_SELLER] = false;
            }
            if (item.traderType === RULE_TYPE.IS_SELLER) {
              tradeType[RULE_TYPE.IS_BUYER] = false;
            }
          }
          rulesObject[item[FIELDS.routeDocumentTypeId]] = {
            key: item[FIELDS.routeDocumentTypeId],
            docName: item.routeDocumentTypeName,
            ...tradeType
          };
        });

        setDocRules(rulesObject);
        setDocumentSelectedDefault(selectedDocs);
      } else {
        setIsSkip(true);
      }
    }
  }, [initialValues]);

  useEffect(() => {
    setInitValue();
  }, [setInitValue]);

  const handleSubmit = useCallback((isSkip) => {
    asyncErrorHandlerWrapper(async () => {
      try {
        await selectProductFormRef.current.validateFields();
        const valueOfTradeRule = tradeRuleTableRef.current
          ? tradeRuleTableRef.current.getTradeRuleData()
          : [];
        const mapDataOfTradeRule = setValueTradeType(valueOfTradeRule);

        const submitData = {
          productId: selectProductFormRef.current.getFieldValue(FIELDS.productName),
          productRuleRequestList: isSkip ? [] : mapDataOfTradeRule
        };
        if (submitData && submitData.productRuleRequestList && submitData.productId) {
          asyncErrorHandlerWrapper(async () => {
            await ProductRuleService.createProductTradeRules(
              id ? id : submitData.productId,
              submitData.productRuleRequestList
            );
          });
        }
        history.push(RouteConst.TRADE_RULES);
      } catch (error) {}
    });
  }, []);

  const setValueTradeType = (documentIds) => {
    let result = [];
    Object.keys(documentIds).forEach((id) => {
      if (documentIds[id][RULE_TYPE.IS_BUYER] && documentIds[id][RULE_TYPE.IS_SELLER]) {
        result.push({
          routeDocumentTypeId: id,
          traderType: RULE_TYPE.IS_SELLER
        });
        result.push({
          routeDocumentTypeId: id,
          traderType: RULE_TYPE.IS_BUYER
        });
      } else {
        result.push({
          routeDocumentTypeId: id,
          traderType: documentIds[id][RULE_TYPE.IS_BUYER] ? RULE_TYPE.IS_BUYER : RULE_TYPE.IS_SELLER
        });
      }
    });
    return result;
  };

  return (
    <Fragment>
      <SelectProductForm initialValues={initialValues} disabled={!!id} ref={selectProductFormRef} />
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
            defaultValue={documentSelectedDefault}
            onChange={handleDocumentChange}
            loadMoreButton={
              <LoadMoreButton
                isLoading={isLoadMore}
                isHide={page >= totalPages - 1}
                onLoadMoreClick={onLoadMore}
              />
            }
          />
          <TradeRulesTable
            selectedDoc={selectedDoc}
            initialValues={docRules}
            ref={(ins) => (tradeRuleTableRef.current = ins)}
          />
        </>
      )}
      <div className="text-center">
        <Link to={RouteConst.TRADE_RULES}>
          <Button className="mr-2">Cancel</Button>
        </Link>
        <Button type="primary" onClick={() => handleSubmit(isSkip)}>
          Save
        </Button>
      </div>
    </Fragment>
  );
});

const RULE_TYPE = {
  IS_BUYER: "BUYER",
  IS_SELLER: "SELLER"
};
