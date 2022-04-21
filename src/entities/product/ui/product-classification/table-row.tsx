import React from "react";
import MuiTableRow from "@mui/material/TableRow";
import CheckboxCell from "./checkbox-cell";
import ProductClassificationCell from "./product-classification-cell";
import type { Dictionary, TreeNodeValue } from "../../model/types";
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
  onNodesLoaded?: (node: Dictionary<TreeNodeValue>) => void;
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
const TableRow = ({ level, data, renderCells = defaultRenderCells, onNodesLoaded }: Props) => {
  const { getNodes, loadMoreData } = useProductClassificationContext();
  const [expanded, setExpanded] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const childrenNodes = React.useMemo(() => {
    return getNodes(data.code);
  }, [getNodes, data.code]);
  const toggleExpand = async () => {
    setLoading(true);
    await loadMoreData(data.code, getLowerEntityType(data.type));
    setLoading(false);
    setExpanded((current) => !current);
  };
  return (
    <>
      <MuiTableRow
        key={data.code}
        sx={{
          paddingTop: "12px",
          paddingBottom: "12px"
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
          />,
          data
        )}
      </MuiTableRow>

      {expanded &&
        childrenNodes?.map((item) => (
          <TableRow key={item.code} data={item} level={level + 4} renderCells={renderCells} />
        ))}
    </>
  );
};

export default TableRow;
