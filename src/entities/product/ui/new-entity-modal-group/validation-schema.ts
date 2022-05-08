import { REQUIRED_ERR } from "@/commons/consts";
import * as yup from "yup";

export const newSegmentValidation = yup.object({
  code: yup.string().required(REQUIRED_ERR("Segment Code")),
  title: yup.string().required(REQUIRED_ERR("Segment Name"))
});

export const newFamilyValidation = yup.object({
  code: yup.string().required(REQUIRED_ERR("Family Code")),
  title: yup.string().required(REQUIRED_ERR("Family Name")),
  segmentCode: yup.string().required(REQUIRED_ERR("Parent Segment"))
});

export const newClassValidation = yup.object({
  code: yup.string().required(REQUIRED_ERR("Class Code")),
  title: yup.string().required(REQUIRED_ERR("Class Name")),
  segmentCode: yup.string().required(REQUIRED_ERR("Parent Family"))
});
