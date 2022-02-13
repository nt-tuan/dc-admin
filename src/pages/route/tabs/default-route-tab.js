import { Box, Button, Stack } from "@mui/material";
import { ConfirmModal, DTCSection, DTCTable } from "components/commons";
import { Link, useHistory } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";

import { DatetimeUtils } from "utils/date-time.util";
import { ROUTE_SCHEMA } from "components/trade-route/route.schema";
import { RouteConst } from "commons/consts";
import { RouteService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import { useSnackbar } from "notistack";

export const DefaultRouteTab = () => {
  const [data, setData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const [confirmModal, setConfirmModal] = useState({
    show: false,
    title: "",
    innerTExt: "",
    onConfirmDelete: () => undefined
  });
  const history = useHistory();

  const getData = useCallback(
    () =>
      asyncErrorHandlerWrapper(async () => {
        const result = await getAllRecordsFromAPI(RouteService.getAll, {
          outerParams: {
            isDefault: true
          }
        });
        setData(
          result.map((r) => {
            return {
              ...r,
              createdDate: DatetimeUtils.formatDateTime(r.createdDate)
            };
          })
        );
      }),
    []
  );

  useEffect(() => {
    getData();
  }, [getData]);

  const handleEditClick = useCallback(
    (id) => {
      history.push(`${RouteConst.EDIT_DEFAULT_ROUTE}?id=${id}`);
    },
    [history]
  );

  const handleDeleteClick = useCallback(
    (id) => {
      setConfirmModal({
        title: "Are you sure?",
        innerText: "Do you want to delete this route?",
        show: true,
        onConfirmDelete: () => {
          asyncErrorHandlerWrapper(async () => {
            await RouteService.delete(id);
            getData();
            enqueueSnackbar("Deleted Successfully!", {
              variant: "success"
            });
          });
        }
      });
    },
    [getData, enqueueSnackbar]
  );

  const handleCloseConfirmModal = () => {
    setConfirmModal({
      show: false,
      title: "",
      onConfirmDelete: () => undefined
    });
  };

  return (
    <DTCSection>
      <DTCSection.Content>
        <Stack direction="row" justifyContent="flex-end">
          <Link to={RouteConst.ADD_DEFAULT_ROUTE}>
            <Button variant="contained" className="mb-3">
              Create Default Routes
            </Button>
          </Link>
        </Stack>
        <Box mt={2} sx={{ height: "500px" }}>
          <DTCTable
            showSettings={false}
            loading={false}
            columns={ROUTE_SCHEMA.getTableSchema(handleEditClick, handleDeleteClick)}
            columnBuffer={ROUTE_SCHEMA.getTableSchema(handleEditClick, handleDeleteClick).length}
            dataSource={data}
          />
        </Box>
        <ConfirmModal
          showForm={confirmModal.show}
          title={confirmModal.title}
          innerText={confirmModal.innerText}
          onConfirmLock={confirmModal.onConfirmDelete}
          toggleShowForm={handleCloseConfirmModal}
        />
      </DTCSection.Content>
    </DTCSection>
  );
};
