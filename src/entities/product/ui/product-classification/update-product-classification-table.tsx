import {
  Box,
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableHead,
  Typography
} from "@mui/material";
import Provider, { useProductClassificationContext } from "./provider";
import { Segment, getSegment } from "@/services/pim.service";

import CreateClassificationItemDropdown from "./create-classification-item-dropdown";
import Edit from "@mui/icons-material/Edit";
import EditClassModal from "../edit-class-modal";
import EditFamilyModal from "../edit-family-modal";
import EditSegmentModal from "../edit-segment-modal";
import MuiTableRow from "@mui/material/TableRow";
import React from "react";
import TableCell from "./table-cell";
import TableRow from "./table-row";
import { TreeNodeValue } from "../../model/types";
import useDeleteProductClassification from "../../libs/use-delete-product-classification";

interface Props {
  segments: Segment[];
}

const Consumer = () => {
  const [editingNode, setEditingNode] = React.useState<TreeNodeValue>();
  const {
    nodes: allNodes,
    getNodes,
    nodeSelection,
    updateNode
  } = useProductClassificationContext();
  const { canDelete, mutate: deleteEntities } = useDeleteProductClassification(
    allNodes,
    nodeSelection
  );
  const nodes = React.useMemo(() => {
    return getNodes();
  }, [getNodes]);
  const closeModal = () => {
    setEditingNode(undefined);
  };
  const reloadSegment = async (segment?: Segment) => {
    if (editingNode == null || segment == null) return;
    updateNode(editingNode.code, (currentNode) => ({ ...currentNode, title: segment.title }));
  };

  const renderCells = (
    checkboxCells: React.ReactNode,
    productClassification: React.ReactNode,
    nodeValue: TreeNodeValue
  ) => {
    return (
      <>
        {checkboxCells}
        {productClassification}
        <TableCell>
          <Typography variant="body2" color="error">
            No HS Code
          </Typography>
        </TableCell>
        <TableCell>
          <IconButton>
            <Edit color="primary" onClick={() => setEditingNode(nodeValue)} />
          </IconButton>
        </TableCell>
      </>
    );
  };

  return (
    <Box height="100%" overflow="auto">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <MuiTableRow sx={{ backgroundColor: "grey.100" }}>
            <TableCell colSpan={2}>
              <Stack px={1.5} direction="row" justifyContent="space-between">
                {canDelete && (
                  <Button variant="contained" onClick={() => deleteEntities()}>
                    Bulk Delete
                  </Button>
                )}
                <div />
                <CreateClassificationItemDropdown />
              </Stack>
            </TableCell>
            <TableCell>HS Code</TableCell>
            <TableCell>Edit</TableCell>
          </MuiTableRow>
        </TableHead>
        <TableBody>
          {nodes.map((node) => (
            <TableRow key={node.code} data={node} level={0} renderCells={renderCells} />
          ))}
        </TableBody>
      </Table>
      {editingNode && (
        <>
          {editingNode.type === "Segment" && (
            <EditSegmentModal
              open
              code={editingNode.code}
              title={editingNode.title}
              onClose={closeModal}
              onSuccess={reloadSegment}
            />
          )}
          {editingNode.type === "Family" && (
            <EditFamilyModal
              open
              code={editingNode.code}
              title={editingNode.title}
              onClose={closeModal}
            />
          )}
          {editingNode.type === "Class" && editingNode.parentCode && (
            <EditClassModal
              open
              code={editingNode.code}
              title={editingNode.title}
              segmentCode={editingNode.parentCode}
              onClose={closeModal}
            />
          )}
        </>
      )}
    </Box>
  );
};
const segmentLoader = async (code: number) => {
  const segment = await getSegment(code);
  if (segment == null) return [];
  return [segment];
};
const UpdateClassificationTable = ({ segments }: Props) => {
  return (
    <Provider
      segments={segments}
      loaders={{
        Segment: segmentLoader
      }}
    >
      <Consumer />
    </Provider>
  );
};

export default UpdateClassificationTable;
