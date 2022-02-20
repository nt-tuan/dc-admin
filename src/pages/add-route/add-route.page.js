import { ACTORS_REVERSE, ACTORS, RouteConst } from "commons/consts";
import { DTCSection } from "components/commons";
import { DocumentList, DocumentRuleTable, RouteLocationForm } from "components/trade-route";
import {
  FIELDS,
  TAX_RULES_TYPE_MAIN_SCHEMA,
  typeTAX
} from "components/trade-route/route/forms/tax-rules/tax.chemas";
import { Link, useHistory } from "react-router-dom";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { APIError } from "commons/types";
import { Helmet } from "react-helmet";
import { RouteService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import uniqBy from "lodash/uniqBy";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Divider from "@mui/material/Divider";
import { Grid, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";
import { TradeRouteTaxFormV2 } from "components/trade-route/route/forms/tax-rules/tax-rules.form";
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
  const { enqueueSnackbar } = useSnackbar();

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

  const handleCreate = async () => {
    setIsloadingCreate(true);
    asyncErrorHandlerWrapper(async () => {
      const validators = [
        locationFormRef.current.validateForm(),
        locationFormRef.current.submitForm(),

        taxRuleForms.current.validateForm(),
        taxRuleForms.current.submitForm()
      ];
      await isFormValid(async () => {
        await Promise.all([
          // locationFormRef.current.validateForm(),
          // taxRuleForms.current.validateFields(),
          // ...docFormRefs.map((form) => form.validateFields())
        ]);
        await Promise.all(validators);
      });

      const valid =
        Object.keys({
          ...locationFormRef.current.errors,
          ...taxRuleForms.current.errors
        }).length === 0;

      if (valid) {
        const { category, type, from, to } = locationFormRef.current.getFieldMeta().value;
        let composedValues = {
          fromCountry: from,
          toCountry: to,
          categoryId: category,
          isDefault: false,
          typeId: type,
          routeDocumentTypeRequests: [],
          routeTaxPostRequestList: []
        };

        documentRuleForms.current.get("value").forEach((values) => {
          composedValues.routeDocumentTypeRequests.push({
            id: values.id,
            routeDocumentRuleDto: {
              provider: ACTORS[values.provider],
              viewer1: ACTORS[values.viewer1],
              viewer2: ACTORS[values.viewer2],
              viewer3: ACTORS[values.viewer3]
            }
          });
        });

        const taxRuleValues = taxRuleForms.current.getFieldMeta().value;

        if (taxRuleValues[FIELDS.applyType] === typeTAX.MAIN) {
          composedValues.routeTaxPostRequestList[0] = taxRuleValues;
        }

        try {
          await RouteService.create(composedValues);
          enqueueSnackbar("Created Successfully", { variant: "success" });
          history.push(RouteConst.TRADE_ROUTES);
        } catch (error) {
          setIsloadingCreate(false);
          if (error instanceof APIError) {
            const err = error.errors;
            enqueueSnackbar(err[0][1], { variant: "error" });
          } else if (error.message === 400) {
            message.warning(error.errMsg);
            enqueueSnackbar(error.errMsg, { variant: "warning" });
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
    <DTCSection style={{ padding: 20 }}>
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
        <TradeRouteTaxFormV2 dataSource={dataSourceTax.current} ref={taxRuleForms} />
      </div>
      <Divider style={{ marginTop: 20 }} />
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
        <Grid container spacing={2}>
          <Grid item>
            <DocumentList
              title="Default Documents"
              defaultDocs={defaultDocs}
              defaultValue={defaultDocumentIds}
              documents={defaultDocuments}
              onChange={handleDefaultDocListChange}
              onTouch={handleDocListTouch}
            />
          </Grid>
          <Grid item>
            <DocumentList
              title="Customized Documents"
              defaultDocs={defaultDocs}
              documents={filteredCustomizedDocs}
              onChange={handleCustomizedDocListChange}
            />
          </Grid>
        </Grid>
      </div>
      <Divider style={{ marginTop: 20 }} />
      <div>
        <h5>Document trade routes</h5>
        <DocumentRuleTable ref={documentRuleForms} data={docTableData} />
      </div>
      <Divider style={{ marginTop: 20, marginBottom: 20 }} />
      <Grid
        style={{ marginBottom: 20 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        container
        spacing={2}
      >
        <Grid item>
          <LoadingButton
            loadingPosition="start"
            variant="contained"
            loading={isLoadingCreate}
            className="mr-2"
            onClick={handleCreate}
          >
            Create Trade Routes
          </LoadingButton>
        </Grid>
        <Grid item>
          <Link to={RouteConst.TRADE_RULES}>
            <Button disabled={isLoadingCreate} variant="outlined">
              Cancel
            </Button>
          </Link>
        </Grid>
      </Grid>
    </DTCSection>
  );
};

export default AddRoutePage;
