import { Col, Divider, Row, Button, message } from "antd";
import { ACTORS_REVERSE, ACTORS, RouteConst } from "commons/consts";
import { DTCSection } from "components/atoms";
import { DocumentList, DocumentRuleTable, RouteLocationForm } from "components/organisms";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RouteService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import { useHistory } from "react-router-dom";

const isFormValid = async (validateFn) => {
  try {
    await validateFn();
    return true;
  } catch (error) {
    return false;
  }
};

const AddRoutePage = () => {
  const [documents, setDocuments] = useState([]);
  const [defaultRoute, setDefaultRoute] = useState();
  const [defaultDocs, setDefaultDocs] = useState([]);
  const [selectedDefaultDocs, setSelectedDefaultDocs] = useState([]);
  const [selectedCustomizedDocs, setSelectedCustomizedtDocs] = useState([]);
  const locationFormRef = useRef();
  const documentRuleForms = useRef(new Map());
  const history = useHistory();

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

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const docs = await getAllRecordsFromAPI(RouteService.getDocuments);
      setDocuments(docs);
    });
  }, []);

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const defaultDocs = await RouteService.getDefaultDocuments();
      if (selectedDefaultDocs.length === 0) {
        setSelectedCustomizedtDocs([
          ...defaultDocs.map((d) => ({
            id: d.id,
            document: d.name,
            provider: ACTORS_REVERSE[d.routeDocumentRuleDto.provider],
            viewer1: ACTORS_REVERSE[d.routeDocumentRuleDto.viewer1],
            viewer2: ACTORS_REVERSE[d.routeDocumentRuleDto.viewer2],
            viewer3: ACTORS_REVERSE[d.routeDocumentRuleDto.viewer3]
          }))
        ]);
      }
      setDefaultDocs(defaultDocs);
    });
  }, [selectedDefaultDocs]);

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
      setSelectedCustomizedtDocs(docs);
    },
    [documents, defaultDocs]
  );

  const handleCreate = () => {
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
          composedValues.routeDocumentTypeRequests.push({
            id: docId,
            routeDocumentRuleDto: {
              provider: ACTORS[values.provider],
              viewer1: ACTORS[values.viewer1],
              viewer2: ACTORS[values.viewer2],
              viewer3: ACTORS[values.viewer3]
            }
          });
        });
        try {
          await RouteService.create(composedValues);
          message.success("Create Successfully");
          history.push(RouteConst.ROUTE);
        } catch (error) {
          if (error.message === "400") {
            message.warning(error.errMsg);
            return;
          }
          throw error;
        }
      }
    });
  };

  const renderTitle = (isDefault) => {
    return isDefault ? "Default Route Information" : "Route Information";
  };

  return (
    <DTCSection>
      <div>
        <h3 className="mb-3">{renderTitle(false)}</h3>
        <RouteLocationForm onTypeChange={handleTypeChange} ref={locationFormRef} />
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
              defaultDocs={defaultDocuments}
              documents={defaultDocuments}
              disableCheckall={true}
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
        <h5>Document Rules</h5>
        <DocumentRuleTable
          ref={documentRuleForms}
          data={[...selectedDefaultDocs, ...selectedCustomizedDocs]}
        />
      </div>
      <Divider />
      <div className="d-flex justify-content-center">
        <Button className="mr-2" type="primary" onClick={handleCreate}>
          Save
        </Button>
        <Button>Cancel</Button>
      </div>
    </DTCSection>
  );
};

export default AddRoutePage;
