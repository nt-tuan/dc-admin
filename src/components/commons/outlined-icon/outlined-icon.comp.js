import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

export function OutLinedIcon({ sx, color, ...other }) {
  return <SvgIcon {...other} stroke="currentColor" sx={{ ...sx, fill: "none", stroke: color }} />;
}
