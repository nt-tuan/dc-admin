import React from "react";
import { DTCTable } from "components";
import { SERVICE_SCHEMA, getInspectionProviderTableSchema } from "commons/schemas";

const { FIELDS } = SERVICE_SCHEMA;

const columns = (params) => {
  const columns = getInspectionProviderTableSchema(params);
  return [columns[FIELDS.name], columns[FIELDS.reputation], columns[FIELDS.status], columns.manage];
};

export const ServiceInspectionProviderTable = ({ providers, onLock, onUnlock }) => {
  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      <DTCTable
        showSettings={false}
        isLoading={false}
        data={providers}
        columns={columns({ onLock, onUnlock })}
      />
    </div>
  );
};
