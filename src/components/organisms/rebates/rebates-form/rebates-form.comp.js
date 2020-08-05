import React, { useEffect, Fragment, forwardRef } from "react";
import { Form, Select, Input, Button } from "antd";
import { RegexConst, RouteConst } from "commons/consts";
import { FormError, LoadingIndicator } from "components/atoms";
import { Link } from "react-router-dom";
import { REBATES_SCHEMA } from "commons/schemas";

const { Option } = Select;

const { FIELDS, LABELS } = REBATES_SCHEMA;

export const RebatesForm = forwardRef(
  (
    { title, data = null, companies = [], productBrand = [], onSubmit, loading, isProcessing },
    ref
  ) => {
    const [form] = Form.useForm();

    useEffect(() => {
      data && form.setFieldsValue(data);
    }, [form, data]);

    const handleFinish = (values) => {
      onSubmit(values);
    };

    const renderFormItem = (field) => {
      switch (field) {
        case FIELDS.buyerCompanyName:
          return (
            <Select mode="multiple" disabled={data[FIELDS.buyerCompanyName]}>
              {companies.map((company, index) => (
                <Option value={company.id} key={`${company}-${index}`}>
                  {company.name}
                </Option>
              ))}
            </Select>
          );
        case FIELDS.productBrand:
          return (
            <Select disabled={data[FIELDS.productBrand]}>
              {productBrand.map((brand, index) => (
                <Option value={brand} key={`${brand}-${index}`}>
                  {brand}
                </Option>
              ))}
            </Select>
          );
        case FIELDS.rebatePercentage:
          return <Input />;
        default:
          return null;
      }
    };

    return (
      <Fragment>
        {loading ? (
          <div className="d-flex justify-content-center">
            <LoadingIndicator />
          </div>
        ) : (
          <div>
            <h5>{title}</h5>
            <div>Explanation text</div>
            <Form
              ref={ref}
              name="CreateRebatesForm"
              form={form}
              colon={false}
              hideRequiredMark={true}
              scrollToFirstError={true}
              labelAlign="left"
              className="mt-4"
              onFinish={handleFinish}
            >
              {schema.map(({ name, label, rules }) => (
                <Form.Item
                  name={name}
                  label={label}
                  key={name}
                  rules={rules}
                  labelCol={{ sm: { span: 8 }, md: { span: 8 }, lg: { span: 6 } }}
                >
                  {renderFormItem(name)}
                </Form.Item>
              ))}
              <div className="d-flex justify-content-center mt-4">
                <Link to={RouteConst.REBATES}>
                  <Button type="primary">Cancel</Button>
                </Link>
                <Button type="primary" htmlType="submit" className="ml-2" disabled={isProcessing}>
                  {data[FIELDS.productBrand] ? "Edit" : "Create"}
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Fragment>
    );
  }
);

const schema = [
  {
    name: FIELDS.buyerCompanyName,
    label: LABELS[FIELDS.buyerCompanyName],
    rules: [{ required: true, message: <FormError msg="Buyer company name is required" /> }]
  },
  {
    name: FIELDS.productBrand,
    label: LABELS[FIELDS.productBrand],
    rules: [{ required: true, message: <FormError msg="Product brand is required" /> }]
  },
  {
    name: FIELDS.rebatePercentage,
    label: LABELS[FIELDS.rebatePercentage],
    rules: [
      { required: true, message: <FormError msg="Rebate Percentage is required" /> },
      {
        pattern: RegexConst.NUMBER_WITH_ONLY_2_DECIMAL_POSITIONS,
        message: <FormError msg="Only numberic number greater than 0" />
      }
    ]
  }
];
