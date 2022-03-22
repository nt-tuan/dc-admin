import React from "react";
import { OutLinedIcon } from "@/components/commons";

function TradeRoute(props) {
  return (
    <OutLinedIcon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.87"
        strokeWidth="1.33"
        d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zM8 2v16M16 6v16"
      ></path>
    </OutLinedIcon>
  );
}

export default TradeRoute;
