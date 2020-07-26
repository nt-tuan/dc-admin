import { Form, Upload } from "antd";
import React, { forwardRef, useState } from "react";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";

const normFile = (e) => {
  if (e.file.status === "done") {
    return e && e.file.response;
  }
  return e && e.fileList;
};

export const ProductUploadImagesForm = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const [imgList, setImgList] = useState([]);

  const handleOnChange = ({ fileList }) => {
    setImgList(fileList);
  };

  return (
    <Form name="ProductUploadImagesForm" form={form} ref={ref} className="row">
      <Form.Item
        name="productImageName"
        rules={[{ required: true, message: "Please upload product image" }]}
        className="col-12 col-lg-3"
        valuePropName="file"
        getValueFromEvent={normFile}
        initialValue={imgList}
      >
        <Upload
          listType="picture-card"
          fileList={imgList}
          customRequest={async ({ onSuccess, onError, file }) => {
            try {
              // const res = await ImageService.uploadImage(file);
              const res = {
                originalName: "3b8ad2c7b1be2caf24321c852103598a.jpg",
                name: "bb86cb00-0a88-4c65-88dc-bcc7756e9e2d.jpg",
                url:
                  "https://distichain-dev.s3.ap-south-1.amazonaws.com/product/import/bb86cb00-0a88-4c65-88dc-bcc7756e9e2d.jpg"
              };
              setTimeout(() => {
                onSuccess({ ...res, status: "done" });
              }, 2000);
            } catch (error) {
              onError(error);
            }
          }}
          onChange={handleOnChange}
          onRemove={(file) => {
            asyncErrorHandlerWrapper(async () => {
              try {
                // const res = await ImageService.deleteImage(file.response.name);
              } catch (error) {}
            });
          }}
        >
          {imgList.length >= 1 ? null : <UploadButton />}
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
