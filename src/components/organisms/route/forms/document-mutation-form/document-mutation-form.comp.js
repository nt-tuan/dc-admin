import React, { forwardRef, useReducer, useState } from "react";
import { Form, Input, Select, Upload, Button } from "antd";
import { RouteService } from "services";
import { UploadFile } from "components/atoms/field/upload-file-input";

export const DocumentMutationForm = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const [fileType, setFileType] = useState();
  const uploadFile = async (file) => {
    return await RouteService.uploadDocument(file);
  };
  const handleChangeDocumentType = (value) => {
    setFileType(value);
    form.setFieldsValue({
      sampleFile: null
    });
  };

  return (
    <Form
      colon={false}
      form={form}
      ref={ref}
      name="basic"
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      hideRequiredMark
    >
      <Form.Item
        className="mb-4"
        label="Document Name"
        name="documentName"
        rules={[{ required: true, message: "Please input your Document Name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        className="mb-4"
        label="Document Type"
        name="documentType"
        rules={[{ required: true, message: "Please input your Document Type!" }]}
        shouldUpdate
      >
        <Select onChange={handleChangeDocumentType}>
          {fileTypes.map(({ value, label }) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="sampleFile"
        wrapperCol={24}
        labelCol={24}
        label="Please upload a sample file of the document."
        rules={[
          {
            validator: (rule, value) => {
              const documentType = form.getFieldValue("documentType");
              if (!value) {
                return Promise.resolve();
              }
              return value.name.toLowerCase().endsWith(acceptTypes[documentType].toLowerCase())
                ? Promise.resolve()
                : Promise.reject("Please upload a file with type as Document Type");
            }
          }
        ]}
      >
        <UploadFile
          disabled={!acceptTypes[fileType]}
          accept={acceptTypes[fileType]}
          title="Upload"
          maxSize={5000}
          uploadHandler={uploadFile}
        />
      </Form.Item>
    </Form>
  );
});

const fileTypes = [
  {
    label: "PDF",
    value: "PDF"
  },
  {
    value: "XLSX",
    label: "Excel"
  }
];

const acceptTypes = {
  PDF: ".pdf",
  XLSX: ".xlsx"
};

const FILE_TYPES = {
  PDF: "application/pdf",
  XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
};
