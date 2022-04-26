import * as React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { getAttributeEditionPath } from "@/commons/consts/system/routes/pim-route-paths.const";
import DeleteConfirm from "../delete-confirm";
import DeleteFailedAlert from "../delete-failed-alert";
import { ProductAttribute } from "@/services/pim.service";
import SelectableEntityTable from "../selectable-entity-table";
import { Stack, Typography } from "@mui/material";
import { useDeleteProductAttributes } from "../../libs/use-update-entity";
import SearchInput from "../search-input";
import { filterProductEntity } from "../../libs/filter";

interface Props {
  dataSource: ProductAttribute[];
}

export default function AttributeTable({ dataSource }: Props) {
  const [filter, setFilter] = React.useState<string>("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState<boolean>(false);
  const [deleteFailedBrick, setDeleteFailedBrick] = React.useState<string>();
  const { mutate, isLoading } = useDeleteProductAttributes();
  const [willDeletedBricks, setWillDeletedBricks] = React.useState<string[]>([]);

  const filteredDataSource = React.useMemo(() => {
    return filterProductEntity(dataSource, filter);
  }, [dataSource, filter]);

  const openDeleteFailAlert = (brickTitle: string) => {
    setDeleteFailedBrick(brickTitle);
  };
  const closeDeleteFailAlert = () => {
    setDeleteFailedBrick(undefined);
  };

  const deleteBricks = () => {
    if (willDeletedBricks.length === 0) return;
    mutate(willDeletedBricks, {
      onSuccess: closeDeleteConfirm,
      onError: (error: Error) => openDeleteFailAlert(error.message)
    });
  };

  const openDeleteConfirm = (codes: string[]) => {
    setWillDeletedBricks(codes);
    setDeleteConfirmOpen(true);
  };
  const closeDeleteConfirm = () => {
    setDeleteConfirmOpen(false);
  };

  return (
    <Stack spacing={3}>
      <SearchInput filter={filter} setFilter={setFilter} placeholder="Search Attributes" />
      <SelectableEntityTable
        dataSource={filteredDataSource}
        onDelete={openDeleteConfirm}
        isDeleting={isLoading}
        columns={[
          {
            dataIndex: "title",
            key: "title",
            header: "Brick Name",
            isLabel: true
          },
          {
            key: "type",
            header: "Attribute Type",
            renderCell: () => <Typography variant="body2">Dropdown</Typography>
          },
          {
            key: "action",
            props: {
              align: "right"
            },
            renderCell: (row) => (
              <Link to={getAttributeEditionPath(row.code)}>
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
              </Link>
            )
          }
        ]}
      />
      <DeleteConfirm
        isLoading={isLoading}
        open={deleteConfirmOpen}
        onCancel={closeDeleteConfirm}
        onDelete={deleteBricks}
      />
      <DeleteFailedAlert
        brickTitle={deleteFailedBrick}
        open={deleteFailedBrick != null}
        onCancel={closeDeleteFailAlert}
      />
    </Stack>
  );
}
