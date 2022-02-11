import { Box, ListItem, Switch, Typography } from "@mui/material";
import React, { useState } from "react";

import { FeatureFlagService } from "services/feature-flag.service";
import { useSnackbar } from "notistack";

function FeatureItem({ featureFlag }) {
  const [enabled, setEnabled] = useState(featureFlag.enabled);
  const { enqueueSnackbar } = useSnackbar();

  const handleToggle = async (_, isCheck) => {
    const toggleActionSuccess = isCheck ? "enabled" : "disabled";
    const toggleActionFail = isCheck ? "enable" : "disable";
    try {
      await FeatureFlagService.updateFeatureFlag(featureFlag.id, isCheck);
      setEnabled(isCheck);
      enqueueSnackbar(
        `${featureFlag.name} has been successfully ${toggleActionSuccess} in your Marketplace`,
        {
          variant: "success"
        }
      );
    } catch (_err) {
      enqueueSnackbar(
        `${featureFlag.name} has been failed to ${toggleActionFail} in your Marketplace`,
        {
          variant: "error"
        }
      );
    }
  };

  return (
    <ListItem>
      <Box>
        <Typography variant="h6" mb={1}>
          {featureFlag.name}
        </Typography>
        <Typography variant="body2">{featureFlag.description}</Typography>
      </Box>
      <Box>
        <Switch size="medium" onChange={handleToggle} checked={enabled} />
      </Box>
    </ListItem>
  );
}

export default FeatureItem;
