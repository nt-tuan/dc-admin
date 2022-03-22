import { Box, ListItem, Switch, Typography } from "@mui/material";
import React, { useState } from "react";

import { FeatureFlagService } from "@/services/feature-flag.service";
import { useMessage } from "@/hooks/use-message";

function FeatureItem({ featureFlag }) {
  const [enabled, setEnabled] = useState(featureFlag.enabled);
  const message = useMessage();

  const handleToggle = async (_, isCheck) => {
    const toggleActionSuccess = isCheck ? "enabled" : "disabled";
    const toggleActionFail = isCheck ? "enable" : "disable";
    try {
      await FeatureFlagService.updateFeatureFlag(featureFlag.id, isCheck);
      setEnabled(isCheck);
      message.success(
        `${featureFlag.name} has been successfully ${toggleActionSuccess} in your Marketplace`
      );
    } catch (_err) {
      message.error(
        `${featureFlag.name} has been failed to ${toggleActionFail} in your Marketplace`
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
