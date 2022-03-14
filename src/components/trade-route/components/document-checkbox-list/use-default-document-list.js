import { useFormikContext } from "formik";
import React from "react";

import { useGetDefaultRouteByProduct } from "../../services/use-get-trade-route";
import { parseDocumentInDefaultRoutes } from "./mapper";
import { useDocumentArrayValue } from "./use-document-array-value";

const getId = (document) => document.id;
export const useDefaultDocumentList = () => {
  const {
    defaultDocuments,
    currentDocuments,
    getIsCheckedAll,
    getIsIndeterminate,
    removeDocument,
    addDocument,
    removeDocumentArray,
    addDocumentArray
  } = useDocumentArrayValue();
  const { values } = useFormikContext();
  const { typeId, categoryId } = values;
  const { data, isLoading } = useGetDefaultRouteByProduct({ typeId, categoryId });
  const documentTypes = React.useMemo(
    () => data?.routeDocumentTypeResponses?.map(parseDocumentInDefaultRoutes) ?? [],
    [data]
  );
  const documentTypeIds = React.useMemo(() => documentTypes.map(getId), [documentTypes]);
  React.useEffect(() => {
    if (documentTypeIds && documentTypeIds.length > 0) {
      console.log(documentTypes);
      addDocumentArray(documentTypeIds, documentTypes);
    }
  }, [addDocumentArray, documentTypes, documentTypeIds]);
  const isCheckedAll = getIsCheckedAll(documentTypeIds);
  const isIndeterminate = getIsIndeterminate(documentTypeIds);
  const onCheckAll = () => {
    if (isCheckedAll) {
      removeDocumentArray(documentTypeIds);
      return;
    }
    addDocumentArray(documentTypeIds, documentTypes);
  };
  const onCheckboxClick = (e, id) => {
    const isChecked = e.target.checked;
    if (!isChecked) {
      removeDocument(id);
      return;
    }
    const selectedDocument = documentTypes.find((document) => document.id === id);
    addDocument(id, selectedDocument);
  };

  return {
    currentDocuments,
    defaultDocuments,
    documentTypes,
    isLoading,
    isCheckedAll,
    isIndeterminate,
    onCheckAll,
    onCheckboxClick
  };
};
