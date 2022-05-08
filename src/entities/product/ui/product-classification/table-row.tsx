import React from "react";
import MuiTableRow from "@mui/material/TableRow";
import CheckboxCell from "./checkbox-cell";
import ProductClassificationCell from "./product-classification-cell";
import type { TreeNodeValue } from "../../model/types";
import { useProductClassificationContext } from "./provider";
import { getLowerEntityType } from "../../libs/tree-node";
interface Props {
  level: number;
  data: TreeNodeValue;
  renderCells?: (
    checkboxCell: React.ReactNode,
    productClassificationCell: React.ReactNode,
    nodeValue: TreeNodeValue
  ) => React.ReactNode;
}
const defaultRenderCells = (
  checkboxCell: React.ReactNode,
  productClassificationCell: React.ReactNode
) => (
  <>
    {checkboxCell}
    {productClassificationCell}
  </>
);

const TableRow = ({ level, data, renderCells = defaultRenderCells }: Props) => {
  const {
    getNodes,
    loadMoreData,
    isDefaultSelection,
    lastLevel
  } = useProductClassificationContext();
  const [expanded, setExpanded] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const childrenNodes = React.useMemo(() => {
    return getNodes(data.code);
  }, [getNodes, data.code]);
  const isLastLevel = lastLevel === data.type;
  const toggleExpand = async () => {
    if (isLastLevel) return;
    setLoading(true);
    await loadMoreData(data.code, getLowerEntityType(data.type));
    setLoading(false);
    setExpanded((current) => !current);
  };
  const disabled = isDefaultSelection(data.code);
  const disabledStyle = disabled
    ? {
        backgroundColor: "grey.100",
        boxShadow: "inset 0px -1px 0px rgba(0, 0, 0, 0.12)",
        opacity: 0.5
      }
    : {};
  return (
    <>
      <MuiTableRow
        key={data.code}
        sx={{
          paddingTop: "12px",
          paddingBottom: "12px",
          ...disabledStyle
        }}
      >
        {renderCells(
          <CheckboxCell code={data.code} />,
          <ProductClassificationCell
            onClick={toggleExpand}
            expanded={expanded}
            isLoading={isLoading}
            title={data.title}
            type={data.type}
            level={level}
            isLastLevel={isLastLevel}
          />,
          data
        )}
      </MuiTableRow>

      {!isLastLevel &&
        expanded &&
        childrenNodes?.map((item) => (
          <TableRow key={item.code} data={item} level={level + 4} renderCells={renderCells} />
        ))}
    </>
  );
};

export default TableRow;
