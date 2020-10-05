import { CreateIntroducerForm } from "components/molecules";
import React, { memo } from "react";

const CreateIntroducerPage = memo(() => {
  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10 mb-3">
      <CreateIntroducerForm name="Create Introducer" />
    </div>
  );
});

export default CreateIntroducerPage;
