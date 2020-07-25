import React, { useState, forwardRef, useEffect } from "react";
import { Upload, Form } from "antd";

export const ProductUploadImages = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const [imgList, setImgList] = useState([]);
  const initialInfo = {};

  useEffect(() => {
    setImgList(initialInfo.images ? initialInfo.images.fileList : []);
  }, [initialInfo.images]);

  const uploadButton = (
    <div>
      <i className="fe fe-plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <Form form={form} ref={ref} className="row">
      <Form.Item
        name="images"
        rules={[{ required: true, message: "Please upload product image" }]}
        style={{ width: "35%" }}
        className="col-12 col-lg-4"
      >
        <Upload
          listType="picture-card"
          fileList={imgList}
          beforeUpload={() => false}
          // onPreview={handlePreview}
          onChange={({ fileList }) => setImgList(fileList)}
        >
          {imgList.length >= 8 ? null : uploadButton}
        </Upload>
      </Form.Item>
      <div className="col-12 col-lg-8">
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
