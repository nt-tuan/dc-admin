import { Form, Formik } from "formik";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { DocumentRuleField } from "../document-rule-field.comp";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { ProductTypeSelectField } from "../product-type-select-field.comp";
import React from "react";
import { RouteConst } from "commons/consts";
import { RouteField } from "../route-field.comp";
import Stack from "@mui/material/Stack";
import { TaxField } from "../tax-field.comp";
import Typography from "@mui/material/Typography";
import { validationSchema } from "./validation.schema";

export const TradeRouteForm = ({
  initialValues,
  onSubmit,
  defaultDocuments,
  documentTypes,
  isSubmitting
}) => {
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
      <Form>
        <Typography variant="h5" mb={3}>
          Route Information
        </Typography>
        <Stack mb={3} spacing={1}>
          <RouteField />
          <ProductTypeSelectField />
        </Stack>
        <TaxField />
        <Typography>
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
        </Typography>
        <Typography mb={2}>Select the documents required for this route</Typography>

        <DocumentRuleField documentTypes={documentTypes} defaultDocuments={defaultDocuments} />
        <Divider sx={{ mb: 4 }} />
        <Grid direction="row" justifyContent="center" alignItems="center" container spacing={2}>
          <Grid item>
            <Button disabled={isSubmitting} type="submit" variant="contained" className="mr-2">
              Create Trade Routes
            </Button>
          </Grid>
          <Grid item>
            <Link to={`${RouteConst.TRADE_ROUTES}?tab=DEFAULT_ROUTE`}>
              <Button disabled={isSubmitting} variant="outlined">
                Cancel
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};
