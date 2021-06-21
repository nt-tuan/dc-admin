import { MARKETPLACE_NAME } from "commons/consts";
import { CreateIntroducerForm } from "components/molecules";
import React, { memo } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import * as USER_DUCK from "redux/user/user.duck";
import { getCompanyName } from "utils/config.util";

const CreateIntroducerPage = memo(() => {
  const dispatch = useDispatch();

  if (getCompanyName() !== MARKETPLACE_NAME["8Corners"]) {
    return <Redirect to="/" />;
  }
  const createIntroducer = (addIntroducerData, { onError }) => {
    dispatch({
      type: USER_DUCK.REGISTER_INTRODUCER,
      payload: { values: addIntroducerData, onError }
    });
  };

  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10 mb-3">
      <Helmet title="Create Introducer" />
      <CreateIntroducerForm name="Create Introducer" onSubmitData={createIntroducer} />
    </div>
  );
});

export default CreateIntroducerPage;
