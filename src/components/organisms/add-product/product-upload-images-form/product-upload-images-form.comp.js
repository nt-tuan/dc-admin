import { Form, Upload } from "antd";
import React, { forwardRef, useReducer } from "react";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";

const normFile = (e) => {
  return e && e.fileList.map((file) => (file.status === "done" ? file.response : file));
};

export const ProductUploadImagesForm = forwardRef(({ handleUploadImage }, ref) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const renderUploadButton = () => {
    console.log(form.getFieldValue("productImageName"));
    return form.getFieldValue("productImageName") &&
      form.getFieldValue("productImageName").length >= 1 ? null : (
      <UploadButton />
    );
  };

  return (
    <Form name="ProductUploadImagesForm" form={form} ref={ref} className="row">
      <Form.Item
        shouldUpdate
        name="productImageName"
        rules={[{ required: true, message: "Please upload product image" }]}
        className="col-12 col-lg-3"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          listType="picture-card"
          customRequest={handleUploadImage}
          onChange={() => forceUpdate()}
          onRemove={(file) => {
            asyncErrorHandlerWrapper(async () => {
              try {
                // const res = await ImageService.deleteImage(file.response.name);
              } catch (error) {}
            });
          }}
        >
          {renderUploadButton()}
        </Upload>
      </Form.Item>
      <div className="col-12 col-lg-9">
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
          <li>● JPEG is the preffered image format, but you also may use TIFF and GIF files.</li>
        </ul>
      </div>
    </Form>
  );
});

const UploadButton = () => (
  <div>
    <i className="fe fe-plus" />
    <div className="ant-upload-text">Upload</div>
  </div>
);
