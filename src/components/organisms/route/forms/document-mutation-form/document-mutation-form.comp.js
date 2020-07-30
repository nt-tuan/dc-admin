import React from "react";
import { Form, Input, Button, Select } from "antd";

export const DocumentMutationForm = () => {
  return (
    <Form
      name="basic"
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      hideRequiredMark
    >
      <Form.Item
        className="mb-4"
        label="Document Name"
        name="Document Name"
        rules={[{ required: true, message: "Please input your Document Name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        className="mb-4"
        label="Document Type"
        name="Document Type"
        rules={[{ required: true, message: "Please input your Document Type!" }]}
      >
        <Select>
          {["Commercial Invoice", "Certificate of Origin", "Packing List"].map((item, idx) => (
            <Select.Option key={idx} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Button type="link">Upload Sample Document</Button>
    </Form>
  );
};
