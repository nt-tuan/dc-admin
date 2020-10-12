import { MARKETPLACE_NAME } from "commons/consts";
import React, { memo } from "react";
import { Redirect } from "react-router-dom";

const IntroducerDetailsPage = memo(() => {
  if (process.env.REACT_APP_COMPANY_NAME !== MARKETPLACE_NAME["8Corners"]) {
    return <Redirect to="/" />;
  }
  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      <div>Introducer Details</div>
    </div>
  );
});

export default IntroducerDetailsPage;
