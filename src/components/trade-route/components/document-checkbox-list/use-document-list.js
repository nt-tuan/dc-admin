import { useDocumentArrayValue } from "./use-document-array-value";

export const useDocumentCheckboxList = (documentTypes) => {
  const {
    defaultDocuments,
    currentDocuments,
    addDocument,
    removeDocument,
    getIsCheckedAll,
    getIsIndeterminate,
    addDocumentArray,
    removeDocumentArray
  } = useDocumentArrayValue();
  const onCheckboxClick = (e, id) => {
    const isChecked = e.target.checked;
    if (!isChecked) {
      removeDocument(id);
      return;
    }
    addDocument(id);
  };
  const documentTypeIds = documentTypes.map((documentType) => documentType.id);
  const isCheckedAll = getIsCheckedAll(documentTypeIds);
  const isIndeterminate = getIsIndeterminate(documentTypeIds);
  const onCheckAll = () => {
    if (isCheckedAll) {
      removeDocumentArray(documentTypeIds);
      return;
    }
    addDocumentArray(documentTypeIds);
  };

  return {
    currentDocuments,
    defaultDocuments: defaultDocuments ?? [],
    isCheckedAll,
    isIndeterminate,
    onCheckAll,
    onCheckboxClick
  };
};
