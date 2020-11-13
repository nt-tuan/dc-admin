import { Button, Divider, message } from "antd";
import { DTCSection } from "components/atoms";
import { DocumentList, DocumentRuleTable, RouteLocationForm } from "components/organisms";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { RouteService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { RouteConst, ACTORS, ACTORS_REVERSE } from "commons/consts";
import { Link } from "react-router-dom";

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
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [defaultDocs, setDefaultDocs] = useState([]);
  const locationFormRef = useRef();
  const documentRuleFormsRef = useRef(new Map());
  const history = useHistory();

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const docs = await getAllRecordsFromAPI(RouteService.getDocuments);
      setDocuments(docs);
    });
  }, []);

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const defaultDocs = await RouteService.getDefaultDocuments();
      setSelectedDocs([
        ...defaultDocs.map((d) => ({
          id: d.id,
          document: d.name,
          provider: ACTORS_REVERSE[d.routeDocumentRuleDto.provider],
          viewer1: ACTORS_REVERSE[d.routeDocumentRuleDto.viewer1],
          viewer2: ACTORS_REVERSE[d.routeDocumentRuleDto.viewer2],
          viewer3: ACTORS_REVERSE[d.routeDocumentRuleDto.viewer3]
        }))
      ]);
      setDefaultDocs(defaultDocs);
    });
  }, []);

  const handleCreate = () => {
    asyncErrorHandlerWrapper(async () => {
      const valid = await isFormValid(async () => {
        const docFormRefs = Array.from(documentRuleFormsRef.current.values());
        await Promise.all([
          locationFormRef.current.validateFields(),
          ...docFormRefs.map((form) => form.validateFields())
        ]);
      });
      if (valid) {
        const { category, type } = locationFormRef.current.getFieldsValue();
        let composedValues = {
          categoryId: category,
          isDefault: true,
          typeId: type,
          routeDocumentTypeRequests: []
        };
        documentRuleFormsRef.current.forEach((formRef, docId) => {
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
          message.success("Created Successfully");
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

  const handleDocListChange = useCallback(
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
      setSelectedDocs(docs);
    },
    [documents, defaultDocs]
  );

  const renderTitle = (isDefault) => {
    return isDefault ? "Default Route Information" : "Route Information";
  };

  return (
    <DTCSection>
      <div>
        <h3 className="mb-3">{renderTitle(true)}</h3>
        <RouteLocationForm ref={locationFormRef} hiddenFields={["from", "to"]} />
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
              state: { previousPage: RouteConst.ADD_DEFAULT_ROUTE }
            }}
            className="text-primary"
          >
            create a new document
          </Link>
        </p>
        <p>Select the documents required for this route</p>

        <DocumentList
          title="Documents"
          defaultDocs={defaultDocs}
          documents={documents}
          onChange={handleDocListChange}
        />
      </div>
      <Divider />
      <div>
        <h5>Document Rules</h5>
        <DocumentRuleTable ref={documentRuleFormsRef} data={selectedDocs} />
      </div>
      <Divider />
      <div className="d-flex justify-content-center">
        <Button className="mr-2" type="primary" onClick={handleCreate}>
          Save
        </Button>
        <Link to={RouteConst.ROUTE}>
          <Button>Cancel</Button>
        </Link>
      </div>
    </DTCSection>
  );
};

export default AddRoutePage;
