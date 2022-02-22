import React from "react";
import { OutLinedIcon } from "components/commons";

function Collapse(props) {
  return (
    <OutLinedIcon {...props}>
      <path
        fill="#000"
        fillOpacity="0.87"
        d="M6.397 12l6.22-7.948a.187.187 0 00-.148-.302h-1.811a.379.379 0 00-.295.143l-5.984 7.645a.75.75 0 000 .926l5.984 7.643c.07.091.18.143.295.143h1.812c.156 0 .243-.18.147-.302L6.397 12zm7.125 0l6.22-7.948a.187.187 0 00-.148-.302h-1.811a.379.379 0 00-.296.143l-5.983 7.645a.75.75 0 000 .926l5.984 7.643c.07.091.18.143.295.143h1.811c.157 0 .244-.18.148-.302L13.522 12z"
      ></path>
    </OutLinedIcon>
  );
}

export default Collapse;
