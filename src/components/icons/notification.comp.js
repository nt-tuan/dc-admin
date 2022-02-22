import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

function Notification(props) {
  return (
    <SvgIcon {...props} data-testid="NotificationsIcon">
      <path
        fill="currentColor"
        fillOpacity="0.54"
        d="M8 20c1.1 0 2-.9 2-2H6c0 1.1.9 2 2 2zm6-6V9c0-3.07-1.63-5.64-4.5-6.32V2C9.5 1.17 8.83.5 8 .5S6.5 1.17 6.5 2v.68C3.64 3.36 2 5.92 2 9v5l-2 2v1h16v-1l-2-2zm-2 1H4V9c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"
      ></path>
      <path
        stroke="currentColor"
        strokeOpacity="0.87"
        d="M15.5 16.207v.293H.5v-.293l1.854-1.853.146-.147V9c0-2.905 1.531-5.22 4.116-5.834L7 3.076V2c0-.554.446-1 1-1s1 .446 1 1V3.075l.385.092C11.977 3.78 13.5 6.104 13.5 9v5.207l.146.147 1.854 1.853zM12 15.5h.5V9c0-1.338-.407-2.583-1.184-3.503C10.532 4.57 9.392 4 8 4s-2.532.57-3.316 1.497C3.907 6.417 3.5 7.662 3.5 9v6.5H12zm-2.586 3c-.208.58-.765 1-1.414 1-.649 0-1.206-.42-1.414-1h2.828z"
      ></path>
    </SvgIcon>
  );
}

export default Notification;
