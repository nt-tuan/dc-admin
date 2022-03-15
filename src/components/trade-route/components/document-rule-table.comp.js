import { AutocompleteField, RenderField } from "@/components/commons/fields";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useFormikContext } from "formik";
import React from "react";

const viewerDataSource = [
  {
    value: "SELLER",
    label: "Seller"
  },
  {
    value: "BUYER",
    label: "Buyer"
  },
  {
    value: "LOGISTIC_SERVICE_PROVIDER",
    label: "Logistic Service Provider"
  }
];
const RowField = ({ name, disabled, getRowValues, dataSource }) => {
  const { values } = useFormikContext();
  const documentRowData = getRowValues(values) ?? {};
  const selectedDocuments = documentRowData?.routeDocumentRuleDto ?? {};
  const selectedDocumentValues = Object.values(selectedDocuments);
  const isDisabled = (value) => selectedDocumentValues.includes(value);

  return (
    <AutocompleteField
      name={name}
      fullWidth
      hiddenLabel
      disabled={disabled}
      dataSource={viewerDataSource}
      filterOptions={(options) => {
        return options.filter((value) => !isDisabled(value));
      }}
    />
  );
};

const HeaderCell = ({ children }) => {
  return (
    <TableCell align="left" width={200}>
      <Typography fontWeight="bold">{children}</Typography>
    </TableCell>
  );
};

export const DocumentRuleTable = ({ name }) => {
  const getRowFieldName = (index, viewerFieldName) => {
    return {
      name: `${name}.${index}.routeDocumentRuleDto.${viewerFieldName}`,
      getRowValues: (values) => values[name][index]
    };
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <HeaderCell>Document</HeaderCell>
            <HeaderCell>Provider</HeaderCell>
            <HeaderCell>Viewer 1</HeaderCell>
            <HeaderCell>Viewer 2</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <RenderField name={name}>
            {({ values }) => {
              const documents = values[name] ?? [];
              return documents.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell align="left">{documents[index].name}</TableCell>
                  <TableCell align="left">
                    <RowField {...getRowFieldName(index, "provider")} disabled={row.disabled} />
                  </TableCell>
                  <TableCell align="left">
                    <RowField {...getRowFieldName(index, "viewer1")} disabled={row.disabled} />
                  </TableCell>
                  <TableCell align="left">
                    <RowField {...getRowFieldName(index, "viewer2")} disabled={row.disabled} />
                  </TableCell>
                </TableRow>
              ));
            }}
          </RenderField>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
