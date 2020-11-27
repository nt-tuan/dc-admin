import { Input } from "antd";
import React, { memo } from "react";
import PropTypes from "prop-types";

const CustomInput = memo(({ value, onChange, addOnAfter, addOnBelow, hasError }) => {
  return (
    <>
      <div className="d-flex align-items-center">
        <Input
          placeholder="Enter field value"
          onChange={onChange}
          value={value}
          className={hasError ? "border-danger" : ""}
        />
        {addOnAfter()}
      </div>
      {hasError && (
        <div className="error text-danger" style={{ fontSize: 12 }}>
          Please enter value
        </div>
      )}
      {addOnBelow()}
    </>
  );
});

CustomInput.propTypes = {
  value: PropTypes.string,
  hasError: PropTypes.bool,
  onChange: PropTypes.func,
  addOnAfter: PropTypes.func,
  addOnBelow: PropTypes.func
};

CustomInput.defaultProps = {
  value: "",
  hasError: false,
  onChange: () => {},
  addOnAfter: () => {},
  addOnBelow: () => {}
};

export default CustomInput;
