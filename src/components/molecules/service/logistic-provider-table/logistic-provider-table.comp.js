import React from "react";
import { DTCTable } from "components";
import { logisticProviderTableSchema } from "commons/schemas";

export const ServiceLogisticProviderTable = ({
  providers,
  onLock,
  onUnlock,
  rowSelection,
  renderFooter,
  loading
}) => {
  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      <DTCTable
        showSettings={false}
        loading={loading}
        hiddenColumns={[]}
        dataSource={providers}
        schema={logisticProviderTableSchema({ onLock, onUnlock })}
        renderFooter={renderFooter}
        rowSelection={rowSelection}
      />
    </div>
  );
};
