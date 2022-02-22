import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

function Wallet(props) {
  return (
    <SvgIcon {...props} stroke="currentColor">
      <path
        fill="none"
        strokeOpacity="0.87"
        strokeWidth="2"
        d="M23 7a2 2 0 00-2-2H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V7zM21 3.071a2 2 0 00-2.472-1.943L2.836 4.938A1.095 1.095 0 002.65 5H21V3.071z"
      ></path>
      <path
        fill="currentColor"
        fillOpacity="0.87"
        d="M22 11V9h-6.236l-1.975.988a4 4 0 01-3.578 0L8.236 9H2v2h5.764l1.553.776a6 6 0 005.366 0L16.236 11H22z"
      ></path>
    </SvgIcon>
  );
}

export default Wallet;
