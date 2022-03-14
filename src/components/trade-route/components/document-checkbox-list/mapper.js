export const newDocumentRule = (documentType) => {
  return {
    name: documentType.name,
    id: documentType.id,
    routeDocumentRuleDto: {
      provider: "",
      viewer1: "",
      viewer2: "",
      viewer3: ""
    }
  };
};

export const parseDocument = (documents, documentTypes) => {
  return documents
    .filter((item) => documentTypes.some((doc) => doc.id === item.id))
    .map((item) => ({
      name: item.name,
      id: item.id,
      routeDocumentRuleDto: {
        provider: item.routeDocumentRuleDto.provider,
        viewer1: item.routeDocumentRuleDto.viewer1,
        viewer2: item.routeDocumentRuleDto.viewer2,
        viewer3: item.routeDocumentRuleDto.viewer3
      }
    }));
};

export const parseDocumentInDefaultRoutes = ({ id, name, routeDocumentRuleDto }) => {
  const { provider, viewer1, viewer2, viewer3 } = routeDocumentRuleDto || {};
  return {
    id,
    name,
    routeDocumentRuleDto: {
      provider,
      viewer1,
      viewer2,
      viewer3
    }
  };
};
