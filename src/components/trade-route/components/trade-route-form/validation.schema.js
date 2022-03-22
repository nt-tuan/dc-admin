import * as yup from "yup";

import { REQUIRED_ERR } from "@/commons/consts";

export const validationSchema = yup.object({
  typeId: yup.string().required(REQUIRED_ERR("Product Type")),
  categoryId: yup.string().required(REQUIRED_ERR("Product Category")),
  fromCountry: yup.string().nullable().required(REQUIRED_ERR("From Country")),
  toCountry: yup.string().nullable().required(REQUIRED_ERR("To Country")),
  mainTax: yup
    .object()
    .default(null)
    .nullable()
    .shape({
      percent: yup.number().required(REQUIRED_ERR("Type of Tax")),
      type: yup.string().required(REQUIRED_ERR("Tax Percentage"))
    }),
  routeDocumentTypeRequests: yup
    .array(
      yup.object({
        routeDocumentRuleDto: yup.object({
          provider: yup.string().required(REQUIRED_ERR("Provider")).nullable(),
          viewer1: yup.string().required(REQUIRED_ERR("Viewer 1")).nullable()
        })
      })
    )
    .required()
});
