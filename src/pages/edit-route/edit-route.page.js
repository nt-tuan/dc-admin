import { ACTORS, ACTORS_REVERSE, RouteConst } from "commons/consts";
import { Button, Col, Divider, Row, message } from "antd";
import { DTCSection, LoadingIndicator } from "components/commons";
import {
  DocumentList,
  DocumentRuleTable,
  RouteLocationForm,
  TradeRouteTaxForm
} from "components/trade-route";
import {
  FIELDS,
  ID_FIELDS,
  TAX_RULES_MAIN_SCHEMA,
  TAX_RULES_TYPE_MAIN_SCHEMA,
  typeTAX
} from "components/trade-route/route/forms/tax-rules/tax.chemas";
import { Link, useHistory, useLocation } from "react-router-dom";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { APIError } from "commons/types";
import { Helmet } from "react-helmet";
import { Lagecy } from "components/lagecy/lagecy.comp";
import { RouteService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import numeral from "numeral";
import qs from "qs";
import uniqBy from "lodash/uniqBy";

const isFormValid = async (validateFn) => {
  try {
    await validateFn();
    return true;
  } catch (error) {
    return false;
  }
};

const EditRoutePage = () => {
  const [routeDetails, setRouteDetails] = useState();
  const [documents, setDocuments] = useState([]);
  const [defaultRoute, setDefaultRoute] = useState();
  const [defaultDocs, setDefaultDocs] = useState([]);
  const [selectedDefaultDocs, setSelectedDefaultDocs] = useState([]);
  const [selectedCustomizedDocs, setSelectedCustomizedDocs] = useState([]);
  const [isLocationFormTouched, setIsLocationFormTouched] = useState(false);
  const locationFormRef = useRef();
  const documentRuleForms = useRef(new Map());
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const isDocListTouched = useRef({});
  const history = useHistory();
  const location = useLocation();
  const [isLoadingButtonEdit, setIsLoadingButtonEdit] = useState(false);

  const taxRuleForms = useRef();
  // const dataSourceTax = useRef({});
  const [dataSourceTax, setDataSourceTax] = useState({});

  const { id: routeId } = qs.parse(location.search, { ignoreQueryPrefix: true });

  const categoryIdFromDetails = useMemo(() => {
    if (routeDetails === undefined || isLocationFormTouched) {
      return undefined;
    }
    return routeDetails.categoryId;
  }, [routeDetails, isLocationFormTouched]);

  const defaultDocumentIds = useMemo(() => {
    if (defaultRoute === undefined || routeDetails === undefined) {
      return [];
    }
    return defaultRoute.routeDocumentTypeResponses
      .filter(
        (doc) =>
          defaultDocs.map((d) => d.id).includes(doc.id) ||
          routeDetails.routeDocumentTypeResponses.map((d) => d.id).includes(doc.id)
      )
      .map((doc) => doc.id);
  }, [defaultRoute, defaultDocs, routeDetails]);

  const typeIdFromDetails = useMemo(() => {
    if (routeDetails === undefined || isLocationFormTouched) {
      return undefined;
    }
    return routeDetails.typeId;
  }, [routeDetails, isLocationFormTouched]);

  const docIdsFromDetails = useMemo(() => {
    if (routeDetails === undefined) {
      return [];
    }
    const defaultRouteDocIds = defaultRoute
      ? defaultRoute.routeDocumentTypeResponses.map((doc) => doc.id)
      : [];
    return routeDetails.routeDocumentTypeResponses
      .filter((doc) => defaultRouteDocIds.includes(doc.id) === false)
      .map((doc) => doc.id);
  }, [routeDetails, defaultRoute]);

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

  const docTableData = useMemo(() => {
    return uniqBy([...selectedDefaultDocs, ...selectedCustomizedDocs], "id");
  }, [selectedDefaultDocs, selectedCustomizedDocs]);

  /** Handle Parse data tax edit */
  const parseDataTax = (data) => {
    const obj = {
      taxMain: [],
      taxOther: []
    };
    let arrayFieldMain = [...TAX_RULES_MAIN_SCHEMA];
    let flagMain = 0;
    data.map((item) => {
      if (item.applyType === typeTAX.MAIN) {
        flagMain++;
        if (flagMain === 1) {
          arrayFieldMain = [...TAX_RULES_TYPE_MAIN_SCHEMA, ...TAX_RULES_MAIN_SCHEMA, ...ID_FIELDS];
        } else {
          arrayFieldMain = [...TAX_RULES_MAIN_SCHEMA, ...ID_FIELDS];
        }
        let objField = { data: [], dataFilter: [], id: item.id };
        objField.data = arrayFieldMain.map((field) => {
          let initValue = item[field.name];
          if (field.name === FIELDS.type && item[field.name] !== "OTHER") {
            objField.dataFilter = [FIELDS.name];
          }
          if (field.name === "id") {
            initValue = item.id;
          }
          return {
            ...field,
            initValue: initValue
          };
        });
        obj.taxMain.push(objField);
      }
    });
    if (flagMain === 0) {
      obj.taxMain.push({
        data: [...TAX_RULES_TYPE_MAIN_SCHEMA],
        dataFilter: [FIELDS.name]
      });
    }
    return obj;
  };

  useEffect(() => {
    setIsLoadingLocation(true);
    asyncErrorHandlerWrapper(async () => {
      const details = await RouteService.get(routeId);
      locationFormRef.current.setFieldsValue({
        from: details.fromCountry,
        to: details.toCountry
      });
      const _defaultRoute = await RouteService.getDefault({
        categoryId: details.categoryId,
        typeId: details.typeId
      });

      if (details?.taxDetailResponseList && details?.taxDetailResponseList?.length) {
        const dataTax = parseDataTax(details?.taxDetailResponseList);
        setDataSourceTax(dataTax);
      } else {
        setDataSourceTax({
          taxMain: [
            {
              data: [...TAX_RULES_TYPE_MAIN_SCHEMA],
              dataFilter: [FIELDS.name]
            }
          ]
        });
      }

      if (_defaultRoute) {
        setDefaultRoute(_defaultRoute);
        setSelectedDefaultDocs(
          _defaultRoute.routeDocumentTypeResponses
            .filter((doc) => defaultDocs.map((d) => d.id).includes(doc.id))
            .map((doc) => ({
              id: doc.id,
              document: doc.name,
              provider: ACTORS_REVERSE[doc.routeDocumentRuleDto.provider],
              viewer1: ACTORS_REVERSE[doc.routeDocumentRuleDto.viewer1],
              viewer2: ACTORS_REVERSE[doc.routeDocumentRuleDto.viewer2],
              viewer3: ACTORS_REVERSE[doc.routeDocumentRuleDto.viewer3],
              disabled: false
            }))
        );
      } else {
        setDefaultRoute(undefined);
        setSelectedDefaultDocs([]);
      }
      setRouteDetails(details);
    });
  }, [routeId, defaultDocs]);

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

  const handleTypeChange = useCallback(({ categoryId, typeId }) => {
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
            disabled: true
          }))
        );
      } else {
        setDefaultRoute(undefined);
        setSelectedDefaultDocs([]);
      }
    });
  }, []);

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
          const targetDocFromDetails = routeDetails.routeDocumentTypeResponses.find(
            (dfd) => dfd.id === doc.id
          );
          if (targetDocFromDetails && isDocListTouched.current[targetDocFromDetails.id] === false) {
            return {
              document: doc.name,
              id: doc.id,
              provider: ACTORS_REVERSE[targetDocFromDetails.routeDocumentRuleDto.provider],
              viewer1: ACTORS_REVERSE[targetDocFromDetails.routeDocumentRuleDto.viewer1],
              viewer2: ACTORS_REVERSE[targetDocFromDetails.routeDocumentRuleDto.viewer2],
              viewer3: ACTORS_REVERSE[targetDocFromDetails.routeDocumentRuleDto.viewer3],
              disabled: false
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
    [documents, defaultDocs, defaultRoute, routeDetails]
  );

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
          const targetDocFromDetails = routeDetails.routeDocumentTypeResponses.find(
            (dfd) => dfd.id === doc.id
          );
          if (targetDocFromDetails && isDocListTouched.current[targetDocFromDetails.id] === false) {
            return {
              document: doc.name,
              id: doc.id,
              provider: ACTORS_REVERSE[targetDocFromDetails.routeDocumentRuleDto.provider],
              viewer1: ACTORS_REVERSE[targetDocFromDetails.routeDocumentRuleDto.viewer1],
              viewer2: ACTORS_REVERSE[targetDocFromDetails.routeDocumentRuleDto.viewer2],
              viewer3: ACTORS_REVERSE[targetDocFromDetails.routeDocumentRuleDto.viewer3],
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
      setSelectedCustomizedDocs(docs);
    },
    [documents, defaultDocs, routeDetails]
  );

  /** Handle Parse data Form Edit */
  const parseDataFormEdit = (valueTax) => {
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
      if (valueTax[item] && applyTypeField === "taxMain") {
        dataMain[index] = {
          ...dataMain[index],
          [nameField]: valueObj
        };
      }

      if (
        valueTax[item] &&
        applyTypeField === "taxOther" &&
        valueTax[item] !== "undefined" &&
        valueTax[item] !== "0.00"
      ) {
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
    return [...dataMain, ...data];
  };

  const handleEdit = () => {
    setIsLoadingButtonEdit(true);
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
          if (Object.keys(values).length) {
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
        const dataParse = parseDataFormEdit(valueTax);
        composedValues.routeTaxPostRequestList = dataParse;

        try {
          await RouteService.edit(routeDetails.id, composedValues);
          message.success("Edit Successfully");
          history.push(RouteConst.TRADE_ROUTES);
        } catch (error) {
          setIsLoadingButtonEdit(false);
          if (error instanceof APIError) {
            const err = error.errors;
            message.warning(err[0][1]);
          } else {
            throw error;
          }
        }
      } else {
        setIsLoadingButtonEdit(false);
      }
    });
  };

  const renderTitle = (isDefault) => {
    return isDefault ? "Default Trade Route Information" : "Trade Routes Information";
  };

  const handleDocListTouch = useMemo((ids) => {
    if (ids) {
      const entries = ids.map((id) => [id, true]);
      const idsObj = Object.fromEntries(entries);
      isDocListTouched.current = { ...isDocListTouched, ...idsObj };
    }
  }, []);

  return (
    <Lagecy>
      <Helmet title="Edit Trade Rules" />
      <DTCSection>
        <DTCSection.Content>
          <div>
            <h3 className="mb-3">{renderTitle(false)}</h3>
            <div hidden={isLoadingLocation}>
              <RouteLocationForm
                onAfterInit={setIsLoadingLocation}
                onTypeChange={handleTypeChange}
                onTouch={setIsLocationFormTouched}
                defaultCategoryId={categoryIdFromDetails}
                defaultTypeId={typeIdFromDetails}
                ref={locationFormRef}
                isEdit={true}
              />
            </div>
            <TradeRouteTaxForm dataSource={dataSourceTax} isEdit={true} ref={taxRuleForms} />
            <div className="text-center" hidden={isLoadingLocation === false}>
              <LoadingIndicator />
            </div>
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
                  state: { previousPage: `${location.pathname}${location.search}` }
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
                  documents={defaultDocuments}
                  defaultValue={defaultDocumentIds}
                  onChange={handleDefaultDocListChange}
                  onTouch={handleDocListTouch}
                />
              </Col>
              <Col>
                <DocumentList
                  title="Customized Documents"
                  defaultValue={docIdsFromDetails}
                  defaultDocs={defaultDocs}
                  documents={filteredCustomizedDocs}
                  onChange={handleCustomizedDocListChange}
                  onTouch={handleDocListTouch}
                />
              </Col>
            </Row>
          </div>
          <Divider />
          <div>
            <h5>Document Trade Rules</h5>
            <DocumentRuleTable ref={documentRuleForms} data={docTableData} />
          </div>
          <Divider />
          <div className="d-flex justify-content-center">
            <Button
              loading={isLoadingButtonEdit}
              className="mr-2"
              type="primary"
              onClick={handleEdit}
            >
              Save
            </Button>
            <Link to={RouteConst.TRADE_ROUTES}>
              <Button>Cancel</Button>
            </Link>
          </div>
        </DTCSection.Content>
      </DTCSection>
    </Lagecy>
  );
};

export default EditRoutePage;
