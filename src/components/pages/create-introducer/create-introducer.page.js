import { MARKETPLACE_NAME } from "commons/consts";
import { CreateIntroducerForm } from "components/molecules";
import React, { memo } from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";

const CreateIntroducerPage = memo(() => {
  if (process.env.REACT_APP_COMPANY_NAME !== MARKETPLACE_NAME["8Corners"]) {
    return <Redirect to="/" />;
  }
  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10 mb-3">
      <Helmet title="Create Introducer" />
      <CreateIntroducerForm name="Create Introducer" />
    </div>
  );
});

export default CreateIntroducerPage;
