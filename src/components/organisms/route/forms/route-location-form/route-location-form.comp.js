import { Form, Select } from "antd";
import countryJson from "assets/country.json";
import React, { useEffect, useState, useRef, forwardRef } from "react";
import { CompanyService, RouteService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";

export const RouteLocationForm = forwardRef(
  (
    { hiddenFields = [], defaultCategoryId, defaultTypeId, onTypeChange, onTouch, onAfterInit },
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
        if (defaultCategoryId === undefined && defaultTypeId === undefined) {
          const categoriesRes = await RouteService.getCategories();
          const typeRes = await RouteService.getTypes(categoriesRes[0].id);

          setCategories(categoriesRes);
          setTypes(typeRes);

          form.setFieldsValue({
            category: categoriesRes[0].id,
            type: typeRes[0] ? typeRes[0].id : undefined
          });
        } else {
          const categoriesRes = await RouteService.getCategories();
          const typeRes = await RouteService.getTypes(defaultCategoryId);

          setCategories(categoriesRes);
          setTypes(typeRes);

          form.setFieldsValue({
            category: defaultCategoryId,
            type: defaultTypeId
          });
        }
        onAfterInit && onAfterInit(false);
      });
    }, [form, defaultCategoryId, defaultTypeId, onAfterInit]);

    useEffect(() => {
      asyncErrorHandlerWrapper(async () => {
        const countriesRes = await CompanyService.getCountries();
        countries.current = countryJson.filter((c) => countriesRes.includes(c.alpha2Code));
        setCountriesFrom(countries.current);
        setCountriesTo(countries.current);
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

    const onFromChange = (countryCode) => {
      setCountriesTo(countries.current.filter((c) => c.alpha2Code !== countryCode));
    };

    const onToChange = (countryCode) => {
      setCountriesFrom(countries.current.filter((c) => c.alpha2Code !== countryCode));
    };

    return (
      <Form
        form={form}
        name="basic"
        hideRequiredMark
        colon={false}
        initialValues={{ remember: true }}
        layout="inline"
        ref={ref}
      >
        {hiddenFields.includes("from") || (
          <Form.Item label="From" name="from" className="mb-2">
            <Select style={{ width: 200 }} onChange={onFromChange}>
              {countriesFrom.map((c) => (
                <Select.Option value={c.alpha2Code} key={c.alpha2Code}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}
        {hiddenFields.includes("to") || (
          <Form.Item label="To" name="to" className="mb-2">
            <Select style={{ width: 200 }} onChange={onToChange}>
              {countriesTo.map((c) => (
                <Select.Option value={c.alpha2Code} key={c.alpha2Code}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Form.Item label="Product Category" name="category" className="mb-2">
          <Select style={{ width: 200 }} onChange={handleCategoryChange}>
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
          className="mb-2"
          rules={[
            {
              required: true,
              message: "Type is required"
            }
          ]}
        >
          <Select style={{ width: 200 }} onChange={handleTypeChange}>
            {types.map((t) => (
              <Select.Option value={t.id} key={t.id}>
                {t.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    );
  }
);
