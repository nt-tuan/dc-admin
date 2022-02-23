import React from "react";
import { OutLinedIcon } from "components/commons";

function KeyboardUp(props) {
  const { sx, ...others } = props;
  return (
    <OutLinedIcon
      {...others}
      viewBox="0 0 18 18"
      data-testid="ExpandMoreIcon"
      strokeWidth="0.5"
      sx={{ transform: "rotate(180deg)" }}
    >
      <path
        d="M5.5575 6.44238L9 9.87738L12.4425 6.44238L13.5 7.49988L9 11.9999L4.5 7.49988L5.5575 6.44238Z"
        fill="currentColor"
        fillOpacity="0.87"
      />
    </OutLinedIcon>
  );
}

export default KeyboardUp;
