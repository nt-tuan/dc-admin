import { ContentLayout } from "./content-layout.comp";
import React from "react";
import { getMenuData } from "./menu-data";

export const MainAuthLayout = ({ children }) => {
  return <ContentLayout menuData={getMenuData()}>{children}</ContentLayout>;
};
