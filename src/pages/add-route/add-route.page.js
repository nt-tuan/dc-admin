import { ACTORS, ACTORS_REVERSE, RouteConst } from "commons/consts";
import { Button, Col, Divider, Row } from "antd";
import {
  DocumentList,
  DocumentRuleTable,
  RouteLocationForm,
  TradeRouteTaxForm
} from "components/trade-route";
import {
  FIELDS,
  TAX_RULES_TYPE_MAIN_SCHEMA,
  typeTAX
} from "components/trade-route/route/forms/tax-rules/tax.chemas";
import { Link, useHistory } from "react-router-dom";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { APIError } from "commons/types";
import { DTCSection } from "components/commons";
import { Helmet } from "react-helmet";
import { Lagecy } from "components/lagecy/lagecy.comp";
import { RouteService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import numeral from "numeral";
import uniqBy from "lodash/uniqBy";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useMessage } from "hooks/use-message";

const isFormValid = async (validateFn) => {
  try {
    await validateFn();
    return true;
  } catch (error) {
    return false;
  }
};

const usePrefill = () => {
  const location = useLocation();
  const { productType, productCategory, fromCountry, toCountry } = React.useMemo(() => {
    const params = new URLSearchParams(location.search);
    const productType = params.get("productType");
    const productCategory = params.get("productCategory");
    const fromCountry = params.get("from");
    const toCountry = params.get("to");
    return { productType, productCategory, fromCountry, toCountry };
  }, [location]);
  return { productType, productCategory, fromCountry, toCountry };
};

const AddRoutePage = () => {
  const message = useMessage();
  const { productType, productCategory, fromCountry, toCountry } = usePrefill();
  const [documents, setDocuments] = useState([]);
  const [defaultRoute, setDefaultRoute] = useState();
  const [defaultDocs, setDefaultDocs] = useState([]);
  const [selectedDefaultDocs, setSelectedDefaultDocs] = useState([]);
  const [selectedCustomizedDocs, setSelectedCustomizedDocs] = useState([]);
  const isDocListTouched = useRef({});
  const locationFormRef = useRef();
  const documentRuleForms = useRef(new Map());
  const taxRuleForms = useRef();
  const history = useHistory();

  const [isLoadingCreate, setIsloadingCreate] = useState(false);

  const objTax = {
    taxMain: [
      {
        data: [...TAX_RULES_TYPE_MAIN_SCHEMA],
        dataFilter: [FIELDS.name]
      }
    ]
  };
  const dataSourceTax = useRef({ ...objTax });

  const filteredCustomizedDocs = useMemo(() => {
    if (defaultRoute === undefined) {
      return documents;
    }
    const defaultRouteDocs = defaultRoute.routeDocumentTypeResponses;
    return documents
      .filter((doc) => defaultRouteDocs.some((dd) => dd.id === doc.id) === false)
      .map((doc) => ({
        id: doc.id,
        name: doc.name
      }));
  }, [defaultRoute, documents]);

  const defaultDocuments = useMemo(() => {
    if (defaultRoute === undefined) {
      return [];
    }
    return defaultRoute.routeDocumentTypeResponses.map((doc) => ({
      id: doc.id,
      name: doc.name
    }));
  }, [defaultRoute]);

  const defaultDocumentIds = useMemo(() => {
    if (defaultRoute === undefined) {
      return [];
    }
    return defaultRoute.routeDocumentTypeResponses.map((doc) => doc.id);
  }, [defaultRoute]);

  const docTableData = useMemo(() => {
    return uniqBy([...selectedDefaultDocs, ...selectedCustomizedDocs], "id");
  }, [selectedDefaultDocs, selectedCustomizedDocs]);

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const docs = await getAllRecordsFromAPI(RouteService.getDocuments);
      setDocuments(docs);
      const entries = docs.map((d) => [d.id, false]);
      isDocListTouched.current = Object.fromEntries(entries);
    });
  }, []);

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const defaultDocs = await RouteService.getDefaultDocuments();
      setDefaultDocs(defaultDocs);
    });
  }, []);

  const handleTypeChange = useCallback(
    ({ categoryId, typeId }) => {
      asyncErrorHandlerWrapper(async () => {
        const _defaultRoute = await RouteService.getDefault({ categoryId, typeId });
        if (_defaultRoute) {
          setDefaultRoute(_defaultRoute);
          setSelectedDefaultDocs(
            _defaultRoute.routeDocumentTypeResponses.map((doc) => ({
              id: doc.id,
              document: doc.name,
              provider: ACTORS_REVERSE[doc.routeDocumentRuleDto.provider],
              viewer1: ACTORS_REVERSE[doc.routeDocumentRuleDto.viewer1],
              viewer2: ACTORS_REVERSE[doc.routeDocumentRuleDto.viewer2],
              viewer3: ACTORS_REVERSE[doc.routeDocumentRuleDto.viewer3],
              disabled: defaultDocs.map((dd) => dd.id).includes(doc.id)
            }))
          );
        } else {
          setDefaultRoute(undefined);
          setSelectedDefaultDocs([]);
        }
      });
    },
    [defaultDocs]
  );

  const handleDefaultDocListChange = useCallback(
    (checkedList) => {
      const docs = documents
        .filter((doc) => checkedList.includes(doc.id))
        .map((doc) => {
          const targetDefaultDoc = defaultDocs.find((dd) => dd.id === doc.id);
          if (targetDefaultDoc) {
            return {
              document: doc.name,
              id: doc.id,
              provider: ACTORS_REVERSE[targetDefaultDoc.routeDocumentRuleDto.provider],
              viewer1: ACTORS_REVERSE[targetDefaultDoc.routeDocumentRuleDto.viewer1],
              viewer2: ACTORS_REVERSE[targetDefaultDoc.routeDocumentRuleDto.viewer2],
              viewer3: ACTORS_REVERSE[targetDefaultDoc.routeDocumentRuleDto.viewer3],
              disabled: true
            };
          }
          const targetDocFromDefaultRoute = defaultRoute.routeDocumentTypeResponses.find(
            (dfd) => dfd.id === doc.id
          );
          if (
            targetDocFromDefaultRoute &&
            isDocListTouched.current[targetDocFromDefaultRoute.id] === false
          ) {
            return {
              document: doc.name,
              id: doc.id,
              provider: ACTORS_REVERSE[targetDocFromDefaultRoute.routeDocumentRuleDto.provider],
              viewer1: ACTORS_REVERSE[targetDocFromDefaultRoute.routeDocumentRuleDto.viewer1],
              viewer2: ACTORS_REVERSE[targetDocFromDefaultRoute.routeDocumentRuleDto.viewer2],
              viewer3: ACTORS_REVERSE[targetDocFromDefaultRoute.routeDocumentRuleDto.viewer3],
              disabled: false
            };
          } else {
            return {
              document: doc.name,
              id: doc.id,
              disabled: false
            };
          }
        });

      setSelectedDefaultDocs(docs);
    },
    [documents, defaultDocs, defaultRoute]
  );

  const handleDocListTouch = useCallback((ids) => {
    const entries = ids.map((id) => [id, true]);
    const idsObj = Object.fromEntries(entries);
    isDocListTouched.current = { ...isDocListTouched, ...idsObj };
  }, []);

  const handleCustomizedDocListChange = useCallback(
    (checkedList) => {
      const docs = documents
        .filter((doc) => checkedList.includes(doc.id))
        .map((doc) => {
          const targetDefaultDoc = defaultDocs.find((dd) => dd.id === doc.id);
          if (targetDefaultDoc) {
            return {
              document: doc.name,
              id: doc.id,
              provider: ACTORS_REVERSE[targetDefaultDoc.routeDocumentRuleDto.provider],
              viewer1: ACTORS_REVERSE[targetDefaultDoc.routeDocumentRuleDto.viewer1],
              viewer2: ACTORS_REVERSE[targetDefaultDoc.routeDocumentRuleDto.viewer2],
              viewer3: ACTORS_REVERSE[targetDefaultDoc.routeDocumentRuleDto.viewer3],
              disabled: true
            };
          }
          return {
            document: doc.name,
            id: doc.id,
            disabled: false
          };
        });
      setSelectedCustomizedDocs(docs);
    },
    [documents, defaultDocs]
  );

  const handleCreate = () => {
    setIsloadingCreate(true);
    asyncErrorHandlerWrapper(async () => {
      const valid = await isFormValid(async () => {
        const docFormRefs = Array.from(documentRuleForms.current.values());
        await Promise.all([
          locationFormRef.current.validateFields(),
          taxRuleForms.current.validateFields(),
          ...docFormRefs.map((form) => form.validateFields())
        ]);
      });
      if (valid) {
        const { category, type, from, to } = locationFormRef.current.getFieldsValue();
        let composedValues = {
          fromCountry: from,
          toCountry: to,
          categoryId: category,
          isDefault: false,
          typeId: type,
          routeDocumentTypeRequests: [],
          routeTaxPostRequestList: []
        };
        documentRuleForms.current.forEach((formRef, docId) => {
          const values = formRef.getFieldsValue();
          if (Object.keys(values).length > 0) {
            composedValues.routeDocumentTypeRequests.push({
              id: docId,
              routeDocumentRuleDto: {
                provider: ACTORS[values.provider],
                viewer1: ACTORS[values.viewer1],
                viewer2: ACTORS[values.viewer2],
                viewer3: ACTORS[values.viewer3]
              }
            });
          }
        });

        const valueTax = taxRuleForms.current.getFieldsValue();

        const data = [];
        const dataMain = [];
        let nameObj;
        let valueObj;
        Object.keys(valueTax).map((item) => {
          const nameParse = item.split("-");
          if (!nameParse && !nameParse.length) return false;
          const applyTypeField = nameParse[0];
          const nameField = nameParse[1];
          const index = nameParse[2];
          nameObj = nameField;
          valueObj = valueTax[item];
          if (nameObj === FIELDS.lumpSum || nameObj === FIELDS.percent) {
            valueObj = numeral(valueObj).value();
          }
          if (nameField === FIELDS.lumpSum && valueObj === 0) {
            nameObj = FIELDS.percent;
          }
          if (nameField === FIELDS.percent && valueObj === 0) {
            nameObj = FIELDS.lumpSum;
          }
          if (valueTax[item] && applyTypeField === "taxMain") {
            dataMain[index] = {
              ...dataMain[index],
              [nameField]: valueObj
            };
          }

          if (valueTax[item] && applyTypeField === "taxOther") {
            if (nameField === FIELDS.applyTypeOther) {
              nameObj = FIELDS.applyType;
            }
            if (nameField === FIELDS.isLumSum && valueTax[item] === 0) {
              nameObj = FIELDS.lumpSum;
            } else if (nameField === FIELDS.isLumSum && valueTax[item] === 1) {
              nameObj = FIELDS.percent;
            }

            data[index] = {
              ...data[index],
              [FIELDS.applyType]: typeTAX.OTHERS,
              [nameObj]: valueObj
            };
          }
        });
        composedValues.routeTaxPostRequestList = [...dataMain, ...data];

        try {
          await RouteService.create(composedValues);
          message.success("Created Successfully");
          history.push(RouteConst.TRADE_ROUTES);
        } catch (error) {
          setIsloadingCreate(false);
          if (error instanceof APIError) {
            const err = error.errors;
            message.warning(err[0][1]);
          } else if (error.message == 400) {
            message.warning(error.errMsg);
          } else {
            throw error;
          }
        }
      } else {
        setIsloadingCreate(false);
      }
    });
  };

  const renderTitle = (isDefault) => {
    return isDefault ? "Default Trade Routes Information" : "Trade Routes Information";
  };

  return (
    <DTCSection>
      <DTCSection.Content>
        <Lagecy>
          <Helmet title="Trade Routes Creation" />
          <div>
            <h3 className="mb-3">{renderTitle(false)}</h3>
            <RouteLocationForm
              defaultFromCountry={fromCountry}
              defaultToCountry={toCountry}
              defaultTypeId={productType}
              defaultCategoryId={productCategory}
              onTypeChange={handleTypeChange}
              ref={locationFormRef}
            />
            <TradeRouteTaxForm dataSource={dataSourceTax.current} ref={taxRuleForms} />
          </div>
          <Divider />
          <div>
            <h5>Documents</h5>
            <p>
              You can either select from the document list or{" "}
              <Link
                style={{ cursor: "pointer" }}
                to={{
                  pathname: RouteConst.DOCUMENT,
                  search: "?showCreateDocument=true",
                  state: { previousPage: RouteConst.ADD_ROUTE }
                }}
                className="text-primary"
              >
                create a new document
              </Link>
            </p>
            <p>Select the documents required for this route</p>
            <Row gutter={[30, 0]}>
              <Col>
                <DocumentList
                  title="Default Documents"
                  defaultDocs={defaultDocs}
                  defaultValue={defaultDocumentIds}
                  documents={defaultDocuments}
                  onChange={handleDefaultDocListChange}
                  onTouch={handleDocListTouch}
                />
              </Col>
              <Col>
                <DocumentList
                  title="Customized Documents"
                  defaultDocs={defaultDocs}
                  documents={filteredCustomizedDocs}
                  onChange={handleCustomizedDocListChange}
                />
              </Col>
            </Row>
          </div>
          <Divider />
          <div>
            <h5>Document trade routes</h5>
            <DocumentRuleTable ref={documentRuleForms} data={docTableData} />
          </div>
          <Divider />
          <div className="d-flex justify-content-center">
            <Button
              loading={isLoadingCreate}
              className="mr-2"
              type="primary"
              onClick={handleCreate}
            >
              Create Trade Routes
            </Button>
            <Link to={RouteConst.TRADE_RULES}>
              <Button>Cancel</Button>
            </Link>
          </div>
        </Lagecy>
      </DTCSection.Content>
    </DTCSection>
  );
};

export default AddRoutePage;
