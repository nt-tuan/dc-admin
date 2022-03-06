import React from "react";
import { SubLayout } from "./sub-layout.comp";
import { getMenuPreferencesData } from "@/layouts/auth/menu-data";

export const PreferencesLayout = ({ children }) => {
  return (
    <SubLayout menuData={getMenuPreferencesData()} header="Preferences">
      {children}
    </SubLayout>
  );
};
