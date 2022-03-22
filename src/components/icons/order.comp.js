import React from "react";
import { OutLinedIcon } from "@/components/commons";

function Order(props) {
  return (
    <OutLinedIcon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.87"
        strokeWidth="1.667"
        d="M10 1.667L1.667 5.833   10 10l8.334-4.167L10 1.666zM1.667 14.166L10 18.334l8.334-4.166"
      ></path>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.87"
        strokeWidth="1.667"
        d="M1.667 10L10 14.167 18.334 10"
      ></path>
    </OutLinedIcon>
  );
}

export default Order;
