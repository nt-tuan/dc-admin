const routeDocumentRuleDtoKeys = ["provider", "viewer1", "viewer2", "viewer3"];

const isNotDefaultDocumentFn = (defaultDocuments) => (id) =>
  defaultDocuments.every((document) => document.id !== id);

export const parseTradeRouteForm = (values) => {
  const routeDocumentTypeRequests = values.routeDocumentTypeRequests.map(
    ({ id, routeDocumentRuleDto }) => {
      const entries = Object.entries(routeDocumentRuleDto);
      const composedRouteDocumentRuleDto = {};
      entries.forEach(([key, value]) => {
        if (routeDocumentRuleDto[key] && routeDocumentRuleDtoKeys.includes(key)) {
          composedRouteDocumentRuleDto[key] = value;
        }
      });
      return {
        id,
        routeDocumentRuleDto: composedRouteDocumentRuleDto
      };
    }
  );

  const routeTaxPostRequestList = [];
  if (values.mainTax) {
    const mainTax = values.mainTax;
    routeTaxPostRequestList.push({
      applyType: "MAIN",
      type: mainTax.type,
      percent: mainTax.percent,
      name: mainTax.name
    });
  }
  const { fromCountry, toCountry, categoryId, typeId, isDefault } = values;
  return {
    isDefault,
    fromCountry,
    toCountry,
    categoryId,
    typeId,
    routeDocumentTypeRequests,
    routeTaxPostRequestList
  };
};

const getMainTax = (taxDetailResponseList) => {
  const mainTaxItem = taxDetailResponseList?.find((taxItem) => taxItem.applyType === "MAIN");
  if (!mainTaxItem) return null;
  return {
    taxApplied: mainTaxItem.applyType,
    type: mainTaxItem.type,
    percent: mainTaxItem.percent,
    name: mainTaxItem.name,
    id: mainTaxItem.id
  };
};
export const parseDefaultDocuments = (defaultDocuments) => {
  return defaultDocuments.map(({ routeDocumentRuleDto, id, name }) => {
    const { provider, viewer1, viewer2, viewer3 } = routeDocumentRuleDto;
    return {
      id,
      name,
      disabled: true,
      routeDocumentRuleDto: {
        provider,
        viewer1,
        viewer2,
        viewer3
      }
    };
  });
};
export const parseTradeRouteResponseToFormValues = (values, defaultDocuments) => {
  if (!values || !defaultDocuments) return {};
  const {
    id,
    categoryId,
    typeId,
    fromCountry,
    toCountry,
    isDefault,
    routeDocumentTypeResponses,
    taxDetailResponseList
  } = values;

  const mainTax = getMainTax(taxDetailResponseList);
  const isDefaultDocument = isNotDefaultDocumentFn(defaultDocuments);
  const routeDocumentTypeRequests = [
    ...parseDefaultDocuments(defaultDocuments),
    ...routeDocumentTypeResponses.filter(({ id: currentId }) => isDefaultDocument(currentId))
  ];

  return {
    id,
    categoryId,
    typeId,
    fromCountry,
    toCountry,
    isDefault,
    routeDocumentTypeRequests,
    mainTax
  };
};
