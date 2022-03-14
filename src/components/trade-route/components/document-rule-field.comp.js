import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { DocumentCheckboxList } from "./document-checkbox-list/document-checkbox-list.comp";
import { useDefaultDocumentList } from "./document-checkbox-list/use-default-document-list";
import { useDocumentCheckboxList } from "./document-checkbox-list/use-document-list";
import { DocumentRuleTable } from "./document-rule-table.comp";

export const DefaultDocumentRuleField = ({ documentTypes }) => {
  const checkboxListProps = useDocumentCheckboxList(documentTypes);
  return (
    <Stack spacing={1}>
      <Typography fontWeight="bold">Documents</Typography>
      <DocumentCheckboxList {...checkboxListProps} documentTypes={documentTypes} />
      <Typography fontWeight="bold">Document Rules</Typography>
      <DocumentRuleTable name="routeDocumentTypeRequests" />
    </Stack>
  );
};

export const DocumentRuleField = ({ documentTypes }) => {
  const defaulDocumentListProps = useDefaultDocumentList();
  const defaultRouteDocumentIds =
    defaulDocumentListProps?.documentTypes?.map((document) => document.id) ?? [];
  const customDocumentTypes =
    documentTypes?.filter((document) => !defaultRouteDocumentIds.includes(document.id)) ?? [];
  const checkboxListProps = useDocumentCheckboxList(customDocumentTypes);
  return (
    <Stack spacing={1}>
      <Typography fontWeight="bold">Documents</Typography>
      <Box>
        <Grid container>
          <Grid item xs={12} md={6} lg={6}>
            <DocumentCheckboxList {...defaulDocumentListProps} title="Default Documents" />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <DocumentCheckboxList
              {...checkboxListProps}
              documentTypes={customDocumentTypes}
              title="Customized Documents"
            />
          </Grid>
        </Grid>
      </Box>
      <Typography fontWeight="bold">Document Rules</Typography>
      <DocumentRuleTable name="routeDocumentTypeRequests" />
    </Stack>
  );
};
