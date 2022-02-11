import {
  DeleteOutline,
  FileCopyOutlined,
  FileUploadOutlined,
  PermMedia,
  PictureAsPdfOutlined,
  TableViewOutlined
} from "@mui/icons-material";
import React, { Fragment, useCallback, useRef, useState } from "react";

import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import PropTypes from "prop-types";

export const ERRORS = {
  FILE_LIMIT_EXCEED: "File size shouldn’t exceed 5MB",
  INVALID_FILE_TYPE: (type) => `Please upload ${type} files only`,
  UNEXPECTED: "Unexpected error. Please try again later"
};
const supportedFiles = [
  {
    extentions: [".png"],
    iconComponent: PermMedia
  },
  {
    extentions: [".pdf"],
    iconComponent: PictureAsPdfOutlined
  },
  {
    extentions: [".xlsx", ".xls"],
    iconComponent: TableViewOutlined
  }
];
const iconStyle = { fontSize: "24px" };
const getIcon = (file) => {
  for (const supportedFile of supportedFiles) {
    for (const extention of supportedFile.extentions) {
      if (file.name.toLowerCase().endsWith(extention)) {
        const Icon = supportedFile.iconComponent;
        return <Icon style={iconStyle} />;
      }
    }
  }
  return <FileCopyOutlined style={iconStyle} />;
};

const UploadedFile = ({ file, disabled, onRemove }) => {
  if (!file || !file.name) return <></>;
  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
      <a href={file.url} target="_blank" rel="noopener noreferrer">
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: 10, display: "flex", alignItems: "center" }}>
            {getIcon(file)}
          </span>

          {file.originalName}
        </div>
      </a>
      <Button
        disabled={disabled}
        variant="outlined"
        onClick={onRemove}
        sx={{
          background: "#fb434a !important",
          width: "10px",
          height: "25px",
          minWidth: "auto",
          marginLeft: "10px",
          border: "none !important",
          "& svg": { color: "white" }
        }}
      >
        <DeleteOutline />
      </Button>
    </div>
  );
};

export const UploadFile = ({
  title,
  value,
  uploadHandler,
  accept,
  maxSize,
  disabled,
  uploadProps,
  formik
}) => {
  const [loading, setLoading] = useState(false);

  const uploadRef = useRef();

  const handleUpload = async ({ target }) => {
    const file = target.files[0];
    try {
      setLoading(true);

      if (maxSize != null && file.size / 1024 > maxSize) {
        formik.setErrors({
          sampleFile: ERRORS.FILE_LIMIT_EXCEED
        });
        return;
      }
      if (accept && file.name.toLowerCase().match(accept) == null) {
        formik.setErrors({
          sampleFile: ERRORS.INVALID_FILE_TYPE(accept)
        });
        return;
      }

      const uploadedFile = await uploadHandler(file);

      formik.setFieldValue("sampleFile", uploadedFile);
    } catch (error) {
      formik.setErrors({
        sampleFile: ERRORS.UNEXPECTED
      });
    } finally {
      setLoading(false);
    }
  };

  const removeUploadFile = useCallback(() => {
    formik.setFieldValue("sampleFile", {
      name: "",
      originalName: "",
      uid: "",
      url: ""
    });
  }, [formik.values.sampleFile]);

  const showUploadButton = React.useMemo(() => {
    if (value.url === "") return true;
    return false;
  }, [value]);

  const handleInputUpload = () => {
    if (uploadRef.current) uploadRef.current.click();
  };

  return (
    <div>
      {showUploadButton && (
        <Fragment>
          <input
            type="file"
            accept={accept}
            onChange={handleUpload}
            ref={uploadRef}
            style={{ display: "none" }}
            {...uploadProps}
          />
          <LoadingButton
            disabled={disabled}
            loading={loading}
            variant="outlined"
            onClick={handleInputUpload}
            startIcon={<FileUploadOutlined />}
            loadingPosition="start"
            sx={{ marginTop: 2 }}
          >
            {title}
          </LoadingButton>
        </Fragment>
      )}
      {!showUploadButton && (
        <UploadedFile
          file={value}
          loading={loading}
          disabled={disabled}
          onRemove={removeUploadFile}
        />
      )}
    </div>
  );
};

UploadFile.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.shape({
    id: PropTypes.string,
    originalFileName: PropTypes.string,
    type: PropTypes.string,
    url: PropTypes.string
  }),
  uploadHandler: PropTypes.func.isRequired,
  accept: PropTypes.string,
  maxSize: PropTypes.number,
  disabled: PropTypes.bool,
  uploadProps: PropTypes.object,
  formik: PropTypes.object
};
