import { Col, Divider, Row, Button, message } from "antd";
import { ACTORS_REVERSE, ACTORS, RouteConst } from "commons/consts";
import { DTCSection, LoadingIndicator } from "components/atoms";
import { DocumentList, DocumentRuleTable, RouteLocationForm } from "components/organisms";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RouteService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import { useHistory } from "react-router-dom";
import qs from "qs";
import { APIError } from "commons/types";
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

  const handleEdit = () => {
    asyncErrorHandlerWrapper(async () => {
      const valid = await isFormValid(async () => {
        const docFormRefs = Array.from(documentRuleForms.current.values());
        await Promise.all([
          locationFormRef.current.validateFields(),
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
          routeDocumentTypeRequests: []
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

        try {
          await RouteService.edit(routeDetails.id, composedValues);
          message.success("Edit Successfully");
          history.push(RouteConst.ROUTE);
        } catch (error) {
          if (error instanceof APIError) {
            const err = error.errors;
            message.warning(err[0][1]);
          } else {
            throw error;
          }
          throw error;
        }
      }
    });
  };

  const renderTitle = (isDefault) => {
    return isDefault ? "Default Route Information" : "Route Information";
  };

  const handleDocListTouch = useMemo((ids) => {
    if (ids) {
      const entries = ids.map((id) => [id, true]);
      const idsObj = Object.fromEntries(entries);
      isDocListTouched.current = { ...isDocListTouched, ...idsObj };
    }
  }, []);

  return (
    <DTCSection>
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
          />
        </div>
        <div className="text-center" hidden={isLoadingLocation === false}>
          <LoadingIndicator />
        </div>
      </div>

      <Divider />
      <div>
        <h5>Documents</h5>
        <p>You can either select from the document list of or create a new document</p>
        <p>Select the documents that required for this route</p>
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
        <h5>Document Rules</h5>
        <DocumentRuleTable ref={documentRuleForms} data={docTableData} />
      </div>
      <Divider />
      <div className="d-flex justify-content-center">
        <Button className="mr-2" type="primary" onClick={handleEdit}>
          Save
        </Button>
        <Button>Cancel</Button>
      </div>
    </DTCSection>
  );
};

export default EditRoutePage;
