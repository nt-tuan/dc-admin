import { REQUIRED_ERR } from "@/commons/consts";
import * as yup from "yup";

const validationSchema = yup.object({
  code: yup.string().required(REQUIRED_ERR("Attribute Code")),
  title: yup.string().required(REQUIRED_ERR("Attribute Name"))
});
export default validationSchema;
