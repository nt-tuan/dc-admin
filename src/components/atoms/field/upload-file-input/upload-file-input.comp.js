import React, { useState, useCallback } from "react";
import { Upload, Button } from "antd";
import {
  DeleteOutlined,
  FileImageOutlined,
  FileOutlined,
  FilePdfOutlined,
  UploadOutlined,
  FileExcelOutlined
} from "@ant-design/icons";
import PropTypes from "prop-types";

export const ERRORS = {
  FILE_LIMIT_EXCEED: "File size shouldn’t exceed 5MB",
  INVALID_FILE_TYPE: (type) => `Please upload ${type} files only`,
  UNEXPECTED: "Unexpected error. Please try again later"
};
const supportedFiles = [
  {
    extentions: [".png"],
    iconComponent: FileImageOutlined
  },
  {
    extentions: [".pdf"],
    iconComponent: FilePdfOutlined
  },
  {
    extentions: [".xlsx", ".xls"],
    iconComponent: FileExcelOutlined
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
  return <FileOutlined style={iconStyle} />;
};

const UploadedFile = ({ file, disabled, onRemove }) => {
  if (!file || !file.name) return <></>;
  return (
    <div className="d-flex align-items-baseline mt-2">
      <a href={file.url} target="_blank" rel="noopener noreferrer">
        <div>
          <span className="mr-2">{getIcon(file)}</span>

          {file.originalName}
        </div>
      </a>
      <Button
        className="ml-4 align-self-center"
        disabled={disabled}
        type="danger"
        icon={<DeleteOutlined />}
        size="small"
        onClick={onRemove}
      />
    </div>
  );
};

export const UploadFile = ({
  title,
  value,
  onChange,
  uploadHandler,
  accept,
  maxSize,
  disabled,
  uploadProps
}) => {
  const [loading, setLoading] = useState(false);
  const beforeUpload = useCallback(
    (file) => {
      if (maxSize != null && file.size / 1024 > maxSize) {
        onChange({ error: ERRORS.FILE_LIMIT_EXCEED });
        return false;
      }
      if (accept && file.name.toLowerCase().match(accept) == null) {
        onChange({ error: ERRORS.INVALID_FILE_TYPE(accept) });
        return false;
      }
      return true;
    },
    [accept, maxSize, onChange]
  );

  const handleUpload = useCallback(
    async ({ file, onError, onSuccess }) => {
      try {
        setLoading(true);
        const uploadedFile = await uploadHandler(file);
        onSuccess(uploadedFile, file);
        onChange && onChange(uploadedFile);
      } catch (error) {
        onError(error);
        onChange({ error: ERRORS.UNEXPECTED });
      } finally {
        setLoading(false);
      }
    },
    [onChange, uploadHandler]
  );

  const removeUploadFile = useCallback(() => {
    onChange(undefined);
  }, [onChange]);

  const showUploadButton = React.useMemo(() => {
    if (!value) return true;
    if (value.error) return true;
    return false;
  }, [value]);

  return (
    <div>
      {showUploadButton && (
        <Upload
          disabled={disabled}
          beforeUpload={beforeUpload}
          showUploadList={false}
          multiple={false}
          customRequest={handleUpload}
          accept={accept}
          {...uploadProps}
        >
          <Button disabled={disabled} loading={loading}>
            {!loading && <UploadOutlined />} {title}
          </Button>
        </Upload>
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
    error: PropTypes.oneOf(Object.keys(ERRORS)),
    id: PropTypes.string,
    originalFileName: PropTypes.string,
    type: PropTypes.string,
    url: PropTypes.string
  }),
  uploadHandler: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  accept: PropTypes.string,
  maxSize: PropTypes.number,
  disabled: PropTypes.bool,
  uploadProps: PropTypes.object
};
