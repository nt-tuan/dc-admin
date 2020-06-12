import { areObjectValuesUndefined } from "utils";

export const parseKYC3FormData = (formRefArr) => {
  let hasError = false;
  let composedValues = [];

  formRefArr.forEach(({ props }) => {
    const { form } = props;
    form.validateFieldsAndScroll((error, values) => {
      if (error) {
        hasError = true;
      } else {
        if (areObjectValuesUndefined(values) === false) {
          composedValues = [...composedValues, { ...values }];
        }
      }
    });
  });
  return [hasError, composedValues];
};

export const parseDocumentsFromServer = (documents) => {
  if (!documents || !documents.length) {
    return {};
  }

  let parsedDocuments = {};
  documents.forEach(({ type, url, id }) => {
    const indexOfLastUnderscore = type.lastIndexOf("_");
    const docType = type.substring(0, indexOfLastUnderscore);
    const imgType = type.substring(indexOfLastUnderscore + 1);
    parsedDocuments = {
      ...parsedDocuments,
      [docType]: {
        ...parsedDocuments[docType],
        [imgType]: {
          file: url,
          type,
          id
        }
      }
    };
  });
  return parsedDocuments;
};
