import { Button, Divider, Form, Input } from "antd";
import {
  EMAIL_IS_ALREADY_USED_ERR,
  SERVER_UNKNOWN_ERR,
  USERNAME_ALREADY_USED_ERR
} from "@/commons/consts";

import { APIError } from "@/commons/types";
import { Lagecy } from "@/components/lagecy/lagecy.comp";
import React from "react";
import { USER_SCHEMA } from "./schema";
import { UserService } from "@/services";
import { asyncErrorHandlerWrapper } from "@/utils/error-handler.util";
const MESSAGE_TRANSLATOR = {
  "user.exist.true": USERNAME_ALREADY_USED_ERR,
  "user.email.exist.true": EMAIL_IS_ALREADY_USED_ERR
};

export const AddUserForm = ({ onSuccess, onCancel }) => {
  const [loading, setLoading] = React.useState();
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    asyncErrorHandlerWrapper(async () => {
      try {
        setLoading(true);
        const createdUser = await UserService.addAdminUser(values);
        onSuccess && onSuccess(createdUser);
      } catch (e) {
        if (e instanceof APIError) {
          const { errors } = e;
          form.setFields(
            errors.map(([fieldName, errorMessage]) => ({
              name: fieldName,
              errors: [MESSAGE_TRANSLATOR[errorMessage] ?? SERVER_UNKNOWN_ERR]
            }))
          );
        }
      } finally {
        setLoading(false);
      }
    });
  };
  return (
    <Lagecy>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <div className="container">
          <div className="row">
            {Object.values(USER_SCHEMA).map((item, index) => {
              const { name, label, rules } = item;
              return (
                <Form.Item
                  key={index}
                  name={name}
                  label={label}
                  rules={rules}
                  className="col-12 col-sm-6 col-lg-4 pr-2"
                >
                  <Input size="large" />
                </Form.Item>
              );
            })}
          </div>
        </div>
        <Divider />
        <div className="d-flex justify-content-center flex-wrap">
          <Button loading={loading} type="primary" size="large" ghost htmlType="submit">
            Create
          </Button>
          <Button
            loading={loading}
            type="danger"
            size="large"
            className="ml-1"
            ghost
            onClick={() => onCancel && onCancel()}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Lagecy>
  );
};
