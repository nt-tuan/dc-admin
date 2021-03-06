import React from "react";
import { SvgIcon } from "@mui/material";

function Preferences(props) {
  return (
    <SvgIcon {...props}>
      <path
        fill="#000"
        fillOpacity="0.87"
        fillRule="evenodd"
        d="M10.73 4.173a3.335 3.335 0 00-6.46 0 .842.842 0 00-.103-.006h-2.5a.833.833 0 100 1.666h2.5c.035 0 .07-.002.103-.006a3.335 3.335 0 006.46 0 .843.843 0 00.103.006h7.5a.833.833 0 100-1.666h-7.5a.843.843 0 00-.103.006zM5.833 5a1.667 1.667 0 113.334 0 1.667 1.667 0 01-3.334 0zm3.334 9.167a.84.84 0 01.103.006 3.335 3.335 0 016.46 0 .84.84 0 01.103-.006h2.5a.833.833 0 010 1.666h-2.5a.84.84 0 01-.103-.006 3.335 3.335 0 01-6.46 0 .84.84 0 01-.103.006h-7.5a.833.833 0 010-1.666h7.5zm5 .833a1.667 1.667 0 11-3.334 0 1.667 1.667 0 013.334 0z"
        clipRule="evenodd"
      ></path>
    </SvgIcon>
  );
}

export default Preferences;
