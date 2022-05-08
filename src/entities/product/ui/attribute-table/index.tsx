import * as React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useHistory } from "react-router-dom";
import { getAttributeEditionPath } from "@/commons/consts/system/routes/pim-route-paths.const";
import DeleteConfirm from "../delete-confirm";
import { useDeleteFailedAlert } from "../delete-failed-alert";
import { ProductAttribute } from "@/services/pim.service";
import SelectableEntityTable from "../selectable-entity-table";
import { Stack, Typography } from "@mui/material";
import { useDeleteProductAttributes } from "../../libs/use-update-entity";
import SearchInput from "../search-input";
import { filterProductEntity } from "../../libs/filter";
import { useModal } from "mui-modal-provider";
import Box from "@mui/material/Box";

interface Props {
  dataSource: ProductAttribute[];
}

export default function AttributeTable({ dataSource }: Props) {
  const history = useHistory();
  const [filter, setFilter] = React.useState<string>("");
  const { mutate, isLoading } = useDeleteProductAttributes();
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

  const navigateToRowEdition = (row: ProductAttribute) => {
    history.push(getAttributeEditionPath(row.code));
  };

  const filteredDataSource = React.useMemo(() => {
    return filterProductEntity(dataSource, filter);
  }, [dataSource, filter]);

  return (
    <Stack spacing={3}>
      <SearchInput filter={filter} setFilter={setFilter} placeholder="Search Attributes" />
      <SelectableEntityTable
        dataSource={filteredDataSource}
        onDelete={openDeleteConfirm}
        isDeleting={isLoading}
        onRowClick={navigateToRowEdition}
        columns={[
          {
            dataIndex: "title",
            key: "title",
            header: "Label",
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
              <Box px={2}>
                <Link to={getAttributeEditionPath(row.code)}>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                </Link>
              </Box>
            )
          }
        ]}
      />
    </Stack>
  );
}
