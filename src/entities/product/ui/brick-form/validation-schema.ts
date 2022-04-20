import { REQUIRED_ERR } from "@/commons/consts";
import * as yup from "yup";

const validationSchema = yup.object({
  code: yup.string().required(REQUIRED_ERR("Brick Code")),
  title: yup.string().required(REQUIRED_ERR("Brick Name")),
  segmentCode: yup.string().required(REQUIRED_ERR("Parent Segment")),
  familyCode: yup.string().required(REQUIRED_ERR("Parent Family")),
  classCode: yup.string().required(REQUIRED_ERR("Parent Class")),
  hsCode: yup.string().required(REQUIRED_ERR("HS Code"))
});

export default validationSchema;
