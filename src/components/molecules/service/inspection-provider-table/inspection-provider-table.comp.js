import React from "react";
import { DTCTable } from "components";
import { inspectionProviderTableSchema } from "commons/schemas";

export const ServiceInspectionProviderTable = ({
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
        schema={inspectionProviderTableSchema({ onLock, onUnlock })}
        renderFooter={renderFooter}
        rowSelection={rowSelection}
      />
    </div>
  );
};
