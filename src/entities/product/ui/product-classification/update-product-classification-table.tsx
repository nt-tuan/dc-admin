import Edit from "@mui/icons-material/Edit";
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
import { EntityType, TreeNodeValue } from "../../model/types";
import Provider, { useProductClassificationContext } from "./provider";
import {
  Segment,
  getSegment,
  getProductFamily,
  getProductClass,
  getProductBrick
} from "@/services/pim.service";
import { getActualCode, getDecendantCodes } from "../../libs/tree-node";
import {
  getAttributeEditionPath,
  getBrickEditionPath
} from "@/commons/consts/system/routes/pim-route-paths.const";

import CreateClassificationItemDropdown from "./create-classification-item-dropdown";
import EditClassModal from "../edit-class-modal";
import EditFamilyModal from "../edit-family-modal";
import EditSegmentModal from "../edit-segment-modal";
import MuiTableRow from "@mui/material/TableRow";
import NewEntityModalGroup from "../new-entity-modal-group";
import React from "react";
import TableCell from "./table-cell";
import TableRow from "./table-row";
import useDeleteProductClassification from "../../libs/use-delete-product-classification";
import { useHistory } from "react-router-dom";
import { getHSCodeFromBrick } from "../../libs/mapper";

interface Props {
  segments: Segment[];
}

const Consumer = () => {
  const history = useHistory();
  const [editingNode, setEditingNode] = React.useState<TreeNodeValue>();
  const [newNodeType, setNewNodeType] = React.useState<EntityType>();
  const {
    nodes: allNodes,
    getNodes,
    setNodes,
    nodeSelection,
    setNodeSelection,
    updateNode
  } = useProductClassificationContext();

  const { canDelete, mutate: deleteEntities } = useDeleteProductClassification(
    allNodes,
    nodeSelection
  );
  const removeAllDecendants = () => {
    const deletedCodes = Object.keys(nodeSelection).filter((item) => nodeSelection[item]);
    const allDecendantCodes: string[] = [];
    for (const code of deletedCodes) {
      const decendantCodes = getDecendantCodes(allNodes, code);
      allDecendantCodes.push(...decendantCodes);
    }
    const nextNodes = { ...allNodes };
    const nextNodeSelection = { ...nodeSelection };
    for (const deletedCode of allDecendantCodes) {
      delete nextNodes[deletedCode];
      delete nextNodeSelection[deletedCode];
    }
    setNodes(nextNodes);
    setNodeSelection(nextNodeSelection);
  };
  const nodes = React.useMemo(() => {
    return getNodes();
  }, [getNodes]);
  const closeModal = () => {
    setEditingNode(undefined);
  };
  const openCreateModal = (type: EntityType) => {
    setNewNodeType(type);
  };
  const closeCreateModal = () => {
    setNewNodeType(undefined);
  };

  const reloadSegment = async (segment?: Segment) => {
    if (editingNode == null || segment == null) return;
    updateNode(editingNode.code, (currentNode) => ({ ...currentNode, title: segment.title }));
  };

  const handleNodeClick = (nodeValue: TreeNodeValue) => {
    const actualCode = getActualCode(nodeValue.code);
    if (!actualCode) return;
    if (nodeValue.type === "Brick") {
      history.push(getBrickEditionPath(actualCode));
      return;
    }
    if (nodeValue.type === "Attribute") {
      history.push(getAttributeEditionPath(actualCode));
      return;
    }
    setEditingNode(nodeValue);
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
          {nodeValue.type === "Brick" && (
            <Typography variant="body2" color="error">
              {getHSCodeFromBrick(nodeValue as never)}
            </Typography>
          )}
        </TableCell>
        <TableCell>
          <IconButton>
            <Edit color="primary" onClick={() => handleNodeClick(nodeValue)} />
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
                  <Button
                    variant="contained"
                    onClick={() => deleteEntities(undefined, { onSuccess: removeAllDecendants })}
                  >
                    Bulk Delete
                  </Button>
                )}
                <div />
                <CreateClassificationItemDropdown onCreate={openCreateModal} />
              </Stack>
            </TableCell>
            <TableCell align="center">HS Code</TableCell>
            <TableCell>Edit</TableCell>
          </MuiTableRow>
        </TableHead>
        <TableBody>
          {nodes.map((node) => (
            <TableRow key={node.code} data={node} level={0} renderCells={renderCells} />
          ))}
        </TableBody>
      </Table>
      <NewEntityModalGroup type={newNodeType} onClose={closeCreateModal} />
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
              segmentCode={editingNode.parentCode ?? ""}
              title={editingNode.title}
              onClose={closeModal}
            />
          )}
          {editingNode.type === "Class" && editingNode.parentCode && (
            <EditClassModal
              open
              parentCode={editingNode.parentCode}
              code={editingNode.code}
              title={editingNode.title}
              onClose={closeModal}
            />
          )}
        </>
      )}
    </Box>
  );
};
const familiesLoader = async (code?: string) => {
  if (code == null) return [];
  const segment = await getSegment(code);
  if (segment == null) return [];
  return segment.families ?? [];
};
const classesLoader = async (code?: string) => {
  if (code == null) return [];
  const family = await getProductFamily(code);
  if (family == null) return [];
  return family.classes ?? [];
};
const bricksLoader = async (code?: string) => {
  if (code == null) return [];
  const cl = await getProductClass(code);
  if (cl == null) return [];
  return cl.bricks ?? [];
};
const attributesLoader = async (code?: string) => {
  if (code == null) return [];
  const brick = await getProductBrick(code);
  if (brick == null) return [];
  return brick.attributes ?? [];
};
const UpdateClassificationTable = ({ segments }: Props) => {
  return (
    <Provider
      segments={segments}
      loaders={{
        Family: familiesLoader,
        Class: classesLoader,
        Brick: bricksLoader,
        Attribute: attributesLoader
      }}
    >
      <Consumer />
    </Provider>
  );
};

export default UpdateClassificationTable;
