import React from "react";
import { SubLayout } from "@/layouts/auth/sub-layout.comp";
import { getMenuData } from "./menu-data";

export const Layout = ({ children }) => {
  return (
    <SubLayout menuData={getMenuData()} header="Profile">
      {children}
    </SubLayout>
  );
};
