import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { RouteConst } from "commons/consts";
import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";

import { DefaultDocumentRuleField } from "../document-rule-field.comp";
import { ProductTypeSelectField } from "../product-type-select-field.comp";
import { validationSchema } from "./validation.schema";

export const DefaultRouteForm = ({
  initialValues,
  isSubmitting,
  onSubmit,
  defaultDocuments,
  documentTypes
}) => {
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
      <Form>
        <Typography variant="h5" mb={3}>
          Default Route Information
        </Typography>
        <Box mb={3}>
          <ProductTypeSelectField />
        </Box>
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

        <DefaultDocumentRuleField
          documentTypes={documentTypes}
          defaultDocuments={defaultDocuments}
        />
        <Divider sx={{ mb: 4 }} />
        <Grid direction="row" justifyContent="center" alignItems="center" container spacing={2}>
          <Grid item>
            <Button disabled={isSubmitting} type="submit" variant="contained" className="mr-2">
              Create Default Trade Routes
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
