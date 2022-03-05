import { Alert, Box, Grid, Snackbar, TextField, Typography } from "@mui/material";
import React, { memo, useEffect, useMemo, useState } from "react";
import { SETTINGS_MESSAGE, getErrorMaxCharactersMessage } from "commons/consts";
import { getOrganizationName, updateOrganizationName } from "services/organization.service";

import LoadingButton from "@mui/lab/LoadingButton";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { styled } from "@mui/system";

const FieldInput = styled(TextField)(() => ({
  ".MuiInputLabel-asterisk": {
    color: "#F44336"
  }
}));

const fieldName = "organization";
const labelText = "Organization Name";
const helperTextDefault = "(30 max characters)";
const validateMsg = getErrorMaxCharactersMessage("Organization name", 30);

const OrganizationProfilePage = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState(helperTextDefault);

  useEffect(() => {
    getOrganization();
  }, []);

  const getOrganization = async () => {
    try {
      setLoading(true);
      await asyncErrorHandlerWrapper(async () => {
        const { organizationName: organizationValue } = await getOrganizationName();
        setOrganizationName(organizationValue);
      });
    } finally {
      setLoading(false);
    }
  };

  const isError = useMemo(() => {
    return organizationName?.trim().length >= 30;
  }, [organizationName]);

  const isFieldEmpty = useMemo(() => {
    return organizationName?.trim().length === 0;
  }, [organizationName]);

  const handleSave = async () => {
    if (loading || isFieldEmpty) {
      return;
    }
    if (isError) {
      setError(true);
      setHelperText(validateMsg);
      return;
    }
    try {
      setLoading(true);
      await asyncErrorHandlerWrapper(async () => {
        await updateOrganizationName({ organizationName });
        showAlertSuccess();
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setOrganizationName(() => {
      if (error) {
        setError(false);
        setHelperText(helperTextDefault);
      }
      return value;
    });
  };

  const showAlertSuccess = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <>
      <Snackbar
        open={openAlert}
        autoHideDuration={5000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          <Box fontSize={14}>{SETTINGS_MESSAGE.updateSuccess("Organization profile")}</Box>
        </Alert>
      </Snackbar>

      <Grid container direction="row" justifyContent="space-between" spacing={3} px={3} pt={3}>
        <Grid item xs={12} md={6} lg={5}>
          <Typography variant="h5" fontWeight={700}>
            Organization Profile
          </Typography>
          <Box paddingTop={3}>
            <FieldInput
              label={labelText}
              required
              name={fieldName}
              placeholder={labelText}
              helperText={helperText}
              fullWidth
              onChange={handleChange}
              value={organizationName}
              error={error}
              disabled={loading}
            />
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box display="flex" justifyContent="flex-end">
            <LoadingButton
              loading={loading}
              disabled={isFieldEmpty}
              onClick={handleSave}
              type="submit"
              variant="contained"
            >
              Save
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default memo(OrganizationProfilePage);
