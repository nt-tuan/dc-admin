import { useProductCategory, useProductTypes } from "../services/use-product-types";

import { AutocompleteField } from "@/components/commons/fields";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import { useFormikContext } from "formik";

export const ProductTypeSelectField = ({
  categoryFieldName = "categoryId",
  typeFieldName = "typeId"
}) => {
  const { values } = useFormikContext();
  const categoryId = values[categoryFieldName];
  const { data: categories, isLoading: isCategoriesLoading } = useProductCategory();
  const { data: types, isLoading: isTypesLoading } = useProductTypes(categoryId);

  const categoryDataSource = React.useMemo(() => {
    if (categories == null) return [];
    return categories.map((c) => ({ label: c.name, value: c.id }));
  }, [categories]);
  const typeDataSource = React.useMemo(() => {
    if (types == null) return [];
    return types.map((type) => ({ label: type.name, value: type.id }));
  }, [types]);

  return (
    <Box>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <AutocompleteField
            fullWidth
            name={categoryFieldName}
            loading={isCategoriesLoading}
            label="Product Category"
            placeholder="Product Category"
            dataSource={categoryDataSource}
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <AutocompleteField
            fullWidth
            name={typeFieldName}
            disabled={typeDataSource.length === 0}
            loading={isTypesLoading}
            label="Product Type"
            placeholder="Product Type"
            dataSource={typeDataSource}
            required
          />
        </Grid>
      </Grid>
    </Box>
  );
};
