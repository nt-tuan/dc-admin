import React, { forwardRef, useReducer, useState } from "react";
import { Form, Input, Select, Upload, Button } from "antd";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { RouteService } from "services";

const normFile = (e) => {
  return (
    e &&
    e.fileList.map((file) =>
      file.status === "done" ? { ...file.response, type: file.type } : file
    )
  );
};

export const DocumentMutationForm = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const [documentType, setDocumentType] = useState();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const renderUploadButton = () => {
    return form.getFieldValue("sampleFile") &&
      form.getFieldValue("sampleFile").length >= 1 ? null : (
      <Button type="link">Upload Sample File</Button>
    );
  };

  const handleUploadImage = async ({ onSuccess, onError, file }) => {
    try {
      const res = await RouteService.uploadDocument(file);
      onSuccess({ ...res, status: "done", uid: res.name, name: res.originalName });
    } catch (error) {
      onError(error);
    }
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
      >
        <Select
          onChange={(value) => {
            form.setFieldsValue({ sampleFile: [] });
            setDocumentType(acceptTypes[value]);
          }}
        >
          {fileTypes.map(({ value, label }) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        shouldUpdate
        name="sampleFile"
        rules={[
          {
            validator: (rule, fileList) => {
              if (fileList === undefined || fileList.length === 0) {
                return Promise.resolve();
              }
              const documentType = form.getFieldValue("documentType");
              return fileList[0].type === documentType
                ? Promise.resolve()
                : Promise.reject("Please upload file with type as Document Type");
            }
          }
        ]}
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          customRequest={handleUploadImage}
          onChange={() => forceUpdate()}
          onRemove={(file) => {
            asyncErrorHandlerWrapper(async () => {
              if (file.status === "done") {
                await RouteService.deleteDocumentFile(file.uid);
              }
            });
          }}
          accept={documentType}
        >
          {renderUploadButton()}
        </Upload>
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
