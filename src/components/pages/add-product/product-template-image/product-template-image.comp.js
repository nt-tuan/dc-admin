import { Row, Upload } from "antd";
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from "react";
import { ImageService } from "services";
import ImgCrop from "antd-img-crop";
import "./styles.scss";
import "antd/es/modal/style";
import "antd/es/slider/style";

export const ProductTemplateImage = forwardRef(({ productImages = [] }, ref) => {
  const [currentImg, setCurrentImg] = useState(productImages[0] || {});
  const [hasError, setHasError] = useState({
    overMaxSize: false,
    emptyUpload: false
  });
  const [uploaded, setUploaded] = useState([]);

  useEffect(() => {
    if (productImages.length) {
      const images = productImages.map((img) => ({
        uid: "-1",
        name: img.originalFilename,
        status: "done",
        url: img.url
      }));
      setUploaded(images);
      setCurrentImg(productImages[0]);
    }
  }, [productImages]);

  useImperativeHandle(ref, () => ({
    getValues: () => {
      if (!uploaded.length) {
        setHasError({
          ...hasError,
          emptyUpload: true
        });
        return false;
      }
      return currentImg;
    }
  }));

  const handleUploadImage = async ({ onSuccess, onError, file }) => {
    if (file.size / 1024 / 1024 < 5) {
      const res = await ImageService.uploadImage(file);
      setCurrentImg(res);
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
    return uploaded.length ? null : <UploadButton />;
  };

  const beforeUpload = useCallback(
    (file) => {
      const overMaxSize = file.size / 1024 / 1024 >= 5;
      if (overMaxSize) {
        setHasError({
          ...hasError,
          overMaxSize: true
        });
      }
      return !overMaxSize;
    },
    [hasError]
  );

  const renderErrorMessage = useCallback(
    (mess) => (
      <div className="text-danger" style={{ fontSize: 12 }}>
        {mess}
      </div>
    ),
    []
  );
  const onChange = ({ fileList: newFileList }) => {
    setUploaded(newFileList);
    setHasError({
      overMaxSize: false,
      emptyUpload: false
    });
  };

  return (
    <div className="p-5 productTemplateImage">
      <div className="d-flex flex-column align-items-center mb-3">
        <div className={`${uploaded.length ? "w-50" : ""}`}>
          <ImgCrop rotate>
            <Upload
              {...(uploaded.length
                ? {
                    fileList: uploaded.map((file) => ({
                      ...file,
                      url: file?.url ?? file?.response?.url
                    }))
                  }
                : {})}
              accept=".jpg, .jpeg, .png, .tiff, .gif"
              className="upload-product-image"
              listType="picture-card"
              customRequest={handleUploadImage}
              onChange={onChange}
              beforeUpload={beforeUpload}
            >
              {renderUploadButton()}
            </Upload>
          </ImgCrop>
        </div>
        {hasError.overMaxSize &&
          renderErrorMessage("Please upload an image file with size less than 5 mb")}
        {hasError.emptyUpload && renderErrorMessage("Please upload an image")}
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
