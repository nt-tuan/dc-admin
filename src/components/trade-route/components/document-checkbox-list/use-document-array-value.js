import { useGetter } from "@/hooks/use-getter";
import { useFormikContext } from "formik";
import React from "react";

import { useGetDocuments } from "../../services/use-get-documents";
import { newDocumentRule } from "./mapper";

const getId = (document) => document.id;
const removeItems = (array, itemIds, readonlyItems) => {
  if (itemIds == null) return;
  const defaultDocumentIds = readonlyItems.map(getId) ?? [];
  const nextDocuments = array.filter(
    (document) => defaultDocumentIds.includes(document.id) || !itemIds.includes(document.id)
  );
  return nextDocuments;
};
const addItems = (documentTypes, array, itemIds, newItems) => {
  if (itemIds == null) return false;
  const willSelectedItems = documentTypes
    .filter(
      (documentType) =>
        itemIds.includes(documentType.id) &&
        !array.some((current) => current.id === documentType.id)
    )
    .map(newDocumentRule)
    .map((document) => {
      if (newItems == null) return document;
      for (const newDocument of newItems) {
        if (newDocument.id === document.id) {
          return {
            ...newDocument
          };
        }
      }
      return document;
    });
  return [...array, ...willSelectedItems];
};
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
      const currentDocuments = getCurrentDocuments();
      setDocuments(addItems(documentTypes, currentDocuments, documentIds, newDocuments));
    },
    [getCurrentDocuments, documentTypes, setDocuments]
  );
  const removeThenAddArray = React.useCallback(
    (deletedIds, addedIds, newDocuments) => {
      const currentDocuments = getCurrentDocuments();
      let nextDocuments = removeItems(currentDocuments, deletedIds, defaultDocuments);
      nextDocuments = addItems(documentTypes, nextDocuments, addedIds, newDocuments);
      setDocuments(nextDocuments);
    },
    [getCurrentDocuments, defaultDocuments, documentTypes, setDocuments]
  );
  const removeDocumentArray = React.useCallback(
    (documentIds) => {
      const currentDocuments = getCurrentDocuments();
      setDocuments(removeItems(currentDocuments, documentIds, defaultDocuments));
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
    removeThenAddArray,
    getIsCheckedAll,
    getIsIndeterminate
  };
};
