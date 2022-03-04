import Box from "@mui/material/Box";
import React, { useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import ModalCropImage from "./modal-crop-image.comp";
import { fileToBase64 } from "@/utils/file.util";
import { asyncErrorHandlerWrapper } from "@/utils/error-handler.util";
import { deleteAssetResource, getAssetResource } from "@/services/preference.service";
import Divider from "@mui/material/Divider";
import { useMessage } from "@/hooks/use-message";
import { SETTINGS_MESSAGE } from "@/commons/consts";
import { useDispatch } from "react-redux";
import * as CONFIGS_DUCK from "@/redux/configs/configs.duck";

function UploadImage(props) {
  const { label, required, description, note, shortName, imageUrl, type, messageField } = props;
  const [image, setImage] = useState(imageUrl);
  const message = useMessage();
  const dispatch = useDispatch();

  const onRemove = async () => {
    asyncErrorHandlerWrapper(async () => {
      try {
        await deleteAssetResource(type);
        setImage(null);
        message.success(SETTINGS_MESSAGE.remove(messageField));
        onReLoadAsset();
      } catch (e) {
        message.success(SETTINGS_MESSAGE.updateFail(messageField));
      }
    });
  };
  const onSuccess = (img) => {
    setImage(img);
    onReLoadAsset();
  };

  const onReLoadAsset = () => {
    dispatch({ type: CONFIGS_DUCK.LOAD_ASSET, payload: { type } });
  };

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      try {
        const res = await getAssetResource(type);
        if (res && res.url) {
          setImage(res.url);
        }
      } catch (e) {
        console.error(e);
      }
    });
  }, []);

  return (
    <Box>
      <Divider style={{ margin: "32px -48px 32px -28px" }} />
      <Box>
        <Typography variant="h5" fontWeight={"bold"}>
          {label}
          {required ? <span style={{ color: "red", marginLeft: 5 }}>*</span> : null}
        </Typography>
        <Box display={"inline-flex"} marginTop={"10px"}>
          <UploadImageBox {...props} imageUrl={image} onSuccess={onSuccess} />

          <Box display={"grid"} marginLeft={"20px"} paddingRight={8}>
            <Typography variant={"subtitle1"}>{description}</Typography>
            <Typography variant={"caption"} color={"rgba(0,0,0,0.6)"}>
              {note}
            </Typography>
            {image && (
              <Typography
                onClick={onRemove}
                variant={"subtitle2"}
                style={{ cursor: "pointer" }}
                color={"#2196F3"}
              >
                Remove {shortName}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function UploadImageBox({ shortName, imageUrl, type, onSuccess, messageField }) {
  const inputFileRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(imageUrl);
  const [imagePreview, setImagePreview] = useState(imageUrl);

  useEffect(() => {
    setImage(imageUrl);
    setImagePreview(imageUrl);
  }, [imageUrl]);

  const onClickBox = () => {
    if (imagePreview) {
      setModalVisible(true);
      return;
    }
    inputFileRef.current.click();
  };

  const onChangeFile = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageBase64 = await fileToBase64(file);
      setImage(imageBase64);
      setModalVisible(true);
    } else {
      setImage(null);
    }
  };

  const onCloseModal = () => setModalVisible(false);

  return (
    <div>
      <Box
        onClick={onClickBox}
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#E0E0E0",
          borderColor: "#bfb8b8",
          borderStyle: "dashed",
          borderWidth: 2,
          color: "#2196F3",
          width: 280,
          minWidth: 280,
          height: 100,
          justifyContent: "center",
          cursor: "pointer"
        }}
      >
        <input
          onChange={onChangeFile}
          ref={inputFileRef}
          accept="image/*"
          hidden={true}
          type="file"
        />
        {imagePreview ? (
          <img
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
            src={imagePreview}
            alt={shortName}
          />
        ) : (
          <span> Upload {shortName}</span>
        )}
      </Box>
      <ModalCropImage
        imageUrl={image}
        visible={modalVisible}
        type={type}
        onClose={onCloseModal}
        onCancel={onCloseModal}
        onSave={(img) => setImagePreview(img)}
        onSuccess={onSuccess}
        messageField={messageField}
      />
    </div>
  );
}

UploadImage.propTypes = {};

export default UploadImage;
