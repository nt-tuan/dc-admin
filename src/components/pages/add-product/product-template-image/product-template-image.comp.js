import { Form, Row, Upload } from "antd";
import React, { memo, useReducer, useState } from "react";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { ImageService } from "services";
import "./styles.scss";

const normFile = (e) => {
  return e && e.fileList.map((file) => (file.status === "done" ? file.response : file));
};

export const ProductTemplateImage = ({ form }) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const handleUploadImage = async ({ onSuccess, onError, file }) => {
    if (file.size / 1024 / 1024 < 5) {
      const res = await ImageService.uploadImage(file);
      onSuccess({ ...res, status: "done", uid: res.name });
    }
  };

  const UploadButton = memo(() => (
    <div>
      <i className="fe fe-plus" style={{ fontSize: "50px" }} />
      <div className="ant-upload-text">Upload</div>
    </div>
  ));

  const renderUploadButton = () => {
    return form.getFieldValue("productImage") &&
      form.getFieldValue("productImage").length >= 1 ? null : (
      <UploadButton />
    );
  };

  const beforeUpload = (file) => {
    form.validateFields();
    return file.size / 1024 / 1024 < 5;
  };

  return (
    <Form name="ProductUploadImagesForm" form={form} className="p-5">
      <Form.Item
        shouldUpdate
        name="productImage"
        rules={[
          { required: true, message: "Please upload product image" },
          {
            validator: async (rule, value) => {
              if (value && value.length) {
                const fileExt = value[0].name.substr(value[0].name.lastIndexOf("."));
                if (value[0].size / 1024 / 1024 >= 5) {
                  throw new Error("Please upload an image file with size less than 5 mb");
                }
                if ([".png", ".jpg", ".jpeg"].includes(fileExt.toLowerCase()) === false) {
                  throw new Error("Invalid File Type. Accepted type: .png, .jpg, .jpeg");
                }
              }
            }
          }
        ]}
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          className="upload-product-image"
          listType="picture-card"
          customRequest={handleUploadImage}
          onChange={() => forceUpdate()}
          beforeUpload={beforeUpload}
          onRemove={(file) => {
            asyncErrorHandlerWrapper(async () => {
              if (file.status === "done") {
                await ImageService.deleteImage(file.name);
              }
            });
          }}
        >
          {renderUploadButton()}
        </Upload>
      </Form.Item>
      <Row className="product-template-image-text-container">
        Listings that are missing a main image will not appear in search or browse until you fix the
        listing. Choose images that are clear, information-rich and attractive. Images must meet the
        following requirements:
        <ul className="pl-4">
          <li>
            ● Products must fill at least 85% of the image. Images must show only the product that
            is for sale, with few or no props and with no logos, watermarks, or inset images. Images
            may only contain text that is a part of the product.
          </li>
          <li>
            ● Main image must have a pure white background, must be a photo (not a drawing), and
            must not contain excluded accessories.
          </li>
          <li>
            ● Images must be at least 1000 pixels on the longest side and at least 500 pixels on the
            shortest side to be zoom-able.
          </li>
          <li>● Images must not exceed 10000 pixels on the longest side.</li>
          <li>● JPEG is the preferred image format, but you also may use TIFF and GIF files.</li>
        </ul>
      </Row>
    </Form>
  );
};
