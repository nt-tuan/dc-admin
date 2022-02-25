import React from "react";
import { OutLinedIcon } from "components/commons";

function Setting(props) {
  return (
    <OutLinedIcon {...props}>
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.87"
        strokeWidth="1.33"
        d="M12.25 5.25a.833.833 0 000 1.167l1.334 1.333a.833.833 0 001.166 0l3.142-3.142a5 5 0 01-6.617 6.617l-5.758 5.758a1.767 1.767 0 11-2.5-2.5l5.758-5.758a5 5 0 016.617-6.617l-3.133 3.134-.009.008z"
      ></path>
    </OutLinedIcon>
  );
}

export default Setting;
