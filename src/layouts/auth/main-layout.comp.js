import Container from "@mui/material/Container";
import { ContentLayout } from "./content-layout.comp";
import React from "react";
import { getMenuData } from "./menu-data";

export const MainAuthLayout = ({ children }) => {
  return (
    <ContentLayout menuData={getMenuData()}>
      <Container sx={{ pt: 3 }} maxWidth={false}>
        {children}
      </Container>
    </ContentLayout>
  );
};
