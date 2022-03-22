import { DTCConfirmModal, DTCTable } from "@/components/commons";
import React, { useState } from "react";

import { APIError } from "@/commons/types";
import { Box } from "@mui/material";
import { RouteService } from "../../services/route.service";
import { getTableSchema } from "./route.schema";
import { useAsyncErrorHandler } from "@/utils/error-handler.util";
import { useMessage } from "@/hooks/use-message";

export const RouteTable = ({ data, onInvalidate, isLoading, onEditClick, hiddenColumns = [] }) => {
  const asyncErrorHandlerWrapper = useAsyncErrorHandler();
  const message = useMessage();
  const [deletedRoute, setDeletedRoute] = useState();
  const [confirmingDeleteRoute, setConfirmingDeleteRoute] = useState(false);

  const handleConfirmDelete = () => {
    if (!deletedRoute) return;
    asyncErrorHandlerWrapper(async () => {
      try {
        setConfirmingDeleteRoute(true);
        await RouteService.delete(deletedRoute);
        onInvalidate();
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

  const fullColumns = getTableSchema(onEditClick, handleDeleteClick);
  const columns = fullColumns.filter(({ field }) => !hiddenColumns.includes(field));

  return (
    <>
      <Box sx={{ height: "500px" }}>
        <DTCTable
          showSettings={false}
          loading={isLoading}
          columns={columns}
          columnBuffer={columns.length}
          dataSource={data ?? []}
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
