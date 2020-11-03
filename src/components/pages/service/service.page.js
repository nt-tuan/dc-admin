import React, { memo } from "react";
import { ServicePageContainer } from "components";
import { ServiceLogisticProviderTab } from "./tabs/logistic-provider-tab.comp";
import { ServiceInspectionProviderTab } from "./tabs/inspection-provider-tab.comp";

export const ServicePage = () => {
  const renderLogisticProvider = () => <ServiceLogisticProviderTab />;
  const renderInspectionProvider = () => <ServiceInspectionProviderTab />;

  return (
    <ServicePageContainer
      title="Services"
      renderLogisticProvider={renderLogisticProvider}
      renderInspectionProvider={renderInspectionProvider}
    />
  );
};

export default memo(ServicePage);
