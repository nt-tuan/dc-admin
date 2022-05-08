import Edit from "@mui/icons-material/Edit";
import { Box, IconButton, Stack, Table, TableBody, TableHead, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
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
import MuiTableRow from "@mui/material/TableRow";
import NewEntityModalGroup from "../new-entity-modal-group";
import React from "react";
import TableCell from "./table-cell";
import TableRow from "./table-row";
import useDeleteProductClassification from "../../libs/use-delete-product-classification";
import { useHistory } from "react-router-dom";
import { getHSCodeFromBrick } from "../../libs/mapper";
import { useModal } from "mui-modal-provider";
import DeleteConfirm from "../delete-confirm";
import EditEntityModalGroup from "../edit-entity-modal-group";

interface Props {
  segments: Segment[];
}

const Consumer = () => {
  const { showModal } = useModal();
  const history = useHistory();
  const [editingNode, setEditingNode] = React.useState<TreeNodeValue>();
  const [newNodeType, setNewNodeType] = React.useState<EntityType>();
  const {
    nodes: allNodes,
    getNodes,
    setNodes,
    nodeSelection,
    setNodeSelection
  } = useProductClassificationContext();

  const { canDelete, mutate: deleteEntities, isDeleting } = useDeleteProductClassification();
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
        <TableCell align="right" sx={{ px: 2 }}>
          <IconButton onClick={() => handleNodeClick(nodeValue)}>
            <Edit sx={{ fontSize: 24 }} color="primary" />
          </IconButton>
        </TableCell>
      </>
    );
  };

  const requestConfirmDelete = () => {
    const modal = showModal(DeleteConfirm, {
      onCancel: () => modal?.destroy(),
      onDelete: () => {
        modal?.update({ isLoading: true });
        deleteEntities(undefined, {
          onSuccess: () => {
            removeAllDecendants();
            modal?.destroy();
          }
        });
      }
    });
  };

  return (
    <Box height="100%" overflow="auto">
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="product classification table">
        <TableHead>
          <MuiTableRow sx={{ backgroundColor: "grey.100", height: "52px" }}>
            <TableCell colSpan={2}>
              <Stack px={1.5} direction="row" justifyContent="space-between">
                {canDelete && (
                  <LoadingButton
                    variant="contained"
                    loading={isDeleting}
                    onClick={requestConfirmDelete}
                  >
                    Bulk Delete
                  </LoadingButton>
                )}
                <div />
                <CreateClassificationItemDropdown onCreate={openCreateModal} />
              </Stack>
            </TableCell>
            <TableCell width={160} align="center">
              HS Code
            </TableCell>
            <TableCell align="right" sx={{ px: 3 }}>
              Edit
            </TableCell>
          </MuiTableRow>
        </TableHead>
        <TableBody>
          {nodes.map((node) => (
            <TableRow key={node.code} data={node} level={0} renderCells={renderCells} />
          ))}
        </TableBody>
      </Table>
      <NewEntityModalGroup type={newNodeType} onClose={closeCreateModal} />
      <EditEntityModalGroup node={editingNode} onClose={closeModal} />
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
      lastLevel="Brick"
    >
      <Consumer />
    </Provider>
  );
};

export default UpdateClassificationTable;
