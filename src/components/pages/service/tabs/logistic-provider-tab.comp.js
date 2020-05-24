import React, { useState, useEffect, Fragment } from "react";
import { ServiceLogisticProviderTable } from "components/molecules/service";
import { SERVICE_SCHEMA } from "commons/schemas";
import AramexLogo from "assets/images/aramex-logo.png";
import DHLLogo from "assets/images/dhl-logo.jpg";

const { STATUS, STATUS_LABELS } = SERVICE_SCHEMA;

export const ServiceLogisticProviderTab = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(providers.sort((a, b) => a.id - b.id));
  }, []);

  const handleLock = (id) => {
    const item = data.find((item) => item.id === id);
    const itemAfterRemove = [...data].filter((item) => item.id !== id);
    const res = [{ ...item, status: STATUS_LABELS[STATUS.INACTIVE] }, ...itemAfterRemove].sort(
      (a, b) => a.id - b.id
    );
    setData(res);
  };

  const handleUnlock = (id) => {
    const item = data.find((item) => item.id === id);
    const itemAfterRemove = [...data].filter((item) => item.id !== id);
    const res = [{ ...item, status: STATUS_LABELS[STATUS.ACTIVE] }, ...itemAfterRemove].sort(
      (a, b) => a.id - b.id
    );
    setData(res);
  };

  return (
    <Fragment>
      <ServiceLogisticProviderTable providers={data} onUnlock={handleUnlock} onLock={handleLock} />
    </Fragment>
  );
};

const providers = [
  {
    id: 1,
    name: "DHL",
    url: DHLLogo,
    reputation: 4.5,
    status: STATUS_LABELS[STATUS.ACTIVE]
  },
  {
    id: 2,
    name: "Aremex",
    url: AramexLogo,
    reputation: 4.5,
    status: STATUS_LABELS[STATUS.INACTIVE]
  }
];
