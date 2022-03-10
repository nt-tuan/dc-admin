import React, { memo } from "react";
import { Box, Tooltip as MuiTooltip } from "@mui/material";
import { HelpOutline } from "@mui/icons-material";
import { styled } from "@mui/system";
import { withStyles } from "@mui/styles";

const IconToolTip = styled(HelpOutline)({
  color: "#808080",
  fontSize: 22
});

const Tooltip = withStyles({
  tooltip: {
    borderRadius: 4,
    color: "#FFFFFF",
    backgroundColor: "rgba(0, 0, 0, 0.87)"
  }
})(MuiTooltip);

const FieldInput = ({ icon, label, tooltipTitle, ...rest }) => {
  return (
    <Box display="flex" alignItems="center" {...rest}>
      <Box>{icon}</Box>
      <Box>{label}</Box>
      {tooltipTitle && (
        <Box component="span" display="flex" alignItems="center" paddingLeft={1}>
          <Tooltip title={tooltipTitle} arrow placement="right">
            <IconToolTip />
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default memo(FieldInput);
