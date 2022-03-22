import React from "react";
import { OutLinedIcon } from "@/components/commons";

function Account(props) {
  return (
    <OutLinedIcon {...props} data-testid="AccountIcon">
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.87"
        strokeWidth="1.5"
        d="M13.875 15H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
      ></path>
      <path
        fill="#000"
        fillOpacity="0.87"
        d="M19.5 22.5s3.75-1.95 3.75-4.875v-3.412L19.5 12.75l-3.75 1.463v3.412c0 2.925 3.75 4.875 3.75 4.875z"
      ></path>
    </OutLinedIcon>
  );
}

export default Account;
