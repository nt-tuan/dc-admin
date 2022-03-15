import * as yup from "yup";

import { REQUIRED_ERR } from "commons/consts";

export const validationSchema = yup.object({
  typeId: yup.string().required(REQUIRED_ERR("Product Type")),
  categoryId: yup.string().required(REQUIRED_ERR("Product Category")),
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
