import * as yup from "yup";

import { REQUIRED_ERR } from "@/commons/consts";

export const validationSchema = yup.object({
  firstName: yup.string().required(REQUIRED_ERR("First Name")),
  lastName: yup.string().required(REQUIRED_ERR("First Name")),
  phone: yup.string().required(REQUIRED_ERR("Phone"))
});
