import { DTCConfirmModal, DTCTable } from "components/commons";
import React, { useCallback, useEffect, useState } from "react";

import { APIError } from "commons/types";
import { Box } from "@mui/material";
import { ROUTE_SCHEMA } from "components/trade-route/route.schema";
import { RouteConst } from "commons/consts";
import { RouteService } from "services";
import { useAsyncErrorHandler } from "utils/error-handler.util";
import { useHistory } from "react-router-dom";
import { useMessage } from "hooks/use-message";

export const RouteTable = ({ getData }) => {
  const asyncErrorHandlerWrapper = useAsyncErrorHandler();
  const history = useHistory();
  const message = useMessage();
  const [routes, setRoutes] = useState();
  const [deletedRoute, setDeletedRoute] = useState();
  const [confirmingDeleteRoute, setConfirmingDeleteRoute] = useState(false);
  const loadData = React.useCallback(() => {
    return asyncErrorHandlerWrapper(async () => {
      const response = await getData();
      setRoutes(response);
    });
  }, [getData, asyncErrorHandlerWrapper]);
  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleConfirmDelete = () => {
    if (!deletedRoute) return;
    asyncErrorHandlerWrapper(async () => {
      try {
        setConfirmingDeleteRoute(true);
        await RouteService.delete(deletedRoute);
        await loadData();
        message.success("Deleted Successfully!");
        setDeletedRoute();
      } catch (error) {
        if (error instanceof APIError) {
          const err = error.errors;
          message.warning(err[0][1]);
        } else {
          throw error;
        }
      } finally {
        setConfirmingDeleteRoute(false);
      }
    });
  };

  const handleDeleteClick = (id) => {
    setDeletedRoute(id);
  };

  const handleCloseConfirmModal = () => {
    setDeletedRoute();
  };
  const handleEditClick = useCallback(
    (id) => {
      history.push(`${RouteConst.EDIT_TRADE_ROUTE}?id=${id}`);
    },
    [history]
  );
  return (
    <>
      <Box sx={{ height: "500px" }}>
        <DTCTable
          showSettings={false}
          loading={routes == null}
          columns={ROUTE_SCHEMA.getTableSchema(handleEditClick, handleDeleteClick)}
          columnBuffer={ROUTE_SCHEMA.getTableSchema(handleEditClick, handleDeleteClick).length}
          dataSource={routes ?? []}
        />
      </Box>
      <DTCConfirmModal
        title="Are you sure?"
        content="Do you want to delete this route?"
        loading={confirmingDeleteRoute}
        onConfirm={handleConfirmDelete}
        onClose={handleCloseConfirmModal}
        open={Boolean(deletedRoute)}
      />
    </>
  );
};
