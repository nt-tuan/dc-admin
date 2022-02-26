import React, { forwardRef, useEffect, useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

const DATA_SOURCE = ["Seller", "Buyer", "Logistic Service Provider", "Inspection Provider"];

const RowField = ({ value, ignoreValues = [], isEdit, isRequired, ...props }) => {
  if (!isEdit) {
    return value;
  }
  const onChange = (e) => {
    if (typeof props.onChange === "function") {
      props.onChange(e.target.value);
    }
  };
  return (
    <Select
      {...props}
      value={value || null}
      fullWidth
      onChange={onChange}
      placeholder={isRequired ? "*" : ""}
    >
      {DATA_SOURCE.filter((d) => !ignoreValues.includes(d)).map((menuValue) => (
        <MenuItem key={menuValue} value={menuValue}>
          {menuValue}
        </MenuItem>
      ))}
    </Select>
  );
};

export const DocumentRuleTable = forwardRef(({ data }, ref) => {
  const [dataSource, setDatasource] = useState(data);

  const columns = [
    {
      title: "Document",
      dataIndex: "document",
      editable: false
    },
    {
      title: "Provider",
      dataIndex: "provider",
      editable: true,
      isRequired: true
    },
    {
      title: "Viewer 1",
      dataIndex: "viewer1",
      editable: true,
      isRequired: true
    },
    {
      title: "Viewer 2",
      dataIndex: "viewer2",
      editable: true
    },
    {
      title: "Viewer 3",
      dataIndex: "viewer3",
      editable: true
    }
  ];

  const fieldsEdit = columns.filter((c) => c.editable).map((c) => c.dataIndex);
  const fieldsRequired = columns.filter((c) => c.isRequired).map((c) => c.dataIndex);

  useEffect(() => {
    const dataConvert = [];
    data.forEach((d) => {
      const ds = dataSource.find((dse) => dse.id === d.id);

      dataConvert.push(ds || d);
    });
    ref.current.set("value", dataConvert);
    setDatasource(dataConvert);
  }, [data]);

  return (
    <div className="air__utils__scrollTable">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((c) => (
                <TableCell align="left" width={200}>
                  <Typography variant={"h6"}>{c.title}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataSource.map((row, index) => (
              <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                {columns.map((c) => {
                  const ignoreValues = fieldsEdit
                    .filter((f) => f !== c.dataIndex)
                    .map((f) => row[f]);

                  const onChange = (v) => {
                    const value = {
                      ...row,
                      [c.dataIndex]: v
                    };

                    const dataTemp = [...dataSource];
                    dataTemp[index] = value;
                    ref.current.set("value", dataTemp);
                    setDatasource(dataTemp);
                  };

                  return (
                    <TableCell align="left">
                      <RowField
                        name={c.dataIndex}
                        ignoreValues={ignoreValues}
                        disabled={row.disabled}
                        isEdit={c.editable}
                        isRequired={fieldsRequired.includes(c.dataIndex)}
                        value={row[c.dataIndex]}
                        onChange={onChange}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});
