import { useGetter } from "@/hooks/use-getter";
import { useFormikContext } from "formik";
import React from "react";

import { useGetDocuments } from "../../services/use-get-documents";
import { newDocumentRule } from "./mapper";

const getId = (document) => document.id;
export const useDocumentArrayValue = () => {
  const { documentTypes, defaultDocuments } = useGetDocuments();
  const { values, setFieldValue } = useFormikContext();
  const getCurrentDocuments = useGetter(values.routeDocumentTypeRequests ?? []);
  const setDocuments = React.useCallback(
    (nextDocuments) => {
      setFieldValue("routeDocumentTypeRequests", nextDocuments);
    },
    [setFieldValue]
  );
  const removeDocument = React.useCallback(
    (id) => {
      const currentDocuments = getCurrentDocuments();
      const nextDocuments = currentDocuments.filter((item) => item.id !== id);
      setDocuments(nextDocuments);
    },
    [getCurrentDocuments, setDocuments]
  );
  const addDocument = React.useCallback(
    (id, newDocument) => {
      const currentDocuments = getCurrentDocuments();
      const selectedDocumentType = documentTypes.find((item) => item.id === id);
      if (!selectedDocumentType) return;
      const nextDocuments = [
        ...currentDocuments,
        newDocument ?? newDocumentRule(selectedDocumentType)
      ];
      setDocuments(nextDocuments);
    },
    [getCurrentDocuments, setDocuments, documentTypes]
  );
  const addDocumentArray = React.useCallback(
    (documentIds, newDocuments) => {
      if (documentIds == null) return false;
      const currentDocuments = getCurrentDocuments();
      const willSelectedDocuments = documentTypes
        .filter(
          (documentType) =>
            documentIds.includes(documentType.id) &&
            !currentDocuments.some((current) => current.id === documentType.id)
        )
        .map(newDocumentRule)
        .map((document) => {
          if (newDocuments == null) return document;
          for (const newDocument of newDocuments) {
            if (newDocument.id === document.id) {
              return {
                ...newDocument
              };
            }
          }
          return document;
        });
      console.log(willSelectedDocuments, newDocuments);
      setDocuments([...currentDocuments, ...willSelectedDocuments]);
    },
    [getCurrentDocuments, documentTypes, setDocuments]
  );
  const removeDocumentArray = React.useCallback(
    (documentIds) => {
      if (documentIds == null) return;
      const currentDocuments = getCurrentDocuments();
      const defaultDocumentIds = defaultDocuments.map(getId) ?? [];
      const nextDocuments = currentDocuments.filter(
        (document) => defaultDocumentIds.includes(document.id) || !documentIds.includes(document.id)
      );
      setDocuments(nextDocuments);
    },
    [getCurrentDocuments, defaultDocuments, setDocuments]
  );
  const getIsCheckedAll = React.useCallback(
    (documentIds) => {
      if (documentIds == null) return false;
      const currentDocuments = getCurrentDocuments();
      const currentDocumentIds = currentDocuments.map(getId);
      return documentIds.every((id) => currentDocumentIds.includes(id));
    },
    [getCurrentDocuments]
  );

  const getIsIndeterminate = React.useCallback(
    (documentIds) => {
      if (documentIds == null) return false;
      const isCheckedAll = getIsCheckedAll(documentIds);
      if (isCheckedAll) return false;
      const currentDocuments = getCurrentDocuments();
      return currentDocuments.some((document) => documentIds.includes(document.id));
    },
    [getCurrentDocuments, getIsCheckedAll]
  );
  return {
    currentDocuments: values.routeDocumentTypeRequests,
    defaultDocuments,
    removeDocument,
    addDocument,
    addDocumentArray,
    removeDocumentArray,
    getIsCheckedAll,
    getIsIndeterminate
  };
};
