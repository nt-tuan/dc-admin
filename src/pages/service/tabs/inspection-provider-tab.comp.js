import React, { useState, useEffect, Fragment } from "react";
import { ServiceInspectionProviderTable } from "components/widgets/service";
import { SERVICE_SCHEMA } from "commons/schemas";
import NoLogo from "assets/images/no.png";

const { STATUS, STATUS_LABELS } = SERVICE_SCHEMA;

export const ServiceInspectionProviderTab = () => {
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
      <ServiceInspectionProviderTable
        providers={data}
        onUnlock={handleUnlock}
        onLock={handleLock}
      />
    </Fragment>
  );
};

const providers = [
  {
    id: 1,
    name: "Provider 1",
    reputation: 4.5,
    url: NoLogo,
    status: STATUS_LABELS[STATUS.ACTIVE]
  },
  {
    id: 2,
    name: "Provider 2",
    reputation: 4,
    url: NoLogo,
    status: STATUS_LABELS[STATUS.INACTIVE]
  }
];
