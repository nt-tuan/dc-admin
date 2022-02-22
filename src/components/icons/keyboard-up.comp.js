import React from "react";
import { OutLinedIcon } from "components/commons";

function KeyboardUp(props) {
  return (
    <OutLinedIcon {...props} data-testid="ExpandLessIcon">
      <path
        fill="#000"
        fillOpacity="0.87"
        d="M5.558 6.442L9 9.877l3.443-3.435L13.5 7.5 9 12 4.5 7.5l1.058-1.058z"
      ></path>
    </OutLinedIcon>
  );
}

export default KeyboardUp;
