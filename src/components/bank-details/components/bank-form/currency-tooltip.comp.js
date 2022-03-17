import Tooltip from "@mui/material/Tooltip";
import HelpOutline from "@mui/icons-material/HelpOutline";
import IconButton from "@mui/material/IconButton";

export const CurrencyTooltip = () => {
  return (
    <Tooltip title="Currency of your local bank account">
      <IconButton size="small">
        <HelpOutline />
      </IconButton>
    </Tooltip>
  );
};
