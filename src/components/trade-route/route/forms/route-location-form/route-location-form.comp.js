import { CompanyService, RouteService } from "services";
import { Form, Select } from "antd";
import React, { forwardRef, useEffect, useRef, useState } from "react";

import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import countryJson from "assets/country.json";
import { getLagecyModalContainer } from "components/lagecy/lagecy.comp";

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
    const [form] = Form.useForm();
    const countries = useRef([]);

    useEffect(() => {
      asyncErrorHandlerWrapper(async () => {
        if (defaultCategoryId != null) {
          const typeResponse = await RouteService.getTypes(defaultCategoryId);
          setTypes(typeResponse);
          isEdit &&
            form.setFieldsValue({
              category: defaultCategoryId,
              type: defaultTypeId
            });
        }
        onAfterInit && onAfterInit(false);
      });
    }, [form, defaultCategoryId, defaultTypeId, onAfterInit, isEdit]);

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

    const handleCategoryChange = (id) => {
      asyncErrorHandlerWrapper(async () => {
        const typeRes = await RouteService.getTypes(id);
        setTypes(typeRes);

        if (typeRes[0]) {
          form.setFieldsValue({
            type: typeRes[0].id
          });
          onTypeChange && onTypeChange({ categoryId: id, typeId: typeRes[0].id });
        } else {
          form.setFieldsValue({
            type: undefined
          });
        }
        onTouch && onTouch(true);
      });
    };

    const handleTypeChange = (typeId) => {
      const categoryId = form.getFieldValue("category");
      onTypeChange && onTypeChange({ categoryId, typeId });
      onTouch && onTouch(true);
    };

    return (
      <Form
        form={form}
        name="basic"
        colon={false}
        layout="vertical"
        initialValues={{
          remember: true,
          from: defaultFromCountry,
          to: defaultToCountry,
          category: defaultCategoryId,
          type: defaultTypeId
        }}
        ref={ref}
      >
        <div className="row px-2 w-100">
          {hiddenFields.includes("from") || (
            <Form.Item
              label="From"
              name="from"
              className="col-12 col-lg-6 mx-0 mt-2"
              rules={[{ required: true, message: "Please input From Country" }]}
            >
              <Select
                getPopupContainer={getLagecyModalContainer}
                disabled={isEdit}
                style={{ width: "100%" }}
              >
                {countriesFrom.map((c) => (
                  <Select.Option value={c.alpha2Code} key={c.alpha2Code}>
                    {c.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {hiddenFields.includes("to") || (
            <Form.Item
              label="To"
              name="to"
              className="col-12 col-lg-6 mx-0 mt-2"
              rules={[{ required: true, message: "Please input To Country" }]}
            >
              <Select
                getPopupContainer={getLagecyModalContainer}
                disabled={isEdit}
                style={{ width: "100%" }}
              >
                {countriesTo.map((c) => (
                  <Select.Option value={c.alpha2Code} key={c.alpha2Code}>
                    {c.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </div>
        <div className="row px-2 w-100">
          <Form.Item
            label="Product Category"
            name="category"
            className="col-12 col-lg-6 mx-0 mt-2"
            rules={[
              {
                required: true,
                message: "Category is required"
              }
            ]}
          >
            <Select
              getPopupContainer={getLagecyModalContainer}
              disabled={isEdit}
              style={{ width: "100%" }}
              onChange={handleCategoryChange}
            >
              {categories.map((c) => (
                <Select.Option value={c.id} key={c.id}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Product Type"
            name="type"
            className="col-12 col-lg-6 mx-0 mt-2"
            rules={[
              {
                required: true,
                message: "Product type is required"
              }
            ]}
          >
            <Select
              getPopupContainer={getLagecyModalContainer}
              disabled={isEdit}
              style={{ width: "100%" }}
              onChange={handleTypeChange}
            >
              {types.map((t) => (
                <Select.Option value={t.id} key={t.id}>
                  {t.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </Form>
    );
  }
);