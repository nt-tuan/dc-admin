export const mapVariantFields = (fields, brand) => {
  let parsedVariants = {};
  if (Array.isArray(fields) && fields.length) {
    fields.forEach(({ name, value }) => (parsedVariants[name] = value));
  }
  parsedVariants["Brand"] = brand;
  return parsedVariants;
};
