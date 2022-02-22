import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
function Product(props) {
  return (
    <SvgIcon {...props}>
      <path
        fillOpacity="0.87"
        fillRule="evenodd"
        d="M2.4 1.596H12c.444 0 .804.36.804.804v2.4H7.2a2.4 2.4 0 00-2.4 2.4v5.604H2.4A.804.804 0 011.596 12V2.4c0-.444.36-.804.804-.804zM4.8 14.4H2.4A2.4 2.4 0 010 12V2.4A2.4 2.4 0 012.4 0H12a2.4 2.4 0 012.4 2.4v2.4h2.4a2.4 2.4 0 012.4 2.4v2.4h2.4A2.4 2.4 0 0124 12v9.6a2.4 2.4 0 01-2.4 2.4H12a2.4 2.4 0 01-2.4-2.4v-2.4H7.2a2.4 2.4 0 01-2.4-2.4v-2.4zm4.8 3.204V12A2.4 2.4 0 0112 9.6h5.604V7.2a.804.804 0 00-.804-.804H7.2a.804.804 0 00-.804.804v9.6c0 .444.36.804.804.804h2.4zm12-6.408H12a.804.804 0 00-.804.804v9.6c0 .444.36.804.804.804h9.6c.444 0 .804-.36.804-.804V12a.804.804 0 00-.804-.804z"
        clipRule="evenodd"
      ></path>
    </SvgIcon>
  );
}

export default Product;
