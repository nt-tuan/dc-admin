import * as React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { getBrickEditionPath } from "@/commons/consts/system/routes/pim-route-paths.const";
import { useDeleteBricks } from "../../libs/use-update-entity";
import DeleteConfirm from "../delete-confirm";
import DeleteFailedAlert from "../delete-failed-alert";
import { ProductBrick } from "@/services/pim.service";
import SelectableEntityTable from "../selectable-entity-table";
import Stack from "@mui/material/Stack";
import SearchInput from "../search-input";
import { filterProductEntity } from "../../libs/filter";

interface Props {
  dataSource: ProductBrick[];
}

export default function BrickTable({ dataSource }: Props) {
  const [filter, setFilter] = React.useState("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState<boolean>(false);
  const [deleteFailedBrick, setDeleteFailedBrick] = React.useState<string>();
  const { mutate, isLoading } = useDeleteBricks();
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
      <SearchInput filter={filter} setFilter={setFilter} placeholder="Search Bricks" />
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
            key: "hsCode",
            dataIndex: "hsCode",
            header: "HS Code"
          },
          {
            key: "action",
            props: {
              align: "right"
            },
            renderCell: (row) => (
              <Link to={getBrickEditionPath(row.code)}>
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
