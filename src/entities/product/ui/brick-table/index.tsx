import * as React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { getBrickEditionPath } from "@/commons/consts/system/routes/pim-route-paths.const";
import { useDeleteBricks } from "../../libs/use-update-entity";
import DeleteConfirm from "../delete-confirm";
import { useDeleteFailedAlert } from "../delete-failed-alert";
import { ProductBrick } from "@/services/pim.service";
import SelectableEntityTable from "../selectable-entity-table";
import Stack from "@mui/material/Stack";
import SearchInput from "../search-input";
import { filterProductEntity } from "../../libs/filter";
import { useModal } from "mui-modal-provider";

interface Props {
  dataSource: ProductBrick[];
}

export default function BrickTable({ dataSource }: Props) {
  const [filter, setFilter] = React.useState("");
  const { mutate, isLoading } = useDeleteBricks();
  const { showModal: showFailedBricks } = useDeleteFailedAlert({ dataSource });
  const { showModal } = useModal();

  const openDeleteConfirm = (codes: string[]) => {
    const confirmModal = showModal(DeleteConfirm, {
      isLoading: false,
      onCancel: () => confirmModal.destroy(),
      onDelete: () => {
        confirmModal.update({ isLoading: true });
        mutate(codes, {
          onSuccess: (result) => {
            confirmModal.destroy();
            showFailedBricks(result);
          }
        });
      }
    });
  };

  const filteredDataSource = React.useMemo(() => {
    return filterProductEntity(dataSource, filter);
  }, [dataSource, filter]);

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
    </Stack>
  );
}
