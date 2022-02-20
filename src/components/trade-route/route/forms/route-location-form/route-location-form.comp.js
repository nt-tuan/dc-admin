import { Formik, Form } from "formik";
import countryJson from "assets/country.json";
import React, { useEffect, useState, useRef, forwardRef } from "react";
import { CompanyService, RouteService } from "services";

import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { SelectField } from "components/commons/fields";

import * as yup from "yup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
export const RouteLocationForm = forwardRef(
  (
    {
      hiddenFields = [],
      defaultFromCountry,
      defaultToCountry,
      defaultCategoryId,
      defaultTypeId,
      onTypeChange,
      onTouch,
      onAfterInit,
      isEdit = false
    },
    ref
  ) => {
    const [countriesFrom, setCountriesFrom] = useState([]);
    const [countriesTo, setCountriesTo] = useState([]);
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const countries = useRef([]);

    useEffect(() => {
      asyncErrorHandlerWrapper(async () => {
        if (defaultCategoryId != null) {
          const typeResponse = await RouteService.getTypes(defaultCategoryId);
          setTypes(typeResponse);
        }
        onAfterInit && onAfterInit(false);
      });
    }, [defaultCategoryId, defaultTypeId, onAfterInit, isEdit]);

    useEffect(() => {
      asyncErrorHandlerWrapper(async () => {
        const countriesRes = await CompanyService.getCountries();
        countries.current = countryJson.filter((c) => countriesRes.includes(c.alpha2Code));
        setCountriesFrom(countries.current);
        setCountriesTo(countries.current);
        const categoriesRes = await RouteService.getCategories();
        setCategories(categoriesRes);
      });
    }, []);

    const handleCategoryChange = (event) => {
      const id = event.target.value;
      asyncErrorHandlerWrapper(async () => {
        const typeRes = await RouteService.getTypes(id);
        setTypes(typeRes);

        if (typeRes[0]) {
          onTypeChange && onTypeChange({ categoryId: id, typeId: typeRes[0].id });
        }
        onTouch && onTouch(true);
      });
    };

    const handleTypeChange = (event) => {
      const typeId = event.target.value;
      const categoryId = ref.current.values.category;
      onTypeChange && onTypeChange({ categoryId, typeId });
      onTouch && onTouch(true);
    };

    const validationSchema = yup.object({
      from: yup.string("Enter From").nullable().required("From is required"),
      to: yup.string("Enter To").nullable().required("To is required"),
      category: yup.string("Enter Category").nullable().required("Category is required"),
      type: yup.string("Enter Product Type").nullable().required("Product Type is required")
    });

    const material = () => {
      return (
        <Formik
          initialValues={{
            remember: true,
            from: defaultFromCountry,
            to: defaultToCountry,
            category: defaultCategoryId,
            type: defaultTypeId
          }}
          validationSchema={validationSchema}
          innerRef={ref}
          onSubmit={() => console.log("submmited")}
        >
          <Form>
            <Box>
              <Grid container columnSpacing={1} rowSpacing={2}>
                <Grid item xs={12} md={6} lg={6}>
                  <SelectField
                    fullWidth
                    disabled={isEdit}
                    name={"from"}
                    label={"From"}
                    placeholder="From"
                    dataSource={countriesFrom.map((c) => ({ label: c.name, value: c.alpha2Code }))}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <SelectField
                    fullWidth
                    disabled={isEdit}
                    name={"to"}
                    label={"To"}
                    placeholder="To"
                    dataSource={countriesTo.map((c) => ({ label: c.name, value: c.alpha2Code }))}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <SelectField
                    fullWidth
                    disabled={isEdit}
                    name={"category"}
                    onChangeValue={handleCategoryChange}
                    label={"Product Category"}
                    placeholder="Product Category"
                    dataSource={categories.map((c) => ({ label: c.name, value: c.id }))}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <SelectField
                    fullWidth
                    disabled={isEdit}
                    name={"type"}
                    onChangeValue={handleTypeChange}
                    label={"Product Type"}
                    placeholder="Product Type"
                    dataSource={types.map((c) => ({ label: c.name, value: c.id }))}
                    required
                  />
                </Grid>
              </Grid>
            </Box>
          </Form>
        </Formik>
      );
    };

    return material();
  }
);
