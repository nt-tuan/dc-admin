import { FeatureToggles } from "components/organisms/feature-toggles";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FeatureFlagService } from "services/feature-flag.service";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";

const FeatureTogglesPage = () => {
  const [featureFlags, setFeatureFlags] = useState([]);

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const resFeatureFlags = await FeatureFlagService.getAllFeatureFlags();
      setFeatureFlags(resFeatureFlags);
    });
  }, []);

  return (
    <article>
      <Helmet title="Feature Toggle" />
      <FeatureToggles featureFlags={featureFlags} />
    </article>
  );
};

export default FeatureTogglesPage;