import { REQUIRED_ERR } from "@/commons/consts";
import * as yup from "yup";

export const classSchema = yup.object({
  title: yup.string().required(REQUIRED_ERR("Class Name")),
  familyCode: yup.string().required(REQUIRED_ERR("Parent Family"))
});

export const familySchema = yup.object({
  title: yup.string().required(REQUIRED_ERR("Family Name")),
  segmentCode: yup.string().required(REQUIRED_ERR("Parent Segment"))
});

export const segmentSchema = yup.object({
  title: yup.string().required(REQUIRED_ERR("Segment Name"))
});
