import React from "react";
import { getMenuData } from "./menu-data";
import { ContentLayout } from "./content-layout.comp";

export const MainAuthLayout = ({ children }) => {
  return <ContentLayout menuData={getMenuData()}>{children}</ContentLayout>;
};
