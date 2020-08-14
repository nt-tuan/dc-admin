import { pdf } from "@react-pdf/renderer";
import { Button } from "antd";
import React, { useState } from "react";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";

export const ExportPDFButton = ({ docComp, fileName }) => {
  const [isPdfReady, setIsPdfReady] = useState(false);

  const handleDownload = () => {
    setIsPdfReady(true);
    asyncErrorHandlerWrapper(async () => {
      const blob = await pdf(docComp).toBlob();
      const link = document.createElement("a");
      link.download = fileName;
      link.href = window.URL.createObjectURL(blob);
      link.click();
      link.remove();
      setIsPdfReady(false);
    });
  };
  return (
    <div>
      <Button type="primary" onClick={handleDownload} loading={isPdfReady} style={{ width: 47 }}>
        {isPdfReady === false && <i className="fe fe-download" />}
      </Button>
    </div>
  );
};
