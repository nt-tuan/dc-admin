import React from "react";
import { Button, Form, Input, Divider } from "antd";
import { UserService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { USER_SCHEMA } from "./schema";

const EDIT_USER_SCHEMA = [USER_SCHEMA.firstName, USER_SCHEMA.lastName];

export const EditUserForm = ({ onSuccess, onCancel, user }) => {
  const [loading, setLoading] = React.useState();
  const handleSubmit = (values) => {
    asyncErrorHandlerWrapper(async () => {
      setLoading(true);
      await UserService.editAdminUser(user.id, values);
      onSuccess && onSuccess(values);
    }).finally(() => setLoading());
  };
  return (
    <Form onFinish={handleSubmit} layout="vertical">
      <div className="container">
        <div className="row">
          {EDIT_USER_SCHEMA.map((item, index) => {
            const { name, label, rules } = item;
            return (
              <Form.Item
                key={index}
                name={name}
                label={label}
                rules={rules}
                initialValue={user[name]}
                className="col-24 col-sm-12 col-lg-6 pr-2"
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
          Save
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
  );
};
