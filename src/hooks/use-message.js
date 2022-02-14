import React from "react";
import { useSnackbar } from "notistack";

export const useMessage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const error = React.useCallback(
    (message) => {
      enqueueSnackbar(message, { variant: "error" });
    },
    [enqueueSnackbar]
  );
  const success = React.useCallback(
    (message) => {
      enqueueSnackbar(message, { variant: "success" });
    },
    [enqueueSnackbar]
  );
  const warning = React.useCallback(
    (message) => {
      enqueueSnackbar(message, { variant: "success" });
    },
    [enqueueSnackbar]
  );

  return { error, success, warning };
};
