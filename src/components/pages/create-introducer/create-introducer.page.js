import { MARKETPLACE_NAME } from "commons/consts";
import { CreateIntroducerForm } from "components/molecules";
import React, { memo } from "react";
import { Redirect } from "react-router-dom";
import { IntroducerService } from "services";

const CreateIntroducerPage = memo(() => {
  if (process.env.REACT_APP_COMPANY_NAME !== MARKETPLACE_NAME["8Corners"]) {
    return <Redirect to="/" />;
  }
  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10 mb-3">
      <CreateIntroducerForm
        name="Create Introducer"
        submitServiceFn={IntroducerService.addIntroducer}
      />
    </div>
  );
});

export default CreateIntroducerPage;
