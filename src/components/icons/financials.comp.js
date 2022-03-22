import React from "react";
import { OutLinedIcon } from "@/components/commons";

function Financials(props) {
  return (
    <OutLinedIcon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.87"
        strokeWidth="1.667"
        d="M23 6l-9.5 9.5-5-5L1 18"
      ></path>
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.87"
        strokeWidth="1.667"
        d="M17 6h6v6"
      ></path>
    </OutLinedIcon>
  );
}

export default Financials;
