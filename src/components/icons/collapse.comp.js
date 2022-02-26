import React from "react";
import { OutLinedIcon } from "components/commons";

function Collapse(props) {
  return (
    <OutLinedIcon {...props} viewBox="0 0 27 24" sx={{ strokeWidth: 0.1 }}>
      <path
        d="M6.39685 12L12.6172 4.05234C12.7133 3.93047 12.6265 3.75 12.4695 3.75H10.6578C10.5429 3.75 10.4328 3.80391 10.3625 3.89297L4.37888 11.5383C4.27526 11.6703 4.21893 11.8333 4.21893 12.0012C4.21893 12.169 4.27526 12.332 4.37888 12.4641L10.3625 20.107C10.4328 20.1984 10.5429 20.25 10.6578 20.25H12.4695C12.6265 20.25 12.7133 20.0695 12.6172 19.9477L6.39685 12ZM13.5219 12L19.7422 4.05234C19.8383 3.93047 19.7515 3.75 19.5945 3.75H17.7828C17.6679 3.75 17.5578 3.80391 17.4875 3.89297L11.5039 11.5383C11.4003 11.6703 11.3439 11.8333 11.3439 12.0012C11.3439 12.169 11.4003 12.332 11.5039 12.4641L17.4875 20.107C17.5578 20.1984 17.6679 20.25 17.7828 20.25H19.5945C19.7515 20.25 19.8383 20.0695 19.7422 19.9477L13.5219 12Z"
        fill="black"
        fillOpacity="0.87"
      />
    </OutLinedIcon>
  );
}

export default Collapse;