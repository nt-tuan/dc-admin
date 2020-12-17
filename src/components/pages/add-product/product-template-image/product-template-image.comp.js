import { Row, Upload } from "antd";
import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useReducer,
  useState
} from "react";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { ImageService } from "services";
import ImgCrop from "antd-img-crop";
import "./styles.scss";
import "antd/es/modal/style";
import "antd/es/slider/style";

export const ProductTemplateImage = forwardRef((props, ref) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [imgUrl, setImgUrl] = useState();
  const [isError, setIsError] = useState({
    isSizeError: false,
    isTypeError: false,
    isEmpty: false
  });

  useImperativeHandle(ref, () => ({
    getValues: () => {
      if (!imgUrl) {
        setIsError({ ...isError, isEmpty: true });
      }
      return imgUrl;
    }
  }));

  const handleUploadImage = async ({ onSuccess, onError, file }) => {
    if (file.size / 1024 / 1024 < 5) {
      const res = await ImageService.uploadImage(file);
      setImgUrl(res);
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
    return imgUrl ? null : <UploadButton />;
  };

  const beforeUpload = useCallback((file) => {
    setImgUrl(file);
    return true;
  }, []);

  const beforeCrop = (file) => {
    const isSizeError = file.size / 1024 / 1024 >= 5;
    const fileExt = file.name.substr(file.name.lastIndexOf("."));
    const isTypeError = ![".png", ".jpg", ".jpeg", ".tiff", ".gif"].includes(fileExt.toLowerCase());
    if (!isSizeError && !isTypeError) {
      setIsError({ ...isError, isEmpty: false, isSizeError: false, isTypeError: false });
    } else {
      setIsError({ isTypeError, isSizeError });
    }
    return !isSizeError && !isTypeError;
  };

  const renderErrorMessage = useCallback(
    (mess) => (
      <div className="text-danger" style={{ fontSize: 12 }}>
        {mess}
      </div>
    ),
    []
  );

  return (
    <div className="p-5">
      <div className="d-flex justify-content-center mb-3">
        <div className={`${imgUrl ? "w-50" : ""}`}>
          <ImgCrop rotate beforeCrop={beforeCrop}>
            <Upload
              accept=".jpg, .jpeg, .png, .tiff, .gif"
              className="upload-product-image"
              listType="picture-card"
              customRequest={handleUploadImage}
              onChange={() => forceUpdate()}
              beforeUpload={beforeUpload}
              onRemove={(file) => {
                asyncErrorHandlerWrapper(async () => {
                  try {
                    setImgUrl();
                    if (file.status === "done") {
                      await ImageService.deleteImage(file.response.name);
                    }
                  } catch (error) {
                    throw error;
                  }
                });
              }}
            >
              {renderUploadButton()}
            </Upload>
          </ImgCrop>
          {isError.isSizeError &&
            renderErrorMessage("Please upload an image file with size less than 5 mb")}
          {isError.isTypeError &&
            renderErrorMessage("Invalid File Type. Accepted type: .png, .jpg, .jpeg")}
          {isError.isEmpty && renderErrorMessage("Please upload an image")}
        </div>
      </div>
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
    </div>
  );
});
