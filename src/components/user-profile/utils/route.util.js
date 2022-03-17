import { RoutePathEnum } from "../constants/route-paths.const";

export const getUpdatePersonalInformationPath = () => {
  return `${RoutePathEnum.PERSIONAL_INFORMATION}?mode=edit`;
};
