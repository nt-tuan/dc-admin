import React, { memo, useEffect, useState, useMemo } from "react";
import { Alert, Box, Grid, Snackbar, Typography, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { getOrganizationName, updateOrganizationName } from "services/organization.service";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { styled } from "@mui/system";

const FieldInput = styled(TextField)(() => ({
  ".MuiInputLabel-asterisk": {
    color: "#F44336"
  }
}));

const fieldName = "organization";
const labelText = "Organization Name";

const OrganizationProfilePage = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
    return organizationName.trim().length === 0 || organizationName.trim().length >= 30;
  }, [organizationName]);

  const handleSave = async () => {
    if (loading) {
      return;
    }
    if (isError) {
      setError(true);
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
    setOrganizationName(value);
    setError(false);
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
          <Box
            width={400}
            maxWidth={600}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            Your Organization profile has been saved
            <Box
              component="span"
              fontWeight={600}
              fontSize={13}
              style={{ cursor: "pointer" }}
              onClick={handleCloseAlert}
            >
              Close
            </Box>
          </Box>
        </Alert>
      </Snackbar>

      <Grid container direction="row" justifyContent="space-between" spacing={3}>
        <Grid item xs={12} md={6} lg={5}>
          <Typography variant="h3" fontWeight={700}>
            Organization Profile
          </Typography>
          <Box paddingTop={3}>
            <FieldInput
              label={labelText}
              required
              name={fieldName}
              placeholder={labelText}
              helperText="(30 max characters)"
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
            <LoadingButton loading={loading} onClick={handleSave} type="submit" variant="contained">
              Save
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default memo(OrganizationProfilePage);
