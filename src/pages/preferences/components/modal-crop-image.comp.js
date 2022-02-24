import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DTCModal } from "@/components/commons";
import Cropper from "react-easy-crop";
import { Slider } from "@mui/material";
import Button from "@mui/material/Button";
import { getCroppedImg, getImageDimension } from "@/utils/file.util";
import LoadingButton from "@mui/lab/LoadingButton";
import { asyncErrorHandlerWrapper } from "@/utils/error-handler.util";
import { updateAssetResource } from "@/services/preference.service";
import { useMessage } from "@/hooks/use-message";

function PlusButton({ onClick }) {
  return (
    <Button onClick={onClick} size="small" style={{ height: 30 }}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="black" fillOpacity="0.87" />
      </svg>
    </Button>
  );
}

function SubButton({ onClick }) {
  return (
    <Button onClick={onClick} size="small" style={{ height: 30 }}>
      <svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H0V0H14V2Z" fill="black" fillOpacity="0.87" />
      </svg>
    </Button>
  );
}

function ModalCropImage({ imageUrl, visible, type, onClose, onCancel, onSuccess }) {
  const message = useMessage();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [aspect, setAspect] = useState(4 / 3);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixel) => {
    setCroppedAreaPixels(croppedAreaPixel);
  }, []);

  const handleOnChangeZoom = (zoomChange) => {
    if (zoomChange > 3) {
      zoomChange = 3;
    }
    if (zoomChange < 1) {
      zoomChange = 1;
    }

    setZoom(zoomChange);
  };

  useEffect(async () => {
    if (imageUrl) {
      const { width, height } = await getImageDimension(imageUrl);

      setAspect(width > height ? width / height : height / width);
    }
  }, [imageUrl]);

  const handleOnSave = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageUrl,
        croppedAreaPixels,
        rotation,
        `${type}.png`
      );
      await onSave(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const onSave = async (croppedImage) => {
    if (!(croppedImage && croppedImage.file && croppedImage.base64)) {
      return;
    }
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      try {
        const formData = new FormData();

        formData.append("file", croppedImage.file);

        await updateAssetResource(type, formData);

        message.success(`Upload success`);
        onSuccess(croppedImage.base64);

        onReset();
      } catch (error) {
        message.error(`Upload error`);
        setLoading(false);
      }
    });
  };

  const onReset = () => {
    onClose();
    setLoading(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <DTCModal
      open={Boolean(visible)}
      title="Edit Image"
      onClose={onClose}
      content={
        <Box>
          <Box
            sx={{ height: 320, width: "100%", backgroundColor: "#979797", position: "relative" }}
          >
            <Cropper
              image={imageUrl}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </Box>
          <Box
            sx={{
              display: "inline-flex",
              padding: "20px 30px",
              alignItems: "center",
              justifyContent: "center",
              width: "100%"
            }}
          >
            <SubButton onClick={() => handleOnChangeZoom(zoom - 0.1)} />
            <Slider
              value={zoom}
              style={{ margin: "0 10px" }}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, zoomChange) => setZoom(zoomChange)}
            />
            <PlusButton onClick={() => handleOnChangeZoom(zoom + 0.1)} />
          </Box>

          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%"
            }}
          >
            <Button
              variant="outlined"
              disabled={loading}
              style={{ width: 90, marginRight: 10 }}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={loading}
              disabled={loading}
              variant="contained"
              style={{ width: 90 }}
              onClick={handleOnSave}
            >
              Save
            </LoadingButton>
          </Box>
        </Box>
      }
    />
  );
}

ModalCropImage.propTypes = {};

export default ModalCropImage;
