import { DocumentList } from "./document-list";
import { DocumentRuleTable } from "./document-rule-table.comp";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const DocumentRuleField = ({ defaultDocuments, documentTypes }) => {
  return (
    <Stack spacing={1}>
      <Typography fontWeight="bold">Documents</Typography>
      <DocumentList
        fieldName="routeDocumentTypeRequests"
        defaultDocuments={defaultDocuments}
        documentTypes={documentTypes}
      />
      <Typography fontWeight="bold">Document Rules</Typography>
      <DocumentRuleTable name="routeDocumentTypeRequests" />
    </Stack>
  );
};
