import React, { useState, useEffect, useRef, useCallback } from "react";
import { Divider } from "antd";
import { DTCSection } from "components/commons";
import { Link } from "react-router-dom";
import { RouteService } from "services";
import { getAllRecordsFromAPI } from "utils/general.util";
import { useAsyncErrorHandler } from "utils/error-handler.util";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { RouteConst, ACTORS, ACTORS_REVERSE } from "commons/consts";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useMessage } from "hooks/use-message";
import { DocumentList, DocumentRuleTable, RouteLocationForm } from "components/trade-route";

const isFormValid = async (validateFn) => {
  try {
    await validateFn();
    return true;
  } catch (error) {
    return false;
  }
};

const AddRoutePage = () => {
  const asyncErrorHandlerWrapper = useAsyncErrorHandler();
  const message = useMessage();
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
          routeDocumentTypeRequests: [],
          routeTaxPostRequestList: []
        };
        documentRuleFormsRef.current.forEach((formRef, docId) => {
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
        try {
          await RouteService.create(composedValues);
          message.success("Created Successfully");
          history.push(RouteConst.TRADE_ROUTES);
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
      <DTCSection.Content>
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
        <Divider style={{ marginBottom: 20 }} />
        <Grid direction="row" justifyContent="center" alignItems="center" container spacing={2}>
          <Grid item>
            <Button variant="contained" className="mr-2" onClick={handleCreate}>
              Create Default Trade Routes
            </Button>
          </Grid>
          <Grid item>
            <Link to={RouteConst.ROUTE}>
              <Button variant="outlined">Cancel</Button>
            </Link>
          </Grid>
        </Grid>
      </DTCSection.Content>
    </DTCSection>
  );
};

export default AddRoutePage;
